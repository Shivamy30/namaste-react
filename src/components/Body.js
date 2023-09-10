import RestaurantCard, {withPromotedLabel} from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
  // Local State Variable - Super powerful variable
  const [listOfRestaurants, setListOfRestraunt] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");
  const onlineStatus = useOnlineStatus();
  const {loggedInUser, setUserName} = useContext(UserContext);

  // Whenever state variables update, react triggers a reconciliation cycle(re-renders the component)
  const RestaurantCardWithPromotedLabel = withPromotedLabel(RestaurantCard);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();

    // Optional Chaining
    setListOfRestraunt(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setFilteredRestaurant(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  };

  if(!onlineStatus) return <h1>you are offline!! please check your internet connection</h1>

  return !listOfRestaurants || listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="flex">
        <div className="m-4 p-4">
          <input data-testid="searchInput"
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button className="px-4 py-2 bg-green-100 m-4 rounded-lg"
            onClick={() => {
              // Filter the restraunt cards and update the UI
              // searchText
              const filteredRestaurant = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filteredRestaurant);
            }}>Search</button>
            <input type="text" className="border border-black p-1 mx-2" placeholder="change loggedInUser"
            value={loggedInUser}
            onChange={(e)=> setUserName(e.target.value)}/>
        </div>
        <div className="search m-4 p-4 flex items-center">
        <button
          className="px-4 py-2 bg-gray-100 m-4 rounded-lg"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4
            );
            setFilteredRestaurant(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
        </div>
       
      </div>
      <div className="flex flex-wrap mx-20">
        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >{ restaurant.info.isOpen?(<RestaurantCardWithPromotedLabel resData={restaurant} />):(<RestaurantCard resData={restaurant}/>)}
            {/* <RestaurantCard resData={restaurant} /> */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;

import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {

  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [showItems, setShowItems] = useState(0);

  const setShowItemsFromChild = (idx) =>{
    if(idx===showItems) setShowItems(-1);
    else setShowItems(idx);
  }
  


  if (resInfo === null) return <Shimmer />;
  const { name, cuisines, costForTwoMessage } = resInfo?.cards[0]?.card?.card?.info;
  const categories = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
    (c) => c.card?.["card"]?.["@type"].includes("v2.ItemCategory")
  );

  if(categories===undefined) return <h1>no data found</h1>

  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      {categories.map((category,index) => <RestaurantCategory key={category.card.card.title} 
      data ={category?.card?.card}
      showItems={showItems=== index?true: false} setShowItemsFromChild={()=>setShowItemsFromChild(index)}/>
      )}
     
    </div>
  );
};

export default RestaurantMenu;

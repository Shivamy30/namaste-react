import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;

  const {
    cloudinaryImageId,
    name,
    avgRating,
    cuisines,
    costForTwo,
    sla,
  } = resData?.info;

  return (
    <div className="m-4 p-4 w-[300px] rounded-lg border border-white hover:border-gray-400">
      <img
        className="rounded-lg"
        alt="res-logo"
        src={CDN_URL + cloudinaryImageId}
      />
      <h3 className="font-medium py-2 text-lg ">{name}</h3>
      <h4 className="font-normal text-sm text-gray-600">{cuisines.join(", ")}</h4>
      <div className="flex justify-between">
        <h4>{avgRating}</h4>
        <h4>{costForTwo}</h4>
        <h4>{sla.slaString}</h4>
      </div>
    </div>
  );
};


// higher order components: which take as component and return a component with some twick.
export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-black p-1 my-4 mx-6 text-white rounded-lg">Open</label>
        <RestaurantCard {...props} />
      </div>
    )
  }
}

export default RestaurantCard;

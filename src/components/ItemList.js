import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addToCart } from "../utils/cartSlice";



const ItemList = ({ items }) => {
    // console.log(items);
   const dispatch = useDispatch(); 
   const handleAddItem = (item) =>{
    dispatch(addToCart(item));
   }

    return (
        <div className="">
            {items.map((item) => (
                <div key={item.card.info.id} data-testid="foodItems"
                    className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between">
                    <div className="w-9/12">
                        <div className="py-2">
                            <span>{item.card.info.name}</span>
                            <span>- ₹{item.card.info.price ?
                                item.card.info.price / 100 : item.card.info.defaultPrice / 100}</span>
                        </div>
                        <p className="text-xs">{item.card.info.description}</p>
                    </div>
                    <div className="w-3/12 p-4">
                        <div className="absolute mt-16">
                            <button className="p-1 mx-4 w-28 rounded-sm shadow-lg bg-white relative" 
                                onClick={()=>handleAddItem(item)}>Add
                                {/* <span className="absolute top-0 right-0 mb-2 mr-0">+</span> */}
                
                            </button>

                        </div>
                        <img src={CDN_URL + item.card.info.imageId} />

                    </div>
                </div>
            ))}
        </div>
    )
}

export default ItemList;
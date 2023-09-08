import { useSelector } from "react-redux";
import ItemList from "./ItemList";
import { useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import {clearCart} from "../utils/cartSlice";
import CartItems from "./CartItems";
const Cart = ()=>{
    const cartItems = useSelector((store)=>store.cart.items)
    // console.log(cartItems);
    const dispatch = useDispatch();
    const handleClearCart = ()=>{
        dispatch(clearCart())
    }
    return (
        <div className="w-6/12 bg-gray-50 my-4 mx-auto shadow-lg p-4">
          <div className="text-center">
          <h1 className="font-bold text-2xl" >Your Cart</h1>
            {cartItems.length===0? <h4>your cart is empty! please visit home to add some items!!</h4>:
                <button className="bg-slate-500 p-2 m-2 rounded-lg" onClick={handleClearCart}>Clear Cart</button>
            }
          </div>
            <CartItems cartList={cartItems} />
        </div>
    )
}

export default Cart;
import { useNavigate } from "react-router-dom";
import { useCustomHook } from "../../Context/CustomProductContext";
import style from "./CartList.module.css"
import Cart from "../Cart/Cart";
import Loader from "../Loader/Loader";

function CartList(){
  const {cartArr, totalPurchess, loadCart, handlePurchess} = useCustomHook()
  // console.log(cartArr, setCartArr)
  console.log("LoadCard", loadCart)
   //! use useNavigate for redirect to others Page
  const navigate = useNavigate()
  return (
    <>
    {loadCart ? <Loader/> :(<>
    {cartArr.length === 0 ? <h1>Cart is Empty!</h1>: (<>
    {/* Total Purchess Container */}
    <div className={style.filterContainer}>
      <h3 className={style.TotalPrice}>TotalPrice: ₹{totalPurchess()}</h3>
      <p className={style.Purchase} onClick={()=>handlePurchess(navigate)}>Purchase</p>
    </div>

    {/* Cart List */}
    <div className={style.ProductListContainer}>
      {cartArr.map((cart, index)=>( 
      <Cart key={index} oneCart={cart} index={index}/>
      ))}
    </div></>)}
    </>)}
    </>
  );
}

export default CartList;

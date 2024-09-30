import { useCustomHook } from "../../Context/CustomProductContext";
import styles from "./Cart.module.css"
import incrImg from "./../../Data/Incress.png"
import decImg from "./../../Data/decress.png"

function Cart({oneCart, index}){
  const {handleRemoveToCart,handleIncress, handledecress, isRemoving, setIsRemoving} = useCustomHook();
//   console.log("oneCart", oneCart)
  return (
    <div className={styles.CartContainer} key={index}>
        <img className={styles.cartImg} src={oneCart.image} alt="bagImg"/>
        <p className={styles.decs}>{(oneCart.title).substring(0,35)}</p>
        <div className={styles.priceIncDes}>
            <span className={styles.price}>&#8377;{oneCart.price}</span>
            <img className={styles.Decress} src={decImg} alt="Decress-Img" onClick={()=>handledecress(oneCart, index)}/>
            <p className={styles.quantity}>{oneCart.quantity}</p> 
            <img className={styles.Incress} src={incrImg} alt="Incress-Img" onClick={()=>handleIncress(oneCart, index)}/>
        </div>
        <button className={styles.removebutton} onClick={()=>handleRemoveToCart(oneCart.id)}>
            {isRemoving === oneCart.id ? "Removing" : "Remove From Cart"}
        </button>
    </div>
  );
}

export default Cart;
// Remove From Cart

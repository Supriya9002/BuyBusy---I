import styles from "./Product.module.css"
import { useCustomHook } from "../../Context/CustomProductContext";
// import  lod from "./../../Data/Loading.gif"

function Product({oneProduct, index}) {
    // console.log("Please",oneProduct,index)
    const {handleAddToCart, isAdding} = useCustomHook()
    // console.log("cartArr", cartArr)
  return (
    <div className={styles.ProductContainer} key={index}>
        <img src={oneProduct.image} alt="bagImg"/>
        <p>{(oneProduct.title).substring(0,35)}...</p>
        <span>&#8377; {oneProduct.price}</span>
        <button onClick={()=>handleAddToCart(oneProduct)} disabled={isAdding}>
          {isAdding === oneProduct.id ? "Adding" : "Add To Cart"}
          </button>
    </div>
  );
}

export default Product;

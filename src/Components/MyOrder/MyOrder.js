import styles from "./MyOrder.module.css"
import { useCustomHook } from "../../Context/CustomProductContext";
import Loader from "../Loader/Loader";


function MyOrder(){
    const {myOrder, handleTotalOrder, loadMyOrder} = useCustomHook();
    console.log("loadMyOrder", loadMyOrder)
    // console.log("myOrder", myOrder)
  return (
    <>
    {loadMyOrder ? <Loader/> : (<>
    {myOrder.length === 0 ? <h1>No Orders Found!</h1> : (<>
    <div className={styles.orderDiv}> 
    <h1 className={styles.yourOder}>Your Orders</h1>
    {myOrder.map((oneOrder, ind)=>(
        <>
    <h2>Ordered On:- {oneOrder.orderDate.split('T')[0]}</h2>
    <table className={styles.table} key={ind}>
        <thead>
            <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
            </tr>
        </thead>
        <tbody>
            {oneOrder.orderItems.map((order, index)=>(
            <tr key={index}>
                <td>{(order.title).substring(0,35)}...</td>
                <td>₹ {order.price}</td>
                <td>{order.quantity}</td>
                <td>₹ {order.price*order.quantity}</td>
            </tr>
            ))}
        </tbody>
        <tfoot>
            <tr className={styles.active}>
                <td className={styles.sup} colSpan={3}>Total</td>
                <td>₹ {handleTotalOrder(ind)}</td>
            </tr>
        </tfoot>
    </table>
    </>
    ))}
</div>
</>)}
</>)}
</>
  );
}

export default MyOrder;

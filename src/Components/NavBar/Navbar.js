import styles from "./Navbar.module.css"
import HomeImg from "./../../Data/Home.png"
import orderImg from "./../../Data/MyOrder.png"
import cartImg from "./../../Data/Cart.png"
import logoutImg from "./../../Data/LogOut.png"
import logInImg from "./../../Data/SingIn.png"
import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom"
import { useUserCustomHook } from "../../Context/CustomUserContext"
import { useNavigate } from "react-router-dom"
import { useCustomHook } from "../../Context/CustomProductContext"

export function Navbar() {
  const {isLogin, handleLogOut} = useUserCustomHook()
  const {handleCartNavigation, handleMyOrderNavigation, handleHomeNavigation} = useCustomHook()
  // console.log("isLogin in Navbar", isLogin);
  const navigate = useNavigate();
  
  return (
    <>
    <div className={styles.NavbarContainer}>
      <div className={styles.appName}>
        <Link to="/" className={styles.link}><span>BusyBuy</span></Link>
      </div>
      <div className={styles.navPageContainer}>
        {/* Home */}
        <div className={styles.navPageContainerContainer}>
          <img src={HomeImg} alt="HomeImg" className={styles.navImg}/>
          <Link to="/" className={styles.link}><span className={styles.navText} onClick={()=>handleHomeNavigation()}>Home</span></Link>
        </div>
        {isLogin ? 
        <>
          {/* Order */}
        <div className={styles.navPageContainerContainer}>
          <img src={orderImg} alt="orderImg" className={styles.navImg}/>
          <Link to="/myOrder" className={styles.link}>
          <span className={styles.navText} onClick={()=> handleMyOrderNavigation()}>My Orders</span>
          </Link>
        </div>
        {/* Cart */}
        <div className={styles.navPageContainerContainer}>
          <img src={cartImg} alt="orderImg" className={styles.navImg}/>
          <Link to="/cart" className={styles.link}><span className={styles.navText} 
          onClick={()=>handleCartNavigation()}>Cart</span></Link>
        </div>
        </> 
        : null}
        
        {isLogin === false
        ? (
          //LogIn
          <div className={styles.navPageContainerContainer}>
            <img src={logInImg} alt="logInImg" className={styles.navImg}/>
            <Link to="/LogIn" className={styles.link}><span className={styles.navText} >LogIn</span></Link>
          </div>
        )
        :
        (
          //LogOut
          <div className={styles.navPageContainerContainer}>
            <img src={logoutImg} alt="logoutImg" className={styles.navImg}/>
            <button className={styles.logOut} onClick={()=>handleLogOut(navigate)}>LogOut</button>
        </div>
        )
        }

      </div>
    </div>
    <Outlet/>
    </>
  );
}


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
        <div className={styles.navPageContainerContainer}>
          <Link to="/" className={styles.link} onClick={()=>handleHomeNavigation()}>
            <img src={HomeImg} alt="HomeImg" className={styles.navImg}/>
            <span className={styles.navText}>Home</span>
          </Link>
        </div>
        {isLogin ? 
        <>
        <div className={styles.navPageContainerContainer}>
          <Link to="/myOrder" className={styles.link} onClick={()=> handleMyOrderNavigation()}>
            <img src={orderImg} alt="orderImg" className={styles.navImg}/>
            <span className={styles.navText}>My Orders</span>
          </Link>
        </div>
        <div className={styles.navPageContainerContainer}>
          <Link to="/cart" className={styles.link} onClick={()=>handleCartNavigation()}>
            <img src={cartImg} alt="orderImg" className={styles.navImg}/>
            <span className={styles.navText}>Cart</span>
          </Link>
        </div>
        </> 
        : null}
        
        {isLogin === false
        ? (
          <div className={styles.navPageContainerContainer}>
            <Link to="/LogIn" className={styles.link}>
              <img src={logInImg} alt="logInImg" className={styles.navImg}/>
              <span className={styles.navText} >LogIn</span>
            </Link>
          </div>
        )
        :
        (
          <div className={styles.navPageContainerContainer}>
            <button className={styles.logOut} onClick={()=>handleLogOut(navigate)}>
              <img src={logoutImg} alt="logoutImg" className={styles.navImg}/>
              <span className={styles.navText}>LogOut</span>
            </button>
        </div>
        )
        }

      </div>
    </div>
    <Outlet/>
    </>
  );
}

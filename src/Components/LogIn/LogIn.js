import { Link } from "react-router-dom";
import style from "./LogIn.module.css"
// import { useCustomHook } from "../../Context/CustomProductContext";
import { useUserCustomHook } from "../../Context/CustomUserContext";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const {haldleLogIn, email, setEmail, password, setPassword} = useUserCustomHook();
  const navigate = useNavigate()
  return (
    <div className={style.SignContainer}>
        <h1 className={style.Sign}>Log In</h1>
        <form className={style.SignForm} onSubmit={(e)=>haldleLogIn(e, navigate)}>
            <input placeholder="Enter Email" type="email" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
            <input placeholder="Enter Password" type="text" value={password} onChange={(e)=> setPassword(e.target.value)} required/>
            <button type="submit">LogIn</button>
        </form>
        <p className={style.hal}>Don't have an account? <Link to="/Register" className={style.don}>Register</Link> </p>
    </div>
  );
}

export default LogIn;
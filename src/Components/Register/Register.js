import style from "./Register.module.css"
// import { useCustomHook } from "../../Context/CustomProductContext";
import { useUserCustomHook } from "../../Context/CustomUserContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const {email, setEmail, password, setPassword,name,setName, haldleRegister} = useUserCustomHook();
  const navigate = useNavigate()
  return (
    <div className={style.SignContainer}>
        <h1 className={style.Sign}>Register</h1>
        <form className={style.SignForm} onSubmit={(e)=>haldleRegister(e, navigate)}>
            <input placeholder="Enter Name" value={name} onChange={(e)=> setName(e.target.value)} required />
            <input placeholder="Enter Email" type="email" required value={email} onChange={(e)=> setEmail(e.target.value)}/>
            <input placeholder="Enter Password" type="text" required value={password} onChange={(e)=> setPassword(e.target.value)}/>
            <button type="submit">Register</button>
        </form>
    </div>
  );
}

export default Register;
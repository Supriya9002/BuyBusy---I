import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../FireBase/FireBaseConfig";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { toast } from 'react-toastify';

//Todo 1. Create Context
const UserContext = createContext();

//Todo 2. Custom Context
function CustomUserContext({children}){

    const [signedUser, setSignedUser] = useState({});
    const [isLogin, setisLogin] = useState(false); 
    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");
    const [name,setName] = useState("");

    useEffect(()=>{
      const fetchUserData = async ()=>{
        // Check if there's a logged-in user in localStorage
        const storedUser = JSON.parse(localStorage.getItem("userData"));
        if(storedUser && storedUser.uid){
          console.log("Supriya")
          auth.onAuthStateChanged(async(user)=>{
            if(user){
              console.log(user.uid);
              const docref = doc(db, "Users", user.uid);
              const docSnap = await getDoc(docref);
              console.log(docSnap)
              if(docSnap.exists()){
                console.log(docSnap.data())
                setSignedUser({...docSnap.data(), id: user.uid});
                setisLogin(true); // Ensure isLogin is set when user exists
              }
            }else{
              setisLogin(false);
            }
          });
        }else{
          auth.onAuthStateChanged(async(user)=>{
            if(user){
              console.log(user.uid);
              const docref = doc(db, "Users", user.uid);
              const docSnap = await getDoc(docref);
              console.log(docSnap)
              if(docSnap.exists()){
                console.log(docSnap.data())
                setSignedUser({...docSnap.data(), id: user.uid});
                setisLogin(true); // Ensure isLogin is set when user exists
              }
            }else{
              setisLogin(false);
            }
          });
        }
      }
      fetchUserData();
    },[]);

    //! handle Register
    const haldleRegister =async (e, navigate)=>{
        e.preventDefault();
        try{
          // store password and password in authantication
          await createUserWithEmailAndPassword(auth, email, password);
          const user = auth.currentUser;
          console.log(user);
          // store name email password in firebase (database)
          if(user){
            await setDoc(doc(db, "Users", user.uid),{
              name: name,
              email: user.email,
            //   password: password
            });
          }
          setName("");
          setEmail("");
          setPassword("");
          toast.success("User Registered Successfully");
          navigate("/LogIn")
        }catch(error){
          console.log(error.message)
          toast.error(error.message);
        }
      }
      //! Handle Login 
      const haldleLogIn = async (e, navigate)=>{
        e.preventDefault();
        try{
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          console.log("userCredential",userCredential)
          const user = userCredential.user;
          setEmail("");
          setPassword("");
          toast.success("User Login Successfully");
          setisLogin(true);
          const userData = {
            email: user.email,
            uid: user.uid,
          }
          localStorage.setItem("userData", JSON.stringify(userData));
          navigate("/")
        //window.location.href="/"
        }catch(error){
          toast.error(error.message);
          console.log(error.message);
        }
      }
      //! Handle LogOut
      const handleLogOut = async (navigate)=>{
        try{
            console.log("In LogOut")
            await signOut(auth)
            toast.success('User LogOut successfully!');
            setisLogin(false);
            setSignedUser({})
            localStorage.removeItem("userData"); // Clear user data from localStorage
            navigate("/LogIn")
        }catch(error){
            console.log(error.message)
            toast.error(error.message);
        }
      }
      // console.log("isLogin in UserContext", isLogin);
      // console.log("signedUser", signedUser)
      return(
        <UserContext.Provider value={{
            email, 
            setEmail, 
            password, 
            setPassword,
            name,
            setName,
            haldleRegister,
            isLogin, 
            setisLogin,
            haldleLogIn,
            handleLogOut,
            signedUser, setSignedUser
            }}>
            {children}

        </UserContext.Provider>
      )
}

//Todo 3.  Custom Hook
function useUserCustomHook(){
    const value = useContext(UserContext)
    return value;
}

export {useUserCustomHook, CustomUserContext};
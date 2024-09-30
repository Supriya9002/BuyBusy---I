import './App.css';
import {Navbar} from './Components/NavBar/Navbar';
import ProductList from './Components/ProductList/ProductList';
import {createBrowserRouter,RouterProvider,Navigate} from "react-router-dom";
import { CustomProductContext } from './Context/CustomProductContext';
import { CustomUserContext} from './Context/CustomUserContext';
import CartList from './Components/CartList/CartList';
import MyOrder from './Components/MyOrder/MyOrder';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import LogIn from './Components/LogIn/LogIn';
import Register from './Components/Register/Register';
import { useEffect, useState } from 'react';
import { auth } from './FireBase/FireBaseConfig';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import ErrorPage from './Components/error/ErrorPage';

function App() {

  //! Letter Add one Features Hare
  // const [user, setuser] = useState(null)
  // useEffect(()=>{
  //   auth.onAuthStateChanged(async(user)=>{
  //     console.log("Dhoni", user)
  //     setuser(user)
  //   });
  // })
  
  const router = createBrowserRouter([
    {path:"/", element: <Navbar/>, //user ? <Navbar/> : <Navigate to="/LogIn"/>,
      errorElement: <ErrorPage/>,
      children: [
        {index: true, element: <ProductList/>},
        {path:"myOrder", element: (<PrivateRoute><MyOrder/></PrivateRoute>)}, 
        {path:"cart", element: (<PrivateRoute><CartList/></PrivateRoute>)},
        {path: "LogIn", element: <LogIn/>},
        {path: "Register", element: <Register/>},
    ]}
  ])
  return (
    <>
    <CustomUserContext>
      <CustomProductContext>
        <div className="App">
          <RouterProvider router={router}/>
          {/* <ToastContainer/> */}
        </div>
      </CustomProductContext>
    </CustomUserContext>
    <ToastContainer/>
    </>
 
    
  );
}

export default App;

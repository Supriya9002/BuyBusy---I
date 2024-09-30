import { Navigate } from "react-router-dom";
import { useUserCustomHook } from "../../Context/CustomUserContext";

const PrivateRoute = ({ children }) => {
  const {isLogin} = useUserCustomHook()
  // Check if the user is logged in
  if (!isLogin) {
    // If not logged in, redirect to the home page
    return <Navigate to="/LogIn" replace />;
  }

  // If logged in, render the children components
  return children;
};

export default PrivateRoute;

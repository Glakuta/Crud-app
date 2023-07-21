import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Navigate, Outlet} from "react-router-dom";



const PrivateRoutes = () => {
  const authToken = Cookies.get("GRZEGORZ_AUTH");

  return authToken ? <Outlet /> : <Navigate to="/login" replace />;
};

  export default PrivateRoutes


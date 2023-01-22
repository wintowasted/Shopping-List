import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Unauthorized from "./Unauthorized";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  console.log(auth)
  return allowedRoles?.includes(auth?.role) ? (
    <Outlet />
  ) : auth?.accessToken ? (
      <Unauthorized/>
  ) : (
    <Navigate to="/login" />
  );
};

export default RequireAuth;

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = () => {
  const isAuthenticated = useSelector(state=>state.authState.isAuthenticated)
  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return (
      <>
        <Navigate to="/login" />
      </>
    );
  }
};

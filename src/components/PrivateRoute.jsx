import { useAuthProvider } from "./authProvider";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const { state } = useAuthProvider();
  if (state.isLogin) {
    return <Outlet />;
  } else {
    return (
      <>
        <Navigate to="/login-page" />
      </>
    );
  }
};

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./authContext";

function ProtectedRoute({ children, allowedRole }) {
  const { user, role } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role !== allowedRole) {
    return role === "doctor" ? (
      <Navigate to="/doctor-dashboard" replace />
    ) : (
      <Navigate to="/patient-dashboard" replace />
    );
  }

  return children;
}

export default ProtectedRoute;

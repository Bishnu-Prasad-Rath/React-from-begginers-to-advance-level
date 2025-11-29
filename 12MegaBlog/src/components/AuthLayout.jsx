import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If user must be authenticated but is NOT logged in → go to login
    if (authentication && !authStatus) {
      navigate("/login");
    }

    // If user must NOT be authenticated but IS logged in → go home
    if (!authentication && authStatus) {
      navigate("/");
    }

    setLoading(false);
  }, [authStatus, authentication, navigate]);

  // Fancy but simple loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-gray-600">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}

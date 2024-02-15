import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { Outlet } from "react-router-dom";
import { isAdmin } from "../../services/Apis";
import Spinner from '../Spinner';
import { toast } from "react-toastify";

const AdminRoutes = () => {
  const [auth] = useAuth();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      let tokenData = localStorage.getItem("authData");
      let token;
      try {
        const authData = JSON.parse(tokenData);
        token = authData.token;
        const response = await isAdmin(null, token);
        if (response.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        toast.error(error.message)
        setOk(false);
      }
    };
    if (auth.token) {
      authCheck();
    }
  }, [auth.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
};

export default AdminRoutes;

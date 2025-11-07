import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, logout } from "../redux/slices/authSlice";
import { api } from "../lib/api";

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setUser(res.data));
      } catch {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  return loading;
};

export default useAuthCheck;

import { useState, useEffect } from "react";
import axios from "axios";

export const useCheckLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.get("/api/check-login", { withCredentials: true });
        setIsLoggedIn(response.data.authenticated);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkLogin();
  }, []);

  return isLoggedIn;
};

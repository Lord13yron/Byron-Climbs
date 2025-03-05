import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { createContext, useContext, useState, useEffect } from "react";

import {
  getCurrentUser,
  logout as logoutApi,
  login as loginApi,
} from "../services/apiAuthentication";
import { useQueryClient } from "@tanstack/react-query";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (err) {
        console.log("ERROR", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, []);

  async function logout() {
    try {
      await logoutApi();
      setUser(null);
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    } catch (err) {
      console.log("ERROR", err);
      toast.error("Could not logout");
    }
  }

  async function login({ email, password }) {
    try {
      const { data, error } = await loginApi({ email, password });
      if (error) throw new Error(error.message);
      const newUser = await getCurrentUser();
      setUser(newUser);
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/", { replace: true });
    } catch (err) {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    }
  }

  const value = {
    user,
    isLoading,
    isAuthenticated: user?.role === "authenticated",
    isSuperUser: user?.userRole === "superuser",
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("useUser must be used within UserProvider");
  return context;
}

export { UserProvider, useUser };

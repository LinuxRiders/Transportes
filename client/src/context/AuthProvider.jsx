import { useContext, createContext, useState, useEffect } from "react";
import api, { setAccessToken } from "../api/api";

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  getaccessToken: () => {},
  getRefreshToken: () => {},
  login: (userData) => {},
  getUser: () => {},
  getRols: () => {},
  logOut: () => {},
  loading: true,
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessTokenState] = useState("");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  // Función para actualizar el accessToken en el estado y en api.js
  const updateAccessToken = (token) => {
    setAccessTokenState(token);
    setAccessToken(token); // Actualiza el accessToken en api.js
  };

  async function requestNewAccessToken(refreshToken) {
    try {
      const response = await api.post("/auth/refresh", {
        refresh_token: refreshToken,
      });

      const { access_token, refresh_token } = response.data;

      console.log(response.data);

      if (access_token && refresh_token) {
        saveSessionInfo(access_token, refresh_token);
      } else {
        throw new Error(response.statusText);
      }

      return access_token;
    } catch (error) {
      console.log("Auth: ".error);
      return null;
    }
  }

  async function getUserInfo() {
    try {
      await api
        .get("/users/me")
        .then((response) => {
          setUser(response.data.data);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          console.error("Failed to fetch user:", error);
          setIsAuthenticated(false);
        });
      // setLoading(false);
    } catch (error) {
      console.log("Auth: ".error);
      return null;
    }
  }

  async function checkAuth() {
    if (accessToken) {
      //El usuario ya esta autenticado
      getUserInfo();
    }

    //El usuario no esta autenticado
    const token = getRefreshToken();
    if (token) {
      const newAccessToken = await requestNewAccessToken(token);
      if (newAccessToken) {
        await getUserInfo();
      }
    }
    setLoading(false);
  }

  function saveSessionInfo(accessToken, refreshToken) {
    updateAccessToken(accessToken);
    localStorage.setItem("refresh_token", refreshToken);
  }

  function login(userData) {
    saveSessionInfo(userData.access_token, userData.refresh_token);

    getUserInfo();
    setLoading(false);
  }

  async function logOut() {
    try {
      await api
        .post("/auth/logout", {
          refresh_token: localStorage.getItem("refresh_token"),
        })
        .then((response) => {
          if (response.status === 204) {
            // Limpiar el estado y redirigir
            localStorage.removeItem("refresh_token");
            setAccessTokenState("");
            setUser(undefined);
            setIsAdmin(false);
            setIsAuthenticated(false);
          }
        })
        .catch((error) => {
          console.error("Failed to logOut:", error);
        });
    } catch (error) {
      console.log("Auth: ".error);
      return null;
    }
  }

  function getaccessToken() {
    return accessToken;
  }

  function getRefreshToken() {
    const tokenData = localStorage.getItem("refresh_token");

    return tokenData ? tokenData : null;
  }

  async function Userdata(accessToken) {
    try {
      // const response = await getUserInfoRequest(accessToken);
      // console.log(response);
      // if (response.ok) {
      //   const json = await response.json();
      //   setUserData(json.data);
      //   return;
      // }
    } catch (error) {}
  }

  function getUser() {
    // return userData;
  }

  function getRols() {
    return user?.roles;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        getaccessToken,
        login,
        getRefreshToken,
        getUser,
        getRols,
        logOut,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within an AuthProvider");

  return context;
};

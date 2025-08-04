import { useEffect, react } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import { useThemeStore } from "./store/UseThemeStore.js";
import { useAuthStore } from "./store/UseAuthStore.js";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

export default function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log("online people:", { onlineUsers });

  if (isCheckingAuth && !authUser) {
    return (
      <div className="justify-center items-center h-screen flex">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Homepage /> : <Navigate to="/Login" />}
        />
        <Route
          path="/Signup"
          element={!authUser ? <Signup /> : <Navigate to="/" />}
        />

        <Route
          path="/Login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />

        <Route path="/Settings" element={<Settings />} />

        <Route
          path="/Profile"
          element={authUser ? <Profile /> : <Navigate to="/Login" />}
        />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />{" "}
    </div>
  );
}

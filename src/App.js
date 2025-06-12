import { Routes, Route, useNavigate } from "react-router-dom";
import MainRegister from "./pages/Register/MainRegister.jsx";
import MainLogin from "./pages/Login/MainLogin.jsx";
import MainProfile from "./pages/EditProfile/MainProfile.jsx";
import MainChat from "./pages/ChatApp/MainChat.jsx";
import "@fontsource/inter";
import MainHome from "./pages/Home/MainHome.jsx";
import ProtectedRoute from "./pages/ProtectedRoutes/ProtectedRoute.jsx";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/fort/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route index path="/fort/" element={<MainHome />} />
        <Route path="/fort/register" element={<MainRegister />} />
        <Route path="/fort/login" element={<MainLogin />} />
        <Route
          path="/fort/:id/home"
          element={
            <ProtectedRoute>
              <MainChat />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/fort/homePage/flank.ai" element={<AIPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;

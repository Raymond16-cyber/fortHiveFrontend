import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainRegister from "./pages/Register/MainRegister.jsx";
import MainLogin from "./pages/Login/MainLogin.jsx";
import MainProfile from "./pages/EditProfile/MainProfile.jsx";
import MainChat from "./pages/ChatApp/MainChat.jsx";
import "@fontsource/inter";
import MainHome from "./pages/Home/MainHome.jsx";
import ProtectedRoute from "./pages/ProtectedRoutes/ProtectedRoute.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            index
            path="/fort/"
            element={
              <ProtectedRoute>
                {" "}
                <MainHome />
              </ProtectedRoute>
            }
          />
          <Route path="/fort/register" element={<MainRegister />} />
          <Route path="/fort/login" element={<MainLogin />} />
          <Route path="/fort/:id/home" element={<MainChat />} />
          {/* <Route path="/fort/homePage/flank.ai" element={<AIPage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

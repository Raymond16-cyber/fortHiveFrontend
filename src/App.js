import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainRegister from "./pages/Register/MainRegister.jsx";
import MainLogin from "./pages/Login/MainLogin.jsx";
import MainProfile from "./pages/EditProfile/MainProfile.jsx";
import MainChat from "./pages/ChatApp/MainChat.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/fort/register" element={<MainRegister />} />
          <Route path="/fort/login" element={<MainLogin />} />
          <Route path="/fort/:users/home" element={<MainChat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

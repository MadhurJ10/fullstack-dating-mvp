import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import OAuthSuccess from "./pages/OAuthSuccess";
import Discover from "./pages/Discover";
import Matches from "./pages/Matches";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/matches" element={<Matches />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

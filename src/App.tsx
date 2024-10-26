// src/App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Headers from "./components/header/Headers";
import MyTravels from "./pages/MyTravels";
import TravelDetails from "./pages/TravelDetails";

function App() {
  return (
    <Router>
      <HeaderWithConditionalRender />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/my-travels" element={<MyTravels />} />
        <Route path="/travels/:id" element={<TravelDetails />} />
      </Routes>
    </Router>
  );
}

function HeaderWithConditionalRender() {
  const location = useLocation();
  const showHeaderPaths = ["/", "/register"];
  return showHeaderPaths.includes(location.pathname) ? null : <Headers />;
}

export default App;

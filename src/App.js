import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLogin from "./components/AppLogin/index.jsx";
import AppTrade from "./components/AppTrade/index.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLogin />} />
        <Route path="/trade" element={<AppTrade />} />
      </Routes>
    </Router>
  );
}

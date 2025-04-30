import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer"; // Si tienes un Footer
import { ThemeProvider } from "./context/ThemeContext"; // Importa el ThemeProvider correcto
import { AuthProvider } from "./context/AuthContext";
import { SearchProvider } from "./context/SearchContext";
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <SearchProvider>
          <ThemeProvider> {/* Usa el ThemeProvider de ThemeContext.jsx */}
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
            <Footer />
          </ThemeProvider>
        </SearchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
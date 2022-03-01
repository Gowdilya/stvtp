import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Metrics from "./pages/Metrics/index.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/metrics" element={<Metrics />} />
        <Route path="/products" element={<SignUp />} />
        <Route path="/contact-us" element={<SignUp />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/marketing" element={<SignUp />} />
        <Route path="/consulting" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;

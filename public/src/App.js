import Navbar from "./components/Navbar/Navbar";
import Metrics from "./pages/Metrics/index.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Reports from "./pages/Reports";
import Insights from "./pages/Insights/index.tsx";
import Events from "./pages/Events/unitEventsTable.js";
import ScrollToTop from "./ScrollToTop";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Analytics from "./pages/Analytics";
import UserManagement from "./pages/UserManagement";
import BuildingManagement from "./pages/BuildingManagement";
function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Insights />} />
          <Route path="/user-management" exact element={<UserManagement />} />
          <Route path="/buildings" exact element={<BuildingManagement />} />
          <Route path="/metrics" element={<Metrics />} />
          <Route path="/products" element={<Reports />} />
          <Route path="/contact-us" element={<SignUp />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/marketing" element={<SignUp />} />
          <Route path="/consulting" element={<SignUp />} />
          <Route path="/reports" element={<Insights />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/events" element={<Events />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Router>
    </LocalizationProvider>
  );
}

export default App;

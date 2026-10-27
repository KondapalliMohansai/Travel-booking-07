import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import PackageDetails from "./pages/PackageDetails";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:id" element={<PackageDetails />} />
          <Route path="/book/:id" element={<Booking />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

import { createContext, useContext, useEffect, useState } from "react";

const BookingContext = createContext(null);
const STORAGE_KEY = "travelgo-bookings-v1";

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }, [bookings]);

  function addBooking(booking) {
    const saved = { ...booking, id: `TG-${Date.now().toString().slice(-7)}`, createdAt: new Date().toISOString() };
    setBookings(current => [saved, ...current]);
    return saved;
  }

  function cancelBooking(id) {
    setBookings(current => current.filter(booking => booking.id !== id));
  }

  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBookings must be used inside BookingProvider");
  return context;
}

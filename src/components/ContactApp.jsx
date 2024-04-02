import Navigation from "./Navigation";
import { Routes, Route } from "react-router-dom";
import AddPage from "../pages/AddPage";
import HomePageWrapper from "../pages/HomePage";

const ContactApp = () => {
  return (
    <div className="contact-app">
      <header className="contact-app__header">
        <h1>Aplikasi Kontak</h1>
        <Navigation />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePageWrapper />} />
          <Route path="/add" element={<AddPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default ContactApp;

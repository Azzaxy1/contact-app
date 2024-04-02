import React from "react";
import Navigation from "./Navigation";
import { Routes, Route } from "react-router-dom";
import AddPage from "../pages/AddPage";
import HomePageWrapper from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";

class ContactApp extends React.Component {
  constructor(props) {
    super(props);

    //  inisialisasi state authUser
    this.state = {
      authedUser: null,
    };
  }

  render() {
    if (this.state.authedUser === null) {
      return (
        <div className="contact-app">
          <header className="contact-app__header">
            <h1>Aplikasi Kontak</h1>
            <Navigation />
          </header>
          <main>
            <Routes>
              {/* tanda * : seluruh URL yang belum terdefinisikan. */}
              <Route path="/*" element={<p>Halaman Login</p>} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
        </div>
      );
    }

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
  }
}

export default ContactApp;

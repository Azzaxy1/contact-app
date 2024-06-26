import React from "react";
import Navigation from "./Navigation";
import { Routes, Route } from "react-router-dom";
import AddPage from "../pages/AddPage";
import HomePageWrapper from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import { getUserLogged, putAccessToken } from "../utils/api";
import { LocaleProvider } from "../Contexts/LocaleContext";

class ContactApp extends React.Component {
  constructor(props) {
    super(props);

    //  inisialisasi state authUser
    this.state = {
      authedUser: null,
      initializing: true,
      localeContext: {
        locale: localStorage.getItem("locale") || "id",
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale =
              prevState.localeContext.locale === "id" ? "en" : "id";
            localStorage.setItem("locale", newLocale);
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: newLocale,
              },
            };
          });
        },
      },
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async componentDidMount() {
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
        initializing: false,
      };
    });
  }

  async onLoginSuccess({ accessToken }) {
    // menyimpan ke localstorage
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }
  onLogout() {
    this.setState(() => {
      return {
        authedUser: null,
      };
    });

    putAccessToken("");
  }

  render() {
    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <LocaleProvider value={this.state.localeContext}>
          <div className="contact-app">
            <header className="contact-app__header">
              <h1>
                {this.state.localeContext.locale === "id"
                  ? "Aplikasi Kontak"
                  : "Contacts App"}
              </h1>
            </header>
            <main>
              <Routes>
                {/* tanda * : seluruh URL yang belum terdefinisikan. */}
                <Route
                  path="/*"
                  element={<LoginPage loginSuccess={this.onLoginSuccess} />}
                />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
          </div>
        </LocaleProvider>
      );
    }

    return (
      <LocaleProvider value={this.state.localeContext}>
        <div className="contact-app">
          <header className="contact-app__header">
            <h1>
              {this.state.localeContext.locale === "id"
                ? "Aplikasi Kontak"
                : "Contacts App"}
            </h1>
            <Navigation
              name={this.state.authedUser.name}
              logout={this.onLogout}
            />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<HomePageWrapper />} />
              <Route path="/add" element={<AddPage />} />
            </Routes>
          </main>
        </div>
      </LocaleProvider>
    );
  }
}

export default ContactApp;

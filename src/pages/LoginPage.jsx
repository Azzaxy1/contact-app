import { Link } from "react-router-dom";
import { login } from "../utils/api";
import LoginInput from "../components/LoginInput";
import PropTypes from "prop-types";

const LoginPage = ({ loginSuccess }) => {
  const onLoginHandler = async ({ email, password }) => {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  };

  return (
    <section className="login-page">
      <h2>Gak perlu serius-serius ya isinya ...</h2>
      <LoginInput login={onLoginHandler} />
      <p>
        Belum punya akun? <Link to="/register">Daftar di sini.</Link>
      </p>
    </section>
  );
};

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;

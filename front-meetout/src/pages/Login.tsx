import LoginForm from "../components/forms/LoginForm";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section>
      <h2>Login</h2>
      <LoginForm />
      <small>
        Don't you have an account?
        <Link to="/register" className="register">
          Register
        </Link>
      </small>
    </section>
  );
};

export default Login;

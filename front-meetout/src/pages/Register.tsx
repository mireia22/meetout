import RegisterForm from "../components/forms/RegisterForm";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <section>
      <h2>Register</h2>
      <RegisterForm />
      <small>
        Already have an account?
        <Link to="/login" className="login">
          Login
        </Link>
      </small>
    </section>
  );
};

export default Register;

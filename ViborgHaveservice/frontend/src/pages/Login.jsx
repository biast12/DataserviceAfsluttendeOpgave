import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import Title from "../components/Title";

const Login = () => {
  const { signIn, user } = useContext(LoginContext);

  const handleLogin = (e) => {
    e.preventDefault();

    let identity = e.target.inpIdentity.value;
    let password = e.target.inpPW.value;

    signIn(identity, password);
  };
  if (user) {
    return <Navigate to="/admin" replace />;
  }
  return (
    <section>
      <Title titleText={"Login"} />
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center justify-center"
      >
        <div className="m-4">
          <input
            type="text"
            name="inpIdentity"
            placeholder="Brugernavn eller email"
            className="border input border-primary-500"
          ></input>
        </div>
        <div className="m-4">
          <input
            type="password"
            name="inpPW"
            placeholder="Password"
            className="border input border-primary-500"
          ></input>
        </div>
        <div className="m-4">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;

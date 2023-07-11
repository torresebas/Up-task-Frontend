import { useState } from "react";
import { Link } from "react-router-dom";
import clientAxios from "../config/clientAxios";
import Alert from "../components/Alert";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState({});

  //SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, email, password, confirmPassword].includes("")) {
      setAlert({
        msg: "Todos los campos obligatorios",
        error: true,
      });
      return;
    }
    if (password !== confirmPassword) {
      setAlert({
        msg: "Passwords no iguales",
        error: true,
      });
      return;
    }
    if (password.length < 6) {
      setAlert({
        msg: "Passwords short",
        error: true,
      });
      return;
    }
    setAlert({});

    //Crea el user usando la API
    try {
      const { data } = await clientAxios.post(
        `/users`,
        {
          name,
          email,
          password,
        }
      );


      // Asi Puedo capturar el mensaje del servidor
      setAlert({
        msg: data.msg,
        error: false,
      });
      // setName("");
      // setEmail("");
      // setPassword("");
      // setConfirmPassword("");
    } catch (error) {
      setAlert({
        msg: error.response.data.msg, //error.response esta en la doc de axios
        error: true,
      });
    }
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Sign Up and manage your {""}{" "}
        <span className="text-slate-700">projects</span>
      </h1>
      {msg && <Alert alert={alert} />}
      <form
        className="my-10 bg-white shadow rounded-lg px-10 py-5"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl front-bold"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl front-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl front-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl front-bold"
            htmlFor="password2"
          >
            Confirm Password
          </label>
          <input
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="password2"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value={`Sign up`}
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors "
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Already Member? Login
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/password-forgot"
        >
          Forgot password?
        </Link>
      </nav>
    </>
  );
};

export default Register;

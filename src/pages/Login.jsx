import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import clientAxios from "../config/clientAxios";
import useAuth from "../hooks/useAuth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  const { setAuth } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([email, password].includes("")) {
      setAlert({
        msg: `fields required`,
        error: true,
      });
      return;
    }
    try {
      
      const { data } = await clientAxios.post("/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);

      setAuth(data);

      setAlert({});
    } catch (error) {
      console.log(error.response.data.msg);
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Login and manage your {""}{" "}
        <span className="text-slate-700">projects</span>
      </h1>
      {msg && <Alert alert={alert} />}

      <form
        onSubmit={handleSubmit}
        className="my-10 bg-white shadow rounded-lg px-10 py-5"
      >
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
        <input
          type="submit"
          value={`Login`}
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors "
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/register"
        >
          Are u signed-up?
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

export default Login;

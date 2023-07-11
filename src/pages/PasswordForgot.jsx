import { useState } from "react";
import { Link } from "react-router-dom";
import clientAxios from "../config/clientAxios";
import Alert from "../components/Alert";
const PasswordForgot = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      setAlert({
        msg: `Email required`,
        error: true,
      });
      return;
    }
    try {
      const { data } = await clientAxios.post(
        `/users/forgot-password`,
        { email }
      );
      setAlert({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
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
        Recover your password
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

        <input
          type="submit"
          value={`Send instructions`}
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
          to="/register"
        >
          Are u signed-up?
        </Link>
      </nav>
    </>
  );
};

export default PasswordForgot;

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clientAxios from "../config/clientAxios";
import Alert from "../components/Alert";

const PasswordNew = () => {
  const [password, setPassword] = useState("");
  const [validToken, setValidToken] = useState(false);
  const [alert, setAlert] = useState({});
  const [passwordChanged, setPasswordChanged] = useState(false);
  const params = useParams();
  const { token } = params;
  useEffect(() => {
    const checkToken = async () => {
      try {
        await clientAxios.get(
          `/users/forgot-password/${token}`
        );
        setValidToken(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    checkToken();
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlert({
        msg: `Password minimum 8 characters`,
        error: true,
      });
      return;
    }
    try {
      const url = `/users/forgot-password/${token}`;
      const { data } = await clientAxios.post(url, { password });
      setAlert({
        msg: data.msg,
        error: false,
      });
      setPasswordChanged(true);
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
        Create a New password
      </h1>

      {msg && <Alert alert={alert} />}
      {validToken && (
        <form
          onSubmit={handlesubmit}
          className="my-10 bg-white shadow rounded-lg px-10 py-5"
        >
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
              placeholder="Type a New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value={`Save`}
            className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors "
          />
        </form>
      )}
      {passwordChanged && (
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Login
        </Link>
      )}
    </>
  );
};

export default PasswordNew;

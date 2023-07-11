import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clientAxios from "../config/clientAxios";

const Authcontext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);


  const navigate = useNavigate()
  useEffect(() => {
    //Authenticate USER

    const authenticateUser = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clientAxios.get("/users/profile", config);
        console.log(data, "lo que recibo");
        setAuth(data); //Aca guardo los datos en el context de authorizacion
        navigate('/projects') //optional evita estar registrandose

      } catch (error) {
        setAuth({});
      }
      // finally{

      //   setLoading(false);
      // }
      setLoading(false);
    };

    authenticateUser();
  }, []);

  return (
    <Authcontext.Provider value={{ auth, loading, setAuth }}>
      {children}
    </Authcontext.Provider>
  );
};

export { AuthProvider };

export default Authcontext;

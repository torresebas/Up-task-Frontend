import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PasswordForgot from "./pages/PasswordForgot";
import PasswordNew from "./pages/PasswordNew";
import ConfirmAccount from "./pages/ConfirmAccount";

import PrivateRoute from "./layouts/PrivateRoute";
import Projects from "./pages/Projects";

//Context
import { AuthProvider } from "./context/AuthProvider";
import NuevoProyecto from "./pages/NuevoProyecto";

// console.log(import.meta.env.VITE_BACKEND_URL)

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Area */}
          <Route path="/" element={<AuthLayout />}>
            {/* index por que esta ligado a "/" */}
            <Route index element={<Login />} /> 
            {/* path si toma la raiz y le suma  eg "/registrar" no se le pone "/" */}
            <Route path="register" element={<Register />} />
            <Route path="password-forgot" element={<PasswordForgot />} />
            <Route path="password-forgot/:token" element={<PasswordNew />} />
            <Route path="confirm/:token" element={<ConfirmAccount />} />
          </Route>
          {/* Private Area */}
          <Route path="/proyectos" element={<PrivateRoute />}>
            <Route index element={<Projects />} />
            <Route path="crear-proyecto" element={<NuevoProyecto />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

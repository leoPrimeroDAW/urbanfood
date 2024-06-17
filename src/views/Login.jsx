import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button, Input } from "@nextui-org/react";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token); // Almacena el token en localStorage
        setToken(token); // Actualiza el estado del token
        navigate("/admin/pedidos"); // Redirige al usuario después del inicio de sesión
      } else {
        alert("Error: " + response.data);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error logging in");
    }
  };

  return (
    <>
      <div className="pl-6 pr-6 pt-11 pb-8 h-dvh">
        <Card>
          <CardHeader>
            <h1 className="font-bold text-3xl">Login</h1>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="username">Nombre de usuario</label>
                  <Input
                    type="text"
                    label="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password">Contraseña</label>
                  <Input
                    type="password"
                    label="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="self-end">
                  <Button type="submit" color="primary">
                    Login
                  </Button>
                  <Link to="/register">
                    <Button color="primary" variant="light">
                      Registrarse
                    </Button>
                  </Link>
                </div>
              </div>
            </form>
          </CardBody>
          <CardFooter>FALTA MANEJAR EL ERROR</CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Login;

import AdminForm from "../components/Formularios/AdminForm.jsx";
import { useState, useEffect } from "react";
import RegistroForm from "../components/Formularios/RegistroForm.jsx";
import RegisterList from "../components/Listados/RegisterList.jsx";
import Cookies from "universal-cookie";

export default function AgregarRegistros() {
  const cookies = new Cookies();

  // Estados de sesión
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [cookiesLoaded, setCookiesLoaded] = useState(false);

  // Estados del formulario
  const [idAlumno, setIdAlumno] = useState("");
  const [idLibro, setIdLibro] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaTermino, setFechaTermino] = useState("");

  // Datos desde la API
  const [alumnos, setAlumnos] = useState([]);
  const [libros, setLibros] = useState([]);
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");

  // Refrescar lista
  const [forceRefresh, setForceRefresh] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Cargar cookies al inicio
  useEffect(() => {
    setCookiesLoaded(true);
  }, []);

  // Verificar sesión
  useEffect(() => {
    if (!cookiesLoaded) return;

    const sessionId = cookies.get("idSession");
    const sessionPassword = cookies.get("sessionPassword");
    const sessionExpireTime = cookies.get("sessionExpireTime");
    const currentTime = new Date().getTime();

    if (sessionId === "1" && sessionPassword === "123456") {
      if (sessionExpireTime && currentTime < parseInt(sessionExpireTime)) {
        console.log("Sesión válida");
        setIsAuthorized(true);
        fetchApi();
      } else {
        console.log("Sesión expirada");
        handleLogout();
      }
    } else {
      console.log("Sesión inválida");
      setIsAuthorized(false);
    }
  }, [cookiesLoaded]);

  // Obtener datos para dropdown
  const fetchApi = async () => {
    try {
      const responseAlumnos = await fetch("http://localhost:5000/api/get/alumnos");
      const responseLibros = await fetch("http://localhost:5000/api/get/libros");

      if (!responseAlumnos.ok || !responseLibros.ok) {
        throw new Error("Error al obtener los datos");
      }

      const { result } = await responseAlumnos.json();
      const { result: resultLibros } = await responseLibros.json();

      setAlumnos(result);
      setLibros(resultLibros);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  // Validación de clave
  const handleValidation = (clave) => {
    if (clave === "123456") {
      const expireDate = new Date();
      expireDate.setHours(expireDate.getHours() + 1);
      const expireTimestamp = expireDate.getTime();

      cookies.set("idSession", "1", { path: "/", expires: expireDate });
      cookies.set("sessionPassword", "123456", { path: "/", expires: expireDate });
      cookies.set("sessionExpireTime", expireTimestamp.toString(), { path: "/", expires: expireDate });

      setIsAuthorized(true);
      fetchApi();
      resetForm();
    } else {
      alert("Clave incorrecta");
    }
  };

  // Cerrar sesión
  const handleLogout = () => {
    cookies.remove("idSession", { path: "/" });
    cookies.remove("sessionPassword", { path: "/" });
    cookies.remove("sessionExpireTime", { path: "/" });
    setIsAuthorized(false);
  };

  // Guardar nuevo registro
  const guardarRegistro = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const nuevoRegistro = {
      id_alumno: idAlumno,
      id_libro: idLibro,
      inicio: fechaInicio,
      fin: fechaTermino,
    };

    try {
      const response = await fetch("http://localhost:5000/api/registros/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoRegistro),
      });

      if (response.ok) {
        setNotification("Registro guardado correctamente");
        setError("");
        resetForm();
        setTimeout(() => setForceRefresh(prev => prev + 1), 500);
      } else {
        const errorData = await response.json();
        setNotification("");
        setError(errorData.message || "Error al guardar el registro");
      }
    } catch (error) {
      console.error("Error al guardar el registro:", error);
      setNotification("");
      setError("No se pudo conectar al servidor.");
    } finally {
      setIsLoading(false);
      setTimeout(() => setNotification(""), 3000);
    }
  };

  // Limpiar campos del formulario
  const resetForm = () => {
    setIdAlumno("");
    setIdLibro("");
    setFechaInicio("");
    setFechaTermino("");
  };

  if (!cookiesLoaded) return <div>Cargando...</div>;

  return (
    <div>
      {!isAuthorized ? (
        <AdminForm onValidate={handleValidation} />
      ) : (
        <div className="mt-24">
          <RegistroForm
            idAlumno={idAlumno}
            idLibro={idLibro}
            setIdAlumno={setIdAlumno}
            setIdLibro={setIdLibro}
            setFechaInicio={setFechaInicio}
            setFechaTermino={setFechaTermino}
            alumnos={alumnos}
            libros={libros}
            guardarRegistro={guardarRegistro}
            notification={notification}
            error={error}
          />
          <div className="flex justify-around items-center mb-4 mt-5">
            <button
              onClick={handleLogout}
              className="bg-slate-800 text-white p-2 rounded-md"
            >
              Cerrar sesión
            </button>
            <button
              onClick={() => setForceRefresh(prev => prev + 1)}
              className="bg-slate-800 text-white p-2 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? "Actualizando..." : "Forzar Actualizado"}
            </button>
          </div>
          <RegisterList 
            alumnos={alumnos}
            libros={libros}
            key={forceRefresh} />
        </div>
      )}
    </div>
  );
}

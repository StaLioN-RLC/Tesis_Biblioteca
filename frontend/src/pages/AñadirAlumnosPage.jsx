import AlumnosForm from "../components/Formularios/Alumnosform.jsx";
import AdminForm from "../components/Formularios/AdminForm.jsx";
import AlumnosListPage from "../components/Listados/NoFetch/AlumnosListPage.jsx";
import Cookies from "universal-cookie";
import { useState, useEffect } from "react";

export default function AgregarAlumnos() {
    const cookies = new Cookies();

    // Estados
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [grado, setGrado] = useState("");
    const [grupo, setGrupo] = useState("");
    const [numControl, setNumControl] = useState("");
    const [notificacion, setNotificacion] = useState("");
    const [error, setError] = useState("");
    const [alumnos, setAlumnos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [forceRefresh, setForceRefresh] = useState(0);
    // Cockies
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [cookiesLoaded, setCookiesLoaded] = useState(false);


    // NUEVO
    useEffect(() => {
        setCookiesLoaded(true);
    }, []);

    // Obtener alumnos desde la API MODIFICADO
    const fetchAlumnos = async () => {
        setIsLoading(true);
        try {
            console.log("Obteniendo lista de alumnos...");
            const response = await fetch("http://localhost:5000/api/get/alumnos", {
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });

            if (!response.ok) {
                throw new Error("Error al obtener los alumnos");
            }

            const data = await response.json();
            // Importante: Verificar la estructura de la respuesta
            const alumnosData = data.result || data;

            console.log("Datos recibidos:", alumnosData);
            setAlumnos(alumnosData);
        } catch (error) {
            console.error("Error al obtener alumnos:", error);
            setError("Error al cargar la lista de alumnos: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Efecto para recargar la lista cuando cambia forceRefresh NUEVO
    useEffect(() => {
        if (isAuthorized) {
            fetchAlumnos();
        }
    }, [forceRefresh, isAuthorized]);

    // Verificación de sesión al cargar el componente MODIFICADO
    useEffect(() => {
        if (!cookiesLoaded) return;

        const sessionId = cookies.get("idSession");
        const sessionPassword = cookies.get("sessionPassword");
        const sessionExpireTime = cookies.get("sessionExpireTime");

        const currentTime = new Date().getTime();
        console.log("Verificando sesión:", { sessionId, sessionPassword, sessionExpireTime });

        if (sessionId === "1" && sessionPassword === "123456") {
            if (sessionExpireTime && currentTime < parseInt(sessionExpireTime)) {
                console.log("Sesión válida");
                setIsAuthorized(true);
                fetchAlumnos(); // Cargar alumnos al iniciar sesión
            } else {
                console.log("Sesión expirada");
                handleLogout();
            }
        } else {
            console.log("Sesión inválida");
            setIsAuthorized(false);
        }
    }, [cookiesLoaded]);

    // Validación de clave de sesión MODIFICADO
    const handleValidation = (clave) => {
        console.log("Clave introducida:", clave);
        if (clave === "123456") {
            console.log("Clave correcta");

            cookies.remove("idSession", { path: "/" });
            cookies.remove("sessionPassword", { path: "/" });
            cookies.remove("sessionExpireTime", { path: "/" });

            const expireDate = new Date();
            expireDate.setHours(expireDate.getHours() + 1);
            const expireTimestamp = expireDate.getTime();

            cookies.set("idSession", "1", { path: "/", expires: expireDate });
            cookies.set("sessionPassword", "123456", { path: "/", expires: expireDate });
            cookies.set("sessionExpireTime", expireTimestamp.toString(), { path: "/", expires: expireDate });

            setIsAuthorized(true);
            fetchAlumnos(); // Cargar alumnos al validar la clave
            resetForm();
        } else {
            console.log("Clave incorrecta");
            alert("Clave incorrecta");
        }
    };

    // Cerrar sesión NUEVO
    const handleLogout = () => {
        console.log("Cerrando sesión");
        cookies.remove("idSession", { path: "/" });
        cookies.remove("sessionPassword", { path: "/" });
        cookies.remove("sessionExpireTime", { path: "/" });
        setIsAuthorized(false);
    };

    // NUEVO
    if (!cookiesLoaded) {
        return <div>Cargando...</div>;
    }

    // Agregar alumno a la API MODIFICADO
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const nuevoAlumno = {
            nombre,
            apellido,
            grado: parseInt(grado),
            grupo,
            num_control: parseInt(numControl),
        };

        try {
            const response = await fetch("http://localhost:5000/api/add/alumno", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoAlumno),
            });

            if (response.ok) {
                console.log("Alumno agregado correctamente");
                setNotificacion("Alumno agregado correctamente");
                resetForm();

                // Forzar actualización después de agregar
                setTimeout(() => {
                    setForceRefresh(prev => prev + 1);
                }, 500); // Pequeño retraso para dar tiempo al servidor
            } else {
                const errorData = await response.json();
                setNotificacion("");
                setError(errorData.message || "Error al guardar el alumno");
            }
        } catch (error) {
            setNotificacion("");
            setError("Error al guardar el alumno: " + error.message);
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Resetear formulario NUEVO CREO
    const resetForm = () => {
        setNombre("");
        setApellido("");
        setGrado("");
        setGrupo("");
        setNumControl("");
    };

    return (
        <div>
            {!isAuthorized ? (
                <AdminForm onValidate={handleValidation} />
            ) : (
                <div className="mt-24">

                    <AlumnosForm
                        handleSubmit={handleSubmit}
                        nombre={nombre}
                        setNombre={setNombre}
                        apellido={apellido}
                        setApellido={setApellido}
                        grado={grado}
                        setGrado={setGrado}
                        grupo={grupo}
                        setGrupo={setGrupo}
                        numControl={numControl}
                        setNumControl={setNumControl}
                        notificacion={notificacion}
                        error={error}
                    />

                    // NUEVO
                    <div className="flex justify-around items-center mb-4 mt-5">
                        <button onClick={handleLogout} className="bg-slate-800 text-white p-2 rounded-md">
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

                    {/* Pasar los alumnos como prop NUEVO EN NOFETCH*/}
                    <AlumnosListPage alumnos={alumnos} forceRefresh={forceRefresh} />
                </div>
            )}
        </div>
    );
}
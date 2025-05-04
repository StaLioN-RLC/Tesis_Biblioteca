import EditorialesForm from "../components/Formularios/EditorialesForm.jsx";
import AdminForm from "../components/Formularios/AdminForm.jsx";
import EditorialesListPage from "../components/Listados/NoFetch/EditorialsListPage.jsx";
import Cookies from "universal-cookie";
import { useState, useEffect } from "react";

export default function AgregarEditoriales() {
    const cookies = new Cookies();

    // Estado de sesión y cookies
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [cookiesLoaded, setCookiesLoaded] = useState(false);

    // Estados del formulario
    const [nombre, setNombre] = useState("");
    const [notificacion, setNotificacion] = useState("");
    const [error, setError] = useState("");

    // Estado para refrescar listado
    const [forceRefresh, setForceRefresh] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // Cargar cookies al iniciar
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
            } else {
                console.log("Sesión expirada");
                handleLogout();
            }
        } else {
            console.log("Sesión inválida");
            setIsAuthorized(false);
        }
    }, [cookiesLoaded]);

    // Validar clave admin
    const handleValidation = (clave) => {
        if (clave === "123456") {
            const expireDate = new Date();
            expireDate.setHours(expireDate.getHours() + 1);
            const expireTimestamp = expireDate.getTime();

            cookies.set("idSession", "1", { path: "/", expires: expireDate });
            cookies.set("sessionPassword", "123456", { path: "/", expires: expireDate });
            cookies.set("sessionExpireTime", expireTimestamp.toString(), { path: "/", expires: expireDate });

            setIsAuthorized(true);
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

    // Enviar formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const nuevaEditorial = { nombre };

        try {
            const response = await fetch("http://localhost:5000/api/add/editoriales", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevaEditorial),
            });

            if (response.ok) {
                setNotificacion("Editorial agregada correctamente");
                setError("");
                resetForm();
                setTimeout(() => setForceRefresh(prev => prev + 1), 500);
            } else {
                const errorData = await response.json();
                setNotificacion("");
                setError(errorData.message || "Error al guardar la editorial");
            }
        } catch (error) {
            console.error("Error al guardar la editorial:", error);
            setNotificacion("");
            setError("No se pudo conectar al servidor.");
        } finally {
            setIsLoading(false);
            setTimeout(() => setNotificacion(""), 3000);
        }
    };

    // Resetear campos
    const resetForm = () => {
        setNombre("");
    };

    // Esperar cookies
    if (!cookiesLoaded) return <div>Cargando...</div>;

    return (
        <div>
            {!isAuthorized ? (
                <AdminForm onValidate={handleValidation} />
            ) : (
                <div className="mt-24">
                    <EditorialesForm
                        handleSubmit={handleSubmit}
                        editorialSeleccionada={nombre}
                        setEditorialSeleccionada={setNombre}
                        notificacion={notificacion}
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

                    <EditorialesListPage
                        nombre={nombre}
                        key={forceRefresh} 
                    />
                </div>
            )}
        </div>
    );
}

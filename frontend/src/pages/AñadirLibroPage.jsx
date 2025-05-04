import LibrosForm from "../components/Formularios/LibrosForm.jsx";
import AdminForm from "../components/Formularios/AdminForm.jsx";
import BookList from "../components/Listados/BookList.jsx";
import Cookies from "universal-cookie";

import LibrosListPage from "../components/Listados/NoFetch/LibroListPage.jsx";

import { useState, useEffect } from "react";

export default function AgregarLibros() {
  const cookies = new Cookies();

  // Estado de autenticación y cookies
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [cookiesLoaded, setCookiesLoaded] = useState(false);

  // Estados de datos de formulario
  const [autores, setAutores] = useState([]);
  const [editoriales, setEditoriales] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [autorSeleccionado, setAutorSeleccionado] = useState("");
  const [editorialSeleccionada, setEditorialSeleccionada] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  const [titulo, setTitulo] = useState("");
  const [existencias, setExistencias] = useState("");
  const [paginas, setPaginas] = useState("");

  const [notificacion, setNotificacion] = useState("");
  const [error, setError] = useState("");

  // Estado para refrescar la lista
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
        fetchApi(); // Cargar datos al validar sesión
      } else {
        console.log("Sesión expirada");
        handleLogout();
      }
    } else {
      console.log("Sesión inválida");
      setIsAuthorized(false);
    }
  }, [cookiesLoaded]);

  // Obtener autores, editoriales y categorías
  const fetchApi = async () => {
    try {
      const responseAutores = await fetch("http://localhost:5000/api/get/autores");
      const responseEditoriales = await fetch("http://localhost:5000/api/get/editoriales");
      const responseCategorias = await fetch("http://localhost:5000/api/get/categorias");

      if (!responseAutores.ok || !responseEditoriales.ok || !responseCategorias.ok) {
        throw new Error("Error al obtener los datos");
      }

      const { result } = await responseAutores.json();
      const { result: resultEditoriales } = await responseEditoriales.json();
      const { result: resultCategorias } = await responseCategorias.json();

      setAutores(result);
      setEditoriales(resultEditoriales);
      setCategorias(resultCategorias);
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
      fetchApi(); // Cargar datos al validar
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

    const nuevoLibro = {
      titulo,
      id_autor: parseInt(autorSeleccionado),
      id_editorial: parseInt(editorialSeleccionada),
      id_categoria: parseInt(categoriaSeleccionada),
      existencias: parseInt(existencias),
      num_paginas: parseInt(paginas),
    };

    try {
      const response = await fetch("http://localhost:5000/api/add/libro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoLibro),
      });

      if (response.ok) {
        setNotificacion("Libro agregado correctamente");
        setError("");
        resetForm();
        setTimeout(() => setForceRefresh(prev => prev + 1), 500);
      } else {
        const errorData = await response.json();
        setNotificacion("");
        setError(errorData.message || "Error al guardar el libro");
      }
    } catch (error) {
      console.error("Error al guardar el libro:", error);
      setNotificacion("");
      setError("No se pudo conectar al servidor.");
    } finally {
      setIsLoading(false);
      setTimeout(() => setNotificacion(""), 3000);
    }
  };

  // Limpiar campos
  const resetForm = () => {
    setTitulo("");
    setAutorSeleccionado("");
    setEditorialSeleccionada("");
    setCategoriaSeleccionada("");
    setExistencias("");
    setPaginas("");
  };

  if (!cookiesLoaded) return <div>Cargando...</div>;

  return (
    <div>
      {!isAuthorized ? (
        <AdminForm onValidate={handleValidation} />
      ) : (
        <div className="mt-24">
          <LibrosForm
            handleSubmit={handleSubmit}
            autores={autores}
            editoriales={editoriales}
            categorias={categorias}
            autorSeleccionado={autorSeleccionado}
            setAutorSeleccionado={setAutorSeleccionado}
            editorialSeleccionada={editorialSeleccionada}
            setEditorialSeleccionada={setEditorialSeleccionada}
            categoriaSeleccionada={categoriaSeleccionada}
            setCategoriaSeleccionada={setCategoriaSeleccionada}
            titulo={titulo}
            setTitulo={setTitulo}
            existencias={existencias}
            setExistencias={setExistencias}
            paginas={paginas}
            setPaginas={setPaginas}
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

          <LibrosListPage
            autores={autores}
            editoriales={editoriales}
            categorias={categorias}
            forceRefresh={forceRefresh}
          />
        </div>
      )}
    </div>
  );
}

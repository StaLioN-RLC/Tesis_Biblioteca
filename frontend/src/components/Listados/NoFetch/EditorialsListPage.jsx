import React, { useState, useEffect } from "react";
import { Pagination } from '../../TablePagination/Pagination';

const EditorialesListPage = ({ forceRefresh }) => {
  // Estado para almacenar las editoriales
  const [editoriales, setEditoriales] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Estados para paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(10);

  // Obtener editoriales desde la API
  const fetchEditoriales = async () => {
    setIsLoading(true);
    try {
      console.log("Obteniendo lista de editoriales...");
      const response = await fetch("http://localhost:5000/api/get/editoriales", {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });

      if (!response.ok) {
        throw new Error("Error al obtener las editoriales");
      }

      const data = await response.json();
      const editorialesData = data.result || data;

      console.log("Datos de editoriales recibidos:", editorialesData);
      setEditoriales(editorialesData);
    } catch (error) {
      console.error("Error al obtener editoriales:", error);
      setError("Error al cargar la lista de editoriales: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Efecto para recargar la lista cuando cambia forceRefresh
  useEffect(() => {
    fetchEditoriales();
  }, [forceRefresh]);

  const maximo = editoriales ? Math.ceil(editoriales.length / porPagina) : 0;

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-9 mb-6">
        <p className="text-center text-gray-500">Cargando editoriales...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-9 mb-6">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  if (!editoriales || editoriales.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-9 mb-6">
        <p className="text-center text-gray-500">No hay editoriales registradas.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-9 mb-6">
      {editoriales
        .slice(
          (pagina - 1) * porPagina, 
          (pagina - 1) * porPagina + porPagina
        )
        .map((editorial) => (
          <div
            key={editorial.id}
            className="p-4 mt-2 flex justify-between items-center border-b border-gray-300 py-4"
          >
            <div className="text-left w-2/3">
              <h2 className="text-lg font-semibold text-gray-800">
                {editorial.nombre}
              </h2>
            </div>
          </div>
        ))}

      <Pagination 
        pagina={pagina} 
        setPagina={setPagina} 
        maximo={maximo} 
        className="justify-center"
      />
    </div>
  );
};

export default EditorialesListPage;
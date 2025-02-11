import React, { useState, useEffect } from "react";

const AutorsList = () => {
  const [books, setAutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAutors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/get/autores");

        if (!response.ok) {
          throw new Error("Error al obtener los autores");
        }
        const { result } = await response.json();
        setAutors(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAutors();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-9 mb-6">
      {books.map((autor) => (
        <div
          key={autor.id}
          className="p-4 mt-2 flex justify-between items-center border-b border-gray-300 py-4"
        >
          {/* Nombre */}
          <div className="w-1/2">
            <h2 className="text-lg font-semibold text-gray-800">
                {autor.nombre}
            </h2>
          </div>

          {/* Apellido */}
          <div className="w-1/2">
            <span className="text-md font-medium text-gray-700">
              {autor.apellido}
            </span>
          </div>
          </div>
      ))}
    </div>
  );
};

export default AutorsList;

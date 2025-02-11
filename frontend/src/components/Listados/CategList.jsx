import React, { useState, useEffect } from "react";

const CategList = () => {
  const [categorys, setCategorys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategorys = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/get/categorias");

        if (!response.ok) {
          throw new Error("Error al obtener los libros");
        }
        const { result } = await response.json();
        setCategorys(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategorys();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-9 mb-6">
      {categorys.map((category) => (
        <div
          key={category.id}
          className="p-4 mt-2 flex justify-between items-center border-b border-gray-300 py-4"
        >
          {/* Texto : Título*/}
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-800 shadow-2xl">
              {category.nombre}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategList;

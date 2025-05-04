import React, { useState, useEffect } from "react";
import { Pagination } from '../../TablePagination/Pagination';

const LibrosListPage = ({ autores, editoriales, categorias, forceRefresh }) => {
  // Estado para almacenar los libros
  const [libros, setLibros] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Estados para paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(10);

  // Obtener libros desde la API
  const fetchLibros = async () => {
    setIsLoading(true);
    try {
      console.log("Obteniendo lista de libros...");
      const response = await fetch("http://localhost:5000/api/get/libros", {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });

      if (!response.ok) {
        throw new Error("Error al obtener los libros");
      }

      const data = await response.json();
      const librosData = data.result || data;

      console.log("Datos de libros recibidos:", librosData);
      
      // Enriquecer los datos de libros con información de autores, editoriales y categorías
      const librosEnriquecidos = librosData.map(libro => ({
        ...libro,
        autor: getNombreAutor(libro.id_autor),
        editorial: getNombreEditorial(libro.id_editorial),
        categoria: getNombreCategoria(libro.id_categoria)
      }));
      
      setLibros(librosEnriquecidos);
    } catch (error) {
      console.error("Error al obtener libros:", error);
      setError("Error al cargar la lista de libros: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Funciones para obtener nombres a partir de IDs
  const getNombreAutor = (autorId) => {
    const autorEncontrado = autores.find(autor => autor.id === autorId);
    return autorEncontrado ? autorEncontrado.nombre : "Autor desconocido";
  };

  const getNombreEditorial = (editorialId) => {
    const editorialEncontrada = editoriales.find(editorial => editorial.id === editorialId);
    return editorialEncontrada ? editorialEncontrada.nombre : "Editorial desconocida";
  };

  const getNombreCategoria = (categoriaId) => {
    const categoriaEncontrada = categorias.find(categoria => categoria.id === categoriaId);
    return categoriaEncontrada ? categoriaEncontrada.nombre : "Categoría desconocida";
  };

  // Efecto para recargar la lista cuando cambia forceRefresh
  useEffect(() => {
    if (autores.length > 0 && editoriales.length > 0 && categorias.length > 0) {
      fetchLibros();
    }
  }, [forceRefresh, autores, editoriales, categorias]);

  const maximo = libros ? Math.ceil(libros.length / porPagina) : 0;

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-9 mb-6">
        <p className="text-center text-gray-500">Cargando libros...</p>
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

  if (!libros || libros.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-9 mb-6">
        <p className="text-center text-gray-500">No hay libros registrados.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-9 mb-6">
      {libros
        .slice(
          (pagina - 1) * porPagina, 
          (pagina - 1) * porPagina + porPagina
        )
        .map((libro) => (
          <div
            key={libro.id}
            className="p-4 mt-2 flex justify-between items-center border-b border-gray-300 py-4"
          >
            <div className="text-left w-2/3">
              <h2 className="text-lg font-semibold text-gray-800">
                {libro.titulo}
              </h2>
              <p className="text-sm text-gray-500">Autor: {libro.autor}</p>
              <p className="text-sm text-gray-500">Editorial: {libro.editorial}</p>
              <p className="text-sm text-gray-500">Categoría: {libro.categoria}</p>
              <p className="text-sm text-gray-500">Existencias: {libro.existencias}</p>
              <p className="text-sm text-gray-500">Páginas: {libro.num_paginas}</p>
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

export default LibrosListPage;
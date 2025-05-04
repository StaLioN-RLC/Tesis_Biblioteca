import React from "react";
import { useState } from "react";

import { Pagination } from '../../TablePagination/Pagination';

const CategoriasListPage = ({ categorias: categoriasProp, forceRefresh }) => {
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(10);

  const maximo = categoriasProp ? categoriasProp.length / porPagina : 0;

  if (!categoriasProp || categoriasProp.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-9 mb-6">
        <p className="text-center text-gray-500">No hay categorías registradas.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-9 mb-6">
      {categoriasProp
        .slice(
          (pagina - 1) * porPagina,
          (pagina - 1) * porPagina + porPagina
        )
        .map((categoria) => (
          <div
            key={categoria.id}
            className="p-4 mt-2 flex justify-between items-center border-b border-gray-300 py-4"
          >
            <div className="text-left w-full">
              <h2 className="text-lg font-semibold text-gray-800">
                {categoria.nombre}
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

export default CategoriasListPage;
import React from "react";
import { useState } from "react";

import { Pagination } from '../../TablePagination/Pagination';

const AutoresListPage = ({ autores: autoresProp }) => {
  const [pagina, setPagina] = useState(1);
  const [porPagina] = useState(10);

  const maximo = autoresProp ? autoresProp.length / porPagina : 0;

  if (!autoresProp || autoresProp.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-9 mb-6">
        <p className="text-center text-gray-500">No hay autores registrados.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-9 mb-6">
      {autoresProp
        .slice(
          (pagina - 1) * porPagina,
          (pagina - 1) * porPagina + porPagina
        )
        .map((autor) => (
          <div
            key={autor.id}
            className="p-4 mt-2 flex justify-between items-center border-b border-gray-300 py-4"
          >
            {/* Nombre y Apellido */}
            <div className="text-left w-full">
              <h2 className="text-lg font-semibold text-gray-800">
                {autor.nombre} {autor.apellido}
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

export default AutoresListPage;
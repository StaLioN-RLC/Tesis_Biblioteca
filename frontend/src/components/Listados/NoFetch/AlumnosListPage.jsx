import React from "react";
import { useState } from "react";

import { Pagination } from '../../TablePagination/Pagination';

const AlumnosListPage = ({ alumnos: alumnosProp, forceRefresh }) => {
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(10);

  const maximo = alumnosProp ? alumnosProp.length / porPagina : 0;

  if (!alumnosProp || alumnosProp.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-9 mb-6">
        <p className="text-center text-gray-500">No hay alumnos registrados.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-9 mb-6">
      {alumnosProp
        .slice(
          (pagina - 1) * porPagina, 
          (pagina - 1) * porPagina + porPagina
        )
        .map((alumno) => (
          <div
            key={alumno.id || alumno.num_control}
            className="p-4 mt-2 flex justify-between items-center border-b border-gray-300 py-4"
          >
            {/* Lado izquierdo: Nombre y Apellido */}
            <div className="text-left w-1/3">
              <h2 className="text-lg font-semibold text-gray-800">
                {alumno.nombre} {alumno.apellido}
              </h2>
              <p className="text-sm text-gray-500">Número de control: {alumno.num_control}</p>
            </div>

            {/* Centro: Grado y Grupo */}
            <div className="text-center w-1/3">
              <span className="text-md font-medium text-gray-700">
                Grado: {alumno.grado} | Grupo: {alumno.grupo}
              </span>
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

export default AlumnosListPage;
import React from "react";
import AutorsList from "../components/Listados/AutorList.jsx";

function InventarioAutores() {
  return (
    <div className="p-4 max-w-6xl mx-auto mt-9">
      <h1 className="text-2xl font-bold mb-9 mt-9 text-center text-black">Autores de tus libros</h1>
      <ul className="space-y-4">
        <AutorsList/>
      </ul>
    </div>
  );
}

export default InventarioAutores;
import React from "react";
import CategList from "../components/Listados/CategList.jsx";

function InventarioLibros() {
  return (
    <div className="p-4 max-w-6xl mx-auto mt-9">
      <h1 className="text-2xl font-bold mb-9 mt-9 text-center text-black">Categorias existentes de libros</h1>
      <ul className="space-y-4">
        <CategList/>
      </ul>
    </div>
  );
}

export default InventarioLibros;
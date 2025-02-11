import React from "react";
import BookList from "../components/Listados/BookList.jsx";

function InventarioLibros() {
  return (
    <div className="p-4 max-w-6xl mx-auto mt-9">
      <h1 className="text-2xl font-bold mb-6 mt-9 text-center text-black">Inventario de Libros</h1>
      <ul className="space-y-4">
        <BookList />
      </ul>
    </div>
  );
}

export default InventarioLibros;

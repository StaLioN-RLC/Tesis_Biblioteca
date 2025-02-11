import React from "react";
import Notificacion from "../Notification";

function CategoriasForm({
  handleSubmit,
  categoriaSeleccionada,
  setCategoriaSeleccionada,
  notificacion,
  error,
}) {
  return (  
    <div className="max-w-lg mx-auto bg-white/[0.005] bg-[#eeeeee] p-6 rounded-lg shadow-2xl">
      <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
        {/* Nombre de la categoría */}
        <div>
          <label
            htmlFor="categoria"
            className="block text-sm font-medium text-gray-900"
          >
            Nombre de la categoría:
          </label>
          <input
            type="text"
            id="categoria"
            placeholder="Nombre de la categoría"
            className="mt-1 w-full rounded-md px-3 py-1 text-gray-950 bg-[#ffffff]  shadow-sm focus:ring-2 focus:ring-slate-200"
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          />
        </div>

        {/* Botón para enviar */}
        <div className="text-center">
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-slate-500 text-white font-medium rounded-md shadow-sm hover:bg-slate-600"
          >
            Guardar Categoría
          </button>
        </div>
      </form>

      {/* Notificación */}
      {notificacion === "true" && (
        <Notificacion
          title="Categoría guardada exitosamente."
          message="La categoría se ha añadido exitosamente al sistema."
          type="success"
        />
      )}
      {notificacion === "error" && (
        <Notificacion
          title="Error al guardar la categoría."
          message={error}
          type="error"
        />
      )}
    </div>
  );
}

export default CategoriasForm;

import React from "react";
import Notificacion from "../Notification";

function AutoresForm({
  handleSubmit,
  Nombre,
  setNombre,
  Apellido,
  setApellido,
  notificacion,
  error,
}) {
  return (
    <div className="max-w-4xl mx-auto bg-white/[0.005] bg-[#eeeeee] p-6 rounded-lg shadow-2xl">
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={handleSubmit}
      >
        {/* Nombre */}
        <div className="col-span-2">
          <label
            htmlFor="autor"
            className="block text-sm font-medium text-gray-900"
          >
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            placeholder="Nombre del autor"
            className="mt-1 w-full rounded-md px-3 py-1 text-gray-900 bg-white shadow-sm focus:ring-2 focus:ring-slate-200"
            value={Nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        {/* Apellido */}

        <div className="col-span-2">
          <label
            htmlFor="apellido"
            className="block text-sm font-medium text-gray-900"
          >
            Apellido:
          </label>
          <input
            type="text"
            id="apellido"
            placeholder="Apellido del autor"
            className="mt-1 w-full rounded-md px-3 py-1 text-gray-900 bg-white shadow-sm focus:ring-2 focus:ring-slate-200"
            value={Apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>
        
        {/* Botón */}
        <div className="col-span-2 text-center">
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-slate-500 text-white font-medium rounded-md shadow-sm hover:bg-slate-600"
          >
            Guardar Autor
          </button>
        </div>
      </form>

      {/* Notificación */}
      {(notificacion == "true" && (
        <Notificacion
          title={"Autor guardado exitosamente."}
          message={"El autor se ha añadido exitosamente al sistema."}
          type={notificacion}
        />
      )) ||
        (notificacion == "error" && (
          <Notificacion
            title={"Error al guardar el Autor."}
            message={error}
            type={notificacion}
          />
        ))}
    </div>
  );
}

export default AutoresForm;

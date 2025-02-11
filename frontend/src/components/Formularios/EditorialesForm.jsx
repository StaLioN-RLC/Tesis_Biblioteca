import React, { useState } from "react";
import Notificacion from "../Notification";

const EditorialesForm = ({
    handleSubmit,
    editorialSeleccionada,
    setEditorialSeleccionada,
    notificacion,
    error,
}) => {
    return (
        <div className="max-w-lg mx-auto bg-white/[0.005] bg-[#eeeeee] p-6 rounded-lg shadow-2xl">
            <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
                {/* Nombre de la editorial */}
                <div>
                    <label
                        htmlFor="editorial"
                        className="block text-sm font-medium text-gray-900"
                    >
                        Nombre de la editorial:
                    </label>
                    <input
                        type="text"
                        id="editorial"
                        placeholder="Nombre de la editorial"
                        className="mt-1 w-full rounded-md px-3 py-1 text-gray-900 bg-white shadow-sm focus:ring-2 focus:ring-slate-200"
                        value={editorialSeleccionada}
                        onChange={(e) => setEditorialSeleccionada(e.target.value)}
                    />
                </div>

                {/* Botón para enviar */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="mt-4 px-6 py-2 bg-slate-500 text-white font-medium rounded-md shadow-sm hover:bg-slate-600"
                    >
                        Guardar Editorial
                    </button>
                </div>
            </form>

            {/* Notificación */}
            {notificacion === "true" && (
                <Notificacion
                    title="Editorial guardada exitosamente."
                    message="La editorial se ha añadido exitosamente al sistema."
                    type="success"
                />
            )}
            {notificacion === "error" && (
                <Notificacion
                    title="Error al guardar la editorial."
                    message={error}
                    type="error"
                />
            )}
        </div>
    );
};

export default EditorialesForm;
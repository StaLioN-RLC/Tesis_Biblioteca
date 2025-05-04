import React, { useState } from "react";
import Notificacion from "../Notification";

function AlumnosForm({
    handleSubmit,
    nombre,
    setNombre,
    apellido,
    setApellido,
    grado,
    setGrado,
    grupo,
    setGrupo,
    numControl,
    setNumControl,
    notificacion,
    error,
}) {
    const manejarCambio = (e) => {
        const nuevoValor = e.target.value;

        // Asegúrate de que el valor esté dentro del rango permitido
        if (nuevoValor === "" || (nuevoValor.length >= 1 && nuevoValor.length <= 11)) {
            setNumControl(nuevoValor);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white/[0.005] bg-[#eeeeee] p-6 rounded-lg shadow-2xl">
            <form
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                onSubmit={handleSubmit}
            >
                {/* Nombre */}
                <div className="col-span-2">
                    <label
                        htmlFor="nombre"
                        className="block text-sm font-medium text-gray-900"
                    >
                        Nombre:
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        placeholder="Nombre del alumno"
                        className="mt-1 w-full rounded-md px-3 py-1 text-gray-900 bg-white shadow-sm focus:ring-2 focus:ring-slate-200"
                        value={nombre}
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
                        placeholder="Apellido del alumno"
                        className="mt-1 w-full rounded-md px-3 py-1 text-gray-900 bg-white shadow-sm focus:ring-2 focus:ring-slate-200"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                    />
                </div>

                {/* Grado */}
                <div className="col-span-2">
                    <label
                        htmlFor="grado"
                        className="block text-sm font-medium text-gray-900"
                    >
                        Grado:
                    </label>
                    <input
                        type="number"
                        id="grado"
                        placeholder="Grado del alumno"
                        className="mt-1 w-full rounded-md px-3 py-1 text-gray-900 bg-white shadow-sm focus:ring-2 focus:ring-slate-200"
                        value={grado}
                        onChange={(e) => setGrado(e.target.value)}
                    />
                </div>

                {/* Grupo */}
                <div className="col-span-2">
                    <label
                        htmlFor="grupo"
                        className="block text-sm font-medium text-gray-900"
                    >
                        Grupo:
                    </label>
                    <input
                        type="text"
                        id="grupo"
                        placeholder="Grupo del alumno"
                        className="mt-1 w-full rounded-md px-3 py-1 text-gray-900 bg-white shadow-sm focus:ring-2 focus:ring-slate-200"
                        value={grupo}
                        onChange={(e) => setGrupo(e.target.value)}
                    />
                </div>

                {/* Número de control */}
                <div className="col-span-2">
                    <label
                        htmlFor="numControl"
                        className="block text-sm font-medium text-gray-900"
                    >
                        Número de Control:
                    </label>
                    <input
                        type="number"
                        id="numControl"
                        placeholder="Número de control"
                        className="mt-1 w-full rounded-md px-3 py-1 text-gray-900 bg-white shadow-sm focus:ring-2 focus:ring-slate-200"
                        value={numControl}
                        onChange={(e) => manejarCambio(e)}
                    />
                </div>

                {/* Botón */}
                <div className="col-span-2 text-center">
                    <button
                        type="submit"
                        className="mt-4 px-6 py-2 bg-slate-500 text-white font-medium rounded-md shadow-sm hover:bg-slate-600"
                    >
                        Guardar Alumno
                    </button>
                </div>
            </form>

            {/* Notificación */}
            {(notificacion === "true" && (
                <Notificacion
                    title={"Alumno guardado exitosamente."}
                    message={"El alumno se ha añadido exitosamente al sistema."}
                    type={notificacion}
                />
            )) ||
                (notificacion === "error" && (
                    <Notificacion
                        title={"Error al guardar el alumno."}
                        message={error}
                        type={notificacion}
                    />
                ))}
        </div>
    );
}

export default AlumnosForm;

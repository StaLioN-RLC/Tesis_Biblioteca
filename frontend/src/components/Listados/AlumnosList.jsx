import React, { useState, useEffect } from "react";

const AlumnosList = () => {
    const [alumnos, setAlumnos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlumnos = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/get/alumnos");

                if (!response.ok) {
                    throw new Error("Error al obtener los alumnos");
                }
                const { result } = await response.json();
                setAlumnos(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAlumnos();
    }, []);

    if (loading) return <p className="text-center text-gray-500">Cargando...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-9 mb-6">
            {alumnos.map((alumno) => (
                <div
                    key={alumno.id}
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
        </div>
    );
};

export default AlumnosList;

import React, { useState, useEffect } from "react";

const EditorialesList = () => {
    const [editoriales, setEditoriales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEditoriales = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/get/editoriales");

                if (!response.ok) {
                    throw new Error("Error al obtener las editoriales");
                }
                const { result } = await response.json();
                setEditoriales(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchEditoriales();
    }, []);

    if (loading) return <p className="text-center text-gray-500">Cargando...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-9 mb-6">
            {editoriales.map((editorial) => (
                <div
                    key={editorial.id}
                    className="p-4 mt-2 flex justify-between items-center border-b border-gray-300 py-4"
                >
                    {/* Lado izquierdo: Título */}
                    <div className="text-left">
                        <h2 className="text-lg font-semibold text-gray-800">{editorial.nombre}</h2>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EditorialesList;
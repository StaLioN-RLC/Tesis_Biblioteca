import { useState, useEffect } from "react";

export default function RegisterList() {
  /* Estado para almacenar los registros */
  const [registros, setRegisters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* Obtener los registros */
  useEffect(() => {
    const fetchRegister = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/registros/gets"
        );

        if (!response.ok) {
          throw new Error("Error al obtener los registros");
        }
        const { result } = await response.json();
        setRegisters(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRegister();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <ul className="divide-y divide-gray-300">
        {registros.map((registro) => (
          <li
            key={registro.id}
            className="flex items-center justify-between py-4"
          >
            {/* Nombre del alumno */}
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-800">
                {registro.alumno}
              </span>
              <span className="text-sm text-gray-600">{registro.libro}</span>
            </div>

            {/* Fechas */}
            <div className="text-right">
              <p className="text-sm text-gray-600">
                Inicio: {new Date(registro.inicio).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                Fin: {new Date(registro.fin).toLocaleDateString()}
              </p>
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
}


import SearchList from "../components/Listados/SearchList";
import SearchInv from "../components/SearchInv";
import React, { useState, useEffect } from "react";

export default function Inventario() {
  const [filtro, setFiltro] = useState("autores");
  const [opciones, setOpciones] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [seleccion, setSeleccion] = useState("");
  const [resultado, setResultado] = useState([]); // Inicializado como array vacío
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOpciones = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/get/${filtro}`);
        const { result } = await response.json();
        setOpciones(result);
      } catch (error) {
        console.error("Error al obtener opciones:", error);
      }
    };
    fetchOpciones();
  }, [filtro]);

  const realizarBusqueda = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/busqueda/libro?filtro=${filtro}&opcion=${seleccion}&titulo=${encodeURIComponent(
          busqueda
        )}`
      );
      const { data } = await response.json();
      console.log(data);
      setResultado(data || []); // Si data es undefined o null, usa un array vacío
    } catch (error) {
      console.error("Error al realizar búsqueda:", error);
      setResultado([]); // En caso de error, asegúrate de que resultado sea un array vacío
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto mt-20 text-center">
      <h1 className="text-2xl font-bold mb-4">Buscar en el Inventario</h1>
      <SearchInv
        filtro={filtro}
        setFiltro={setFiltro}
        opciones={opciones}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        realizarBusqueda={realizarBusqueda}
        resultado={resultado}
        loading={loading}
        seleccion={seleccion}
        setSeleccion={setSeleccion}
      />
      {loading ? (
        <p>Cargando...</p>
      ) : Array.isArray(resultado) && resultado.length > 0 ? (
        <SearchList libros={resultado} />
      ) : (
        <p>No se encontraron coincidencias.</p>
      )}
    </div>
  );
}
import React from "react";
import AlumnosList from "../components/Listados/AlumnosList.jsx";

function AlumnosPage() {
    return (
        <div className="p-4 max-w-6xl mx-auto mt-9">
            <h1 className="text-2xl font-bold mb-9 mt-9 text-center text-black">
                Alumnos Registrados
            </h1>
            <ul className="space-y-4">
                <AlumnosList />
            </ul>
        </div>
    );
}

export default AlumnosPage;

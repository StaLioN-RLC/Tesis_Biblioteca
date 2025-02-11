import React from "react";
import RegisterInvList from "../components/Listados/RegisterInvList";

function RegistrosPage () {
    return (
        <div className="p-4 max-w-6xl mx-auto mt-9">
            <h1 className="text-2xl font-bold mt-9 mb-9 text-center text-black">Registros existentes</h1>
            <ul className="space-y-4">
                <RegisterInvList />
            </ul>
        </div>
    );
}

export default RegistrosPage;
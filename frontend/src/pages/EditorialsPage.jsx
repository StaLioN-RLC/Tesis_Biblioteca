import React from "react";
import EditorialesList from "../components/Listados/EditorialsList.jsx";

function EditorialesPage() {
    return (
        <div className="p-4 max-w-6xl mx-auto mt-9">
            <h1 className="text-2xl font-bold mb-9 mt-9 text-center text-black">Editoriales existentes</h1>
            <ul className="space-y-4">
                <EditorialesList />
            </ul>
        </div>
    );
}

export default EditorialesPage;
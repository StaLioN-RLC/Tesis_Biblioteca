// iconos
import { FaChevronCircleRight } from "react-icons/fa";
import { FaChevronCircleLeft } from "react-icons/fa";
import { useState } from "react";

export const Pagination = ({ pagina, setPagina, maximo, className }) => {
    const [input, setInput] = useState(pagina);
    
    const nextPage = () => {
        if (pagina < Math.ceil(maximo)) {
            setPagina(pagina + 1);
            setInput(pagina + 1);
        }
    };
    
    const prevPage = () => {
        if (pagina > 1) {
            setPagina(pagina - 1);
            setInput(pagina - 1);
        }
    };
    
    const onInputChange = (e) => {
        const value = parseInt(e.target.value);
        setInput(value);
    };
    
    const onInputBlur = () => {
        if (input < 1) {
            setPagina(1);
            setInput(1);
        } else if (input > Math.ceil(maximo)) {
            setPagina(Math.ceil(maximo));
            setInput(Math.ceil(maximo));
        } else {
            setPagina(input);
        }
    };
    
    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            onInputBlur();
        }
    };
    
    return (
        <div className={`mt-4 flex items-center justify-center ${className}`}>
            <div className="flex items-center space-x-2">
                <button 
                    onClick={prevPage} 
                    disabled={pagina === 1}
                    className={`text-xl ${pagina === 1 ? 'text-gray-400' : 'text-blue-500 hover:text-blue-700'}`}
                > 
                    <FaChevronCircleLeft /> 
                </button>
                
                <div className="flex items-center">
                    <input 
                        type="number" 
                        value={input}
                        onChange={onInputChange}
                        onBlur={onInputBlur}
                        onKeyDown={onKeyDown}
                        className="w-12 text-center border border-gray-300 rounded px-2 py-1"
                    />
                    <p className="ml-2"> de {Math.ceil(maximo)}</p>
                </div>
                
                <button 
                    onClick={nextPage} 
                    disabled={pagina >= Math.ceil(maximo)}
                    className={`text-xl ${pagina >= Math.ceil(maximo) ? 'text-gray-400' : 'text-blue-500 hover:text-blue-700'}`}
                > 
                    <FaChevronCircleRight /> 
                </button>
            </div>
        </div>
    );
};
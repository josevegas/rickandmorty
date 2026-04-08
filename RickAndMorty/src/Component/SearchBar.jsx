import React, { useState } from "react";

const SearchBar = ({ onSearch, onRandom }) => {
    const [character, setCharacter] = useState("");

    const handleInput = (e) => {
        setCharacter(e.target.value);
    }

    const handleSearch = () => {
        if (character.trim()) {
            onSearch(character);
            setCharacter('');
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className="d-flex align-items-center gap-2" role="search">
            <div className="input-group input-group-sm">
                <input 
                    type="search" 
                    onChange={handleInput} 
                    onKeyDown={handleKeyDown}
                    value={character} 
                    className="form-control glass-effect text-white border-success" 
                    placeholder="ID (1-826)"
                    aria-label="Search by ID"
                />
                <button 
                    onClick={handleSearch} 
                    className="btn btn-primary" 
                    type="button"
                >
                    Agregar
                </button>
            </div>
            <button 
                onClick={onRandom} 
                className="btn btn-outline-info btn-sm orbitron" 
                title="Personaje Aleatorio"
                style={{ fontSize: '0.7rem' }}
            >
                RND
            </button>
        </div>
    )
}

export default SearchBar;
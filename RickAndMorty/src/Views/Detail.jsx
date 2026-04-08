import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const Detail = ({ characters }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const character = characters.find(char => Number(char.id) === Number(id));

    if (!character) {
        return (
            <div className="container py-5 text-center">
                <h2 className="title-neon h1 orbitron">Personaje no encontrado</h2>
                <button onClick={() => navigate('/home')} className="btn btn-primary mt-4">Volver al Home</button>
            </div>
        )
    }

    return (
        <div className="container py-5">
            <div className="glass-effect rounded-4 overflow-hidden border-success border shadow-lg row g-0">
                <div className="col-md-5 d-flex align-items-center justify-content-center bg-dark p-4">
                    <div className="image-container animate-pulse-glow">
                        <img
                            src={character.image}
                            alt={character.name}
                            className="img-fluid rounded-4 border-portal shadow-lg"
                            style={{ border: '4px solid var(--portal-green)' }}
                        />
                    </div>
                </div>
                <div className="col-md-7 p-4 p-lg-5">
                    <header className="mb-4">
                        <span className="badge bg-success orbitron mb-2" style={{ color: '#000' }}>#{character.id}</span>
                        <h1 className="display-4 orbitron title-neon">{character.name}</h1>
                    </header>

                    <div className="detail-info mb-5">
                        <div className="row g-4">
                            <div className="col-6">
                                <h4 className="text-info orbitron h6 small mb-1">Status</h4>
                                <p className={`lead fw-bold ${character.status === 'Alive' ? 'text-success' : character.status === 'Dead' ? 'text-danger' : 'text-warning'}`}>{character.status}</p>
                            </div>
                            <div className="col-6">
                                <h4 className="text-info orbitron h6 small mb-1">Especie</h4>
                                <p className="lead text-light">{character.species}</p>
                            </div>
                            <div className="col-6">
                                <h4 className="text-info orbitron h6 small mb-1">Género</h4>
                                <p className="lead text-light">{character.gender}</p>
                            </div>
                            <div className="col-6">
                                <h4 className="text-info orbitron h6 small mb-1">Origen</h4>
                                <p className="lead text-light">{character.origin}</p>
                            </div>
                            <div className="col-6">
                                <h4 className="text-info orbitron h6 small mb-1">Location</h4>
                                <p className="lead text-light">{character.location}</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/home')}
                        className="btn btn-outline-success orbitron mt-3 px-5 py-2"
                    >
                        &larr; Volver
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Detail;
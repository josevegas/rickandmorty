import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllCharsAction } from "../../redux/cardSlice";
import Card from "../Component/Card";
import Paginado from "../Component/Paginado";

const Favorite = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allCards = useSelector(state => state.cardsReducer.allCards);
    const favIds = useSelector(state => state.cardsReducer.favoriteCards);
    
    // Si entramos a la ruta y la lista global está vacía (por ej. tras F5),
    // pedimos todas las cartas al backend para poder cruzar los IDs de favoritos.
    useEffect(() => {
        if (allCards.length === 0) {
            dispatch(getAllCharsAction());
        }
    }, [dispatch, allCards.length]);

    // Efficiently get favorite character objects
    const favoriteCharacters = allCards.filter(char => 
        favIds.includes(char.id) || favIds.some(fid => Number(fid) === Number(char.id))
    );

    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(6);

    const indexCut = currentPage * cardsPerPage;
    const indexFirstCard = indexCut - cardsPerPage;
    const currentCards = favoriteCharacters.slice(indexFirstCard, indexCut);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div className="favorite-view">
            <header className="mb-5 text-center">
                <h1 className="display-4 orbitron title-neon">MIS FAVORITOS</h1>
                <p className="lead text-light">Tu colección personalizada del multiverso</p>
            </header>

            {favoriteCharacters.length > 0 ? (
                <>
                    <section className="pagination-top d-flex justify-content-center mb-4">
                        <Paginado 
                            cardsPerPage={cardsPerPage} 
                            allCards={favoriteCharacters.length} 
                            paginado={paginado} 
                            currentPage={currentPage} 
                        />
                    </section>

                    <section className="row g-4">
                        {currentCards.map(({ id, name, gender, image, species }) => (
                            <Card 
                                key={id}
                                id={id}
                                name={name}
                                gender={gender}
                                image={image}
                                species={species}
                                isFav={true}
                            />
                        ))}
                    </section>
                </>
            ) : (
                <div className="text-center py-5 glass-effect rounded-4">
                    <h3 className="orbitron h2 mb-4">Aún no tienes favoritos</h3>
                    <p className="text-light opacity-75 mb-5">¡Explora el Home y haz clic en el corazón para agregar personajes!</p>
                    <button onClick={() => navigate("/home")} className="btn btn-primary px-5 py-3 orbitron">
                        IR A EXPLORAR
                    </button>
                </div>
            )}
        </div>
    );
};

export default Favorite;
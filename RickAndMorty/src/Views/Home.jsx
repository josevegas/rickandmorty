import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllCharsAction } from '../../redux/cardSlice';
import Card from "../Component/Card";
import Paginado from "../Component/Paginado";
import Filters from "../Component/Filters";
import Loading from "../Component/Loading";
import LoadMoreCard from "../Component/LoadMoreCard";

/**
 * Home View: The main dashboard of the application.
 * Manages the initial synchronization of characters from the backend
 * and handles pagination and filtering of the character list.
 */
const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.cardsReducer.user);
    const characters = useSelector(state => state.cardsReducer.currentCards);
    const allCharacters = useSelector(state => state.cardsReducer.allCards);
    const favorites = useSelector(state => state.cardsReducer.favoriteCards);
    const isLoading = useSelector(state => state.cardsReducer.isLoading);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(6); // Changed to 6 for better grid layout (3 per row)

    // Initial character sync from backend
    useEffect(() => {
        if (allCharacters.length === 0) {
            dispatch(getAllCharsAction());
        }
    }, [dispatch, allCharacters.length]);
    
    // Pagination logic
    const indexCut = currentPage * cardsPerPage;
    const indexFirstCard = indexCut - cardsPerPage;
    const currentCards = characters.slice(indexFirstCard, indexCut);
    
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const totalCharactersInApi = 826;
    const isLastPage = currentPage >= Math.ceil(characters.length / cardsPerPage);
    const hasMoreInApi = allCharacters.length < totalCharactersInApi;

    return (
        <div className="home-view">
            <header className="mb-5 text-center">
                <h1 className="display-4 mb-3" style={{ color: 'var(--portal-green)', textShadow: '0 0 20px var(--portal-green)' }}>
                    ¡Bienvenido, {user}!
                </h1>
                <p className="lead text-light">Explora el multiverso de Rick & Morty</p>
            </header>

            <section className="controls-section glass-effect p-4 rounded-4 mb-5">
                <Filters setCurrentPage={setCurrentPage} />
            </section>

            <section className="pagination-top d-flex justify-content-center mb-4">
                <Paginado 
                    cardsPerPage={cardsPerPage} 
                    allCards={characters.length} 
                    paginado={paginado} 
                    currentPage={currentPage} 
                />
            </section>

            {isLoading ? (
                <Loading />
            ) : (
                <section className="characters-grid">
                    <div className="row g-4">
                        {currentCards.length > 0 ? (
                            currentCards.map(({ id, name, gender, image, species }) => {
                                const isFav = favorites.includes(id) || favorites.some(fav => Number(fav) === Number(id));
                                return <Card 
                                    key={id}
                                    id={id}
                                    name={name}
                                    gender={gender}
                                    image={image}
                                    species={species}
                                    isFav={isFav}
                                />
                            })
                        ) : null}
                        
                        {isLastPage && hasMoreInApi && <LoadMoreCard />}

                        {currentCards.length === 0 && !hasMoreInApi && (
                            <div className="col-12 text-center py-5 glass-effect rounded-4">
                                <h3 className="text-warning orbitron mb-0">No se encontraron personajes.</h3>
                                <p className="text-light opacity-50 mt-2">Prueba ajustando los filtros o el texto de búsqueda.</p>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </div>
    )
}

export default Home;
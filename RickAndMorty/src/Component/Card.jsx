import React from "react";
import heartsolid from '../../image/heartsolid.svg';
import heart from '../../image/heart.svg';
import trash from '../../image/trash.svg';
import { delCharAction, addMyFavoriteAction, delFavAction } from "../../redux/cardSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Card = ({ id, name, gender, image, species, isFav }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.cardsReducer.user);

    const onClose = (e) => {
        e.preventDefault();
        dispatch(delCharAction(id));
    };

    const handleFav = (e) => {
        e.preventDefault();
        if (isFav) {
            dispatch(delFavAction(user, id))
        } else {
            dispatch(addMyFavoriteAction(user, id))
        }
    }

    return (
        <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
            <div className="card m-3 glass-effect" style={{ width: '18rem' }}>
                <div className="card-controls">
                    <button 
                        onClick={handleFav} 
                        className="favButton" 
                        aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                        title={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
                    >
                        <img src={isFav ? heartsolid : heart} alt="" aria-hidden="true" width="20" height="20" />
                    </button>
                    {!isFav && (
                        <button 
                            onClick={onClose} 
                            className="closeButton" 
                            aria-label="Remove character"
                            title="Eliminar personaje"
                        >
                            <img src={trash} alt="" aria-hidden="true" width="20" height="20" />
                        </button>
                    )}
                </div>
                <img src={image} alt={`Character: ${name}`} className="card-img-top" />
                <div className="card-body text-center">
                    <NavLink to={`/detail/${id}`} className="text-decoration-none">
                        <h2 className="card-title h4">{name}</h2>
                    </NavLink>
                    <div className="card-text-container mt-2">
                        <p className="card-text mb-1"><strong>Gender:</strong> {gender}</p>
                        <p className="card-text"><strong>Species:</strong> {species}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;
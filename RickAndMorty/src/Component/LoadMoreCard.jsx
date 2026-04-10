import React from 'react';
import { useDispatch } from 'react-redux';
import { syncMoreAction } from '../../redux/cardSlice';

/**
 * LoadMoreCard: A special card that appears at the end of the character list
 * to trigger syncing of additional characters from the API.
 */
const LoadMoreCard = () => {
    const dispatch = useDispatch();

    const handleLoadMore = () => {
        dispatch(syncMoreAction());
    };

    return (
        <div className="col-12 col-sm-6 col-md-4 mb-4">
            <div 
                className="card load-more-card h-100 d-flex align-items-center justify-content-center"
                onClick={handleLoadMore}
                style={{ cursor: 'pointer', minHeight: '300px', borderStyle: 'dashed' }}
            >
                <div className="text-center p-4">
                    <div className="portal-mini-loader mb-3"></div>
                    <h3 className="orbitron text-portal-green">Cargar Más</h3>
                    <p className="text-light opacity-75">Sincronizar 5 páginas adicionales del multiverso</p>
                    <div className="btn btn-outline-success mt-2">
                        <i className="fas fa-plus-circle me-2"></i> Invocar
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadMoreCard;

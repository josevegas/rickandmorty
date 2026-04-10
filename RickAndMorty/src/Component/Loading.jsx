import React from 'react';

/**
 * Loading Component: Displays a themed portal animation 
 * while data is being fetched from the backend.
 */
const Loading = () => {
    return (
        <div className="loading-container">
            <div className="portal-loader">
                <div className="portal-inner"></div>
                <div className="portal-text">Sincronizando Multiverso...</div>
            </div>
            <div className="loading-info">
                <p>Estamos trayendo todos los personajes para una mejor experiencia.</p>
                <div className="progress-mini">
                    <div className="progress-bar-infinite"></div>
                </div>
            </div>
        </div>
    );
};

export default Loading;

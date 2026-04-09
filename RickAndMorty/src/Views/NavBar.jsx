import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ logout }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark glass-effect fixed-top">
            <div className="container-fluid">
                <NavLink to="/home" className="navbar-brand orbitron" style={{ color: 'var(--portal-green)', fontWeight: '700' }}>
                    R&M MULTIVERSE
                </NavLink>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/home" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/favorite" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Favoritos</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Sobre mí</NavLink>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center">
                        <button 
                            className="btn btn-outline-danger btn-sm orbitron" 
                            onClick={logout}
                            aria-label="Cerrar sesión"
                            style={{ fontSize: '0.7rem' }}
                        >
                            SALIR
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default NavBar;

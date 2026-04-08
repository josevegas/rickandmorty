import React, { useState } from "react";
import Validation from "../Component/Validation.js";

const Form = (props) => {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState({
        email: '',
        password: '',
    });
    const [isSubmit, setIsSubmit] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIsSubmit(false);
        const newData = { ...userData, [name]: value };
        setUserData(newData);
        setError(Validation(newData));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
        if (!error.email && !error.password && userData.email && userData.password) {
            if (isSignUp) {
                props.sign(userData)
            } else {
                props.login(userData)
            }
        } else {
            setError(Validation(userData));
        }
    }

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
        setIsSubmit(false);
        setError({ email: '', password: '' });
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="card glass-effect p-4 p-md-5 rounded-4 shadow-lg w-100" style={{ maxWidth: '450px' }}>
                <div className="text-center mb-4">
                    <h1 className="orbitron title-neon h2 mb-3">
                        {isSignUp ? 'CREAR CUENTA' : 'MULTIVERSO LOGIN'}
                    </h1>
                    <p className="text-light opacity-75">
                        {isSignUp ? 'Únete a la aventura interdimensional' : 'Ingresa tus credenciales'}
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="form-label orbitron" style={{ fontSize: '0.8rem', color: 'var(--portal-green)' }}>
                            Email / Usuario
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={userData.email}
                            onChange={handleChange}
                            className={`form-control glass-effect text-white border-secondary ${error.email && isSubmit ? 'is-invalid' : ''}`}
                            placeholder="rick@c137.com"
                            required
                        />
                        {error.email && isSubmit && (
                            <div className="invalid-feedback" style={{ color: 'var(--morty-shirt)' }}>
                                {error.email}
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="form-label orbitron" style={{ fontSize: '0.8rem', color: 'var(--portal-green)' }}>
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={userData.password}
                            onChange={handleChange}
                            className={`form-control glass-effect text-white border-secondary ${error.password && isSubmit ? 'is-invalid' : ''}`}
                            placeholder="••••••••"
                            required
                        />
                        {error.password && isSubmit && (
                            <div className="invalid-feedback" style={{ color: 'var(--morty-shirt)' }}>
                                {error.password}
                            </div>
                        )}
                    </div>

                    <div className="d-grid gap-3 mt-5">
                        <button type="submit" className="btn btn-primary orbitron py-2">
                            {isSignUp ? 'REGISTRARME' : 'ENTRAR'}
                        </button>
                        <button 
                            type="button" 
                            onClick={toggleMode} 
                            className="btn btn-link text-decoration-none text-info orbitron"
                            style={{ fontSize: '0.75rem' }}
                        >
                            {isSignUp ? '¿Ya tienes cuenta? Ingresar' : '¿No tienes cuenta? Registrarse'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form;
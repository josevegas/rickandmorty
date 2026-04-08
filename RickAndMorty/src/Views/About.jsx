import React from "react";

const About = () => {
    return (
        <div className="container py-5 text-center">
            <div className="glass-effect p-5 rounded-4 animate-fade-in">
                <h1 className="orbitron title-neon mb-4">Sobre esta Aplicación</h1>
                <div className="row align-items-center mt-5">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <img 
                            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3ZleHpsZXgxYnI5ZXN4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4Znd4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/l41lI4bYusHOqzBZA/giphy.gif" 
                            alt="Rick and Morty" 
                            className="img-fluid rounded-4 shadow-lg border-success border"
                            style={{ maxWidth: '400px' }}
                        />
                    </div>
                    <div className="col-lg-6 text-start">
                        <h2 className="h4 orbitron text-info mb-3">Tecnologías Utilizadas</h2>
                        <ul className="list-unstyled lead text-light">
                            <li>🌌 <strong>React</strong> para la interfaz de usuario</li>
                            <li>📦 <strong>Redux Toolkit</strong> para el manejo del estado</li>
                            <li>🚀 <strong>Vite</strong> como herramienta de construcción</li>
                            <li>🛠️ <strong>Express & Sequelize</strong> en el Backend</li>
                            <li>💅 <strong>Bootstrap 5 & Custom CSS</strong> para el diseño</li>
                        </ul>
                        <p className="mt-4 text-light opacity-75">
                            Esta aplicación fue desarrollada como un proyecto de ingeniería de software para demostrar 
                            la integración de APIs, manejo de estados complejos y diseño responsivo premium.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;
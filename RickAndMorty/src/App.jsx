import React, { useEffect, useState, useCallback } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import api from "./services/api";
import Home from './Views/Home.jsx';
import NavBar from './Views/NavBar.jsx';
import About from "./Views/About.jsx";
import Detail from "./Views/Detail.jsx";
import Favorite from "./Views/Favorite.jsx";
import Form from "./Views/Form.jsx";
import { getLoginAction, getCharAction, getFavAction, closeAction } from "../redux/cardSlice.js";

const App = () => {
    const [access, setAccess] = useState(false);
    // sessionChecked evita que la protección de rutas corra ANTES de que
    // el efecto de restauración de sesión haya terminado (race condition).
    const [sessionChecked, setSessionChecked] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const characters = useSelector(state => state.cardsReducer.allCards);

    // ── SEGURIDAD: Restaurar sesión persistida al cargar ──────────────────
    useEffect(() => {
        const raw = localStorage.getItem('rm_session');
        if (raw) {
            try {
                const session = JSON.parse(raw);
                const now = Date.now();
                // Expiración: 30 días desde el último login
                const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
                if (session.email && session.expiresAt && now < session.expiresAt) {
                    setAccess(true);
                    // Re-hidratar el store de Redux con el email
                    dispatch({ type: 'cards/getLoginCase', payload: { email: session.email, isLogin: true } });
                    // Pedir los favoritos
                    dispatch(getFavAction(session.email));
                    if (location.pathname === '/') navigate('/home');
                } else {
                    // Sesión expirada → limpiar y redirigir
                    localStorage.removeItem('rm_session');
                }
            } catch {
                localStorage.removeItem('rm_session');
            }
        }
        setSessionChecked(true); // verificación completada
    }, [dispatch, navigate]);

    // ── SEGURIDAD: Protección de rutas (espera a que la sesión esté verificada) ─
    useEffect(() => {
        if (sessionChecked && !access && location.pathname !== '/') {
            navigate('/');
        }
    }, [sessionChecked, access, navigate, location.pathname]);



    const login = async (userData) => {
        const { email, password } = userData;
        try {
            const isLogin = await dispatch(getLoginAction(email, password));
            if (isLogin) {
                setAccess(true);
                // Guardamos email + timestamp de expiración (30 días).
                // NOTA: No almacenamos la contraseña. Solo identificador + tiempo.
                const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
                localStorage.setItem('rm_session', JSON.stringify({
                    email,
                    expiresAt: Date.now() + THIRTY_DAYS,
                }));
                dispatch(getFavAction(email));
                navigate('/home');
            } else {
                window.alert('Credenciales inválidas');
            }
        } catch (error) {
            console.error(error);
            window.alert('Error en el inicio de sesión');
        }
    };

    const logout = useCallback(() => {
        setAccess(false);
        localStorage.removeItem('rm_session');
        dispatch(closeAction());
        navigate('/');
    }, [dispatch, navigate]);

    const sign = async (userData) => {
        const { email, password } = userData;
        try {
            const { data } = await api.post('/user/signup', { email, password });
            // Si el registro fue exitoso (data tiene id), logueamos al usuario
            if (data.id) {
                setAccess(true);
                login(userData);
            }
        } catch (error) {
            console.error(error);
            const errorMsg = error.response?.data?.error || 'Error en el registro';
            window.alert(errorMsg);
        }
    };

    return (
        <div className="app-container">
            {access && location.pathname !== "/" && (
                <NavBar logout={logout} />
            )}
            <main className="container py-4">
                <Routes>
                    <Route path="/" element={<Form login={login} sign={sign} />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/detail/:id" element={<Detail characters={characters} />} />
                    <Route path="/favorite" element={<Favorite />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;

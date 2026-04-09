import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    discardFilterAction, 
    filterGenderAction, 
    filterStatusAction, 
    orderCharAction, 
    setSearchNameAction 
} from "../../redux/cardSlice";

/**
 * Component for filtering and ordering characters.
 * @param {Object} props - Component props.
 * @param {Function} props.setCurrentPage - Function to reset the current page when a filter is applied.
 * @returns {JSX.Element}
 */
const Filters = ({ setCurrentPage }) => {
    const dispatch = useDispatch();
    
    // ── SINCRONIZACIÓN CON REDUX ──────────────────────────────────────────
    // Obtenemos los valores actuales del store para que persistan al volver de Detalle
    const reduxFilters = useSelector(state => state.cardsReducer.filters);
    const reduxOrder = useSelector(state => state.cardsReducer.order);

    const [filter, setFilter] = useState({
        name: reduxFilters.name,
        gender: reduxFilters.gender,
        status: reduxFilters.status,
        order: reduxOrder,
    })

    // ── LÓGICA DE BÚSQUEDA CON DEBOUNCE ──────────────────────────────────
    useEffect(() => {
        // Solo disparamos si el valor local es diferente al de Redux para evitar loops
        if (filter.name !== reduxFilters.name) {
            const timer = setTimeout(() => {
                dispatch(setSearchNameAction(filter.name));
                setCurrentPage(1);
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [filter.name, dispatch, setCurrentPage, reduxFilters.name]);

    const handleSearch = (e) => {
        setFilter(prev => ({ ...prev, name: e.target.value }));
    }

    const handleFilterGender = (e) => {
        const value = e.target.value;
        dispatch(filterGenderAction(value));
        setCurrentPage(1);
        setFilter(prev => ({ ...prev, gender: value }));
    }

    const handleFilterStatus = (e) => {
        const value = e.target.value;
        dispatch(filterStatusAction(value));
        setCurrentPage(1);
        setFilter(prev => ({ ...prev, status: value }));
    }

    const handleOrder = (e) => {
        const value = e.target.value;
        dispatch(orderCharAction(value));
        setCurrentPage(1);
        setFilter(prev => ({ ...prev, order: value }));
    }

    const resetFilters = (e) => {
        e.preventDefault();
        dispatch(discardFilterAction());
        setCurrentPage(1);
        setFilter({
            name: '',
            gender: 'all',
            status: 'all',
            order: 'all',
        })
    }

    return (
        <div className="row g-3 align-items-center">
            <div className="col-12 col-md-auto">
                <h3 className="orbitron h6 text-info mb-0">FILTROS:</h3>
            </div>
            
            <div className="col-12 col-md-3">
                <input 
                    type="text" 
                    className="form-control glass-effect text-white border-info" 
                    placeholder="Buscar por nombre..." 
                    aria-label="Buscar por nombre"
                    value={filter.name}
                    onChange={handleSearch}
                />
            </div>

            <div className="col-12 col-sm-6 col-md-2">
                <select className="form-select glass-effect text-white border-success" value={filter.gender} onChange={handleFilterGender}>
                    <option value='all'>Todos los Géneros</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Genderless'>Genderless</option>
                    <option value='unknown'>Unknown</option>
                </select>
            </div>
            
            <div className="col-12 col-sm-6 col-md-2">
                <select className="form-select glass-effect text-white border-success" value={filter.status} onChange={handleFilterStatus}>
                    <option value='all'>Todos los Status</option>
                    <option value='Alive'>Alive</option>
                    <option value='Dead'>Dead</option>
                    <option value='unknown'>Unknown</option>
                </select>
            </div>
            
            <div className="col-12 col-sm-6 col-md-2">
                <select className="form-select glass-effect text-white border-success" value={filter.order} onChange={handleOrder}>
                    <option value='all'>Sin Ordenar</option>
                    <option value='asc'>Nombre: A - Z</option>
                    <option value='des'>Nombre: Z - A</option>
                </select>
            </div>
            
            <div className="col-12 col-md-auto ms-lg-auto">
                <button
                    className="btn btn-outline-warning w-100 orbitron btn-sm px-4"
                    onClick={resetFilters}
                    style={{ fontSize: '0.75rem' }}
                >
                    LIMPIAR
                </button>
            </div>
        </div>
    )
}

export default Filters;

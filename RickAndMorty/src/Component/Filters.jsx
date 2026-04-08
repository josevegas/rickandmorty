import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { discardFilterAction, filterGenderAction, filterStatusAction, orderCharAction } from "../../redux/cardSlice";

/**
 * Component for filtering and ordering characters.
 * @param {Object} props - Component props.
 * @param {Function} props.setCurrentPage - Function to reset the current page when a filter is applied.
 * @returns {JSX.Element}
 */
const Filters = ({ setCurrentPage }) => {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState({
        gender: 'all',
        status: 'all',
        order: 'all',
    })

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
            gender: 'all',
            status: 'all',
            order: 'all',
        })
    }

    return (
        <div className="row g-3 align-items-center">
            <div className="col-12 col-md-auto">
                <h3 className="orbitron h6 text-info mb-0">Filtros:</h3>
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
                    <option value='Unknown'>Unknown</option>
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
                    LIMPIAR FILTROS
                </button>
            </div>
        </div>
    )
}

export default Filters;

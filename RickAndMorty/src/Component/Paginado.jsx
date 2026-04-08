import React from "react";

/**
 * Modern Smart Pagination component for extremely large character lists.
 * Shows Prev/Next buttons, first/last pages, and a truncated range of neighboring pages.
 */
const Paginado = ({ cardsPerPage, allCards, paginado, currentPage }) => {
    const totalPages = Math.ceil(allCards / cardsPerPage);

    if (totalPages <= 1) return null;

    const navigate = (page) => {
        if (page >= 1 && page <= totalPages) {
            paginado(page);
        }
    };

    const getVisiblePages = () => {
        let pages = [];
        // Max number of explicit inner pages to show at once
        const innerBound = 2; 

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 || 
                i === totalPages || 
                (i >= currentPage - innerBound && i <= currentPage + innerBound)
            ) {
                pages.push(i);
            }
        }

        // Add ellipses for jumps
        let elidedPages = [];
        let l;
        for (let i of pages) {
            if (l) {
                if (i - l === 2) {
                    elidedPages.push(l + 1); // Only 1 gap, just show the number
                } else if (i - l !== 1) {
                    elidedPages.push("..."); // Multi gap, show ellipsis
                }
            }
            elidedPages.push(i);
            l = i;
        }

        return elidedPages;
    };

    return (
        <nav aria-label="Navegación espacial de personajes" className="mt-2 mb-4 d-flex justify-content-center">
            <ul className="pagination pagination-md gap-2 flex-wrap justify-content-center m-0 border-0 align-items-center">
                
                {/* Previous Button */}
                <li className={`page-item ${currentPage === 1 ? 'disabled opacity-50' : ''}`}>
                    <button 
                        onClick={() => navigate(currentPage - 1)} 
                        className="page-link glass-effect text-success rounded-5 border-success fw-bold px-3 shadow-sm"
                        style={{ background: 'transparent' }}
                        disabled={currentPage === 1}
                    >
                        &laquo;
                    </button>
                </li>

                {/* Numbered y Elipsis Buttons */}
                {getVisiblePages().map((page, index) => {
                    if (page === "...") {
                        return (
                            <li key={`ellipsis-${index}`} className="page-item disabled">
                                <span className="page-link bg-transparent border-0 text-light fw-bold">...</span>
                            </li>
                        );
                    }
                    
                    const isActive = page === currentPage;
                    return (
                        <li key={page} className={`page-item ${isActive ? 'active' : ''}`}>
                            <button 
                                onClick={() => navigate(page)} 
                                className={`page-link rounded-5 fw-bold ${isActive ? 'border-success text-dark' : 'glass-effect text-success border-success opacity-75'}`}
                                style={{ 
                                    backgroundColor: isActive ? 'var(--portal-green)' : 'transparent',
                                    boxShadow: isActive ? '0 0 10px var(--portal-green)' : 'none',
                                    transition: 'all 0.2s',
                                    minWidth: '40px'
                                }}
                            >
                                {page}
                            </button>
                        </li>
                    );
                })}

                {/* Next Button */}
                <li className={`page-item ${currentPage === totalPages ? 'disabled opacity-50' : ''}`}>
                    <button 
                        onClick={() => navigate(currentPage + 1)} 
                        className="page-link glass-effect text-success rounded-5 border-success fw-bold px-3 shadow-sm"
                        style={{ background: 'transparent' }}
                        disabled={currentPage === totalPages}
                    >
                        &raquo;
                    </button>
                </li>
                
            </ul>
        </nav>
    );
}

export default Paginado;
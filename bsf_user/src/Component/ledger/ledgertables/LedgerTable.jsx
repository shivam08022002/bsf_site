// src/DynamicTable.js
import {React, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/LedgerTable.css';
// import '../css/AgentTablePagination.css';

const LedgerTable = ({ columns, data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = data.slice(startIndex, startIndex + itemsPerPage);

    // Generate pagination buttons
    const pageNumbers = [];
    const visiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    if (endPage - startPage + 1 < visiblePages) {
        startPage = Math.max(1, endPage - visiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    let navigate = useNavigate();
    const openLiveReport = (e, id, title) => {
        e.preventDefault();
        navigate(`/matchscreen/${sport}/${id}/${title}`);
        // navigate(`/livematchscreen/${sport}/${id}/${title}`);
    };

    return (
        <div className="ledger-table-root ledger-table">
            <table className="ledger-table-custom">
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} title={column}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentData.length > 0 ? (
                        currentData.map((row, rowIndex) => (
                            <tr key={rowIndex} className="ledger-table-row">
                                <td className="ledger-table-custom-td">
                                    {row.matchId}
                                </td>
                                <td className="ledger-table-custom-td-matchname">
                                    <Link to={`/ledgermatch/${row.matchId}`} className="ledger-table-custom-td-link">
                                        {isMobile && row.matchName.length > 15 
                                            ? row.matchName.substring(0, 15) + '...' 
                                            : row.matchName}
                                    </Link>
                                </td>
                                <td className="ledger-table-custom-td-profit-loss-balance">
                                    {row.loss.toFixed(2)}
                                </td>
                                <td className="ledger-table-custom-td-profit-loss-balance">
                                    {row.profit.toFixed(2)}
                                </td>
                                <td className="ledger-table-custom-td-profit-loss-balance">
                                    {row.balance.toFixed(1)}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} style={{textAlign: 'center', padding: '10px'}}>
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {/* {currentData && <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="agent-table-pagination-prev-button"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {startPage > 1 && <span className="pagination-ellipsis">...</span>}
                {pageNumbers.map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`ledger-table-pagination-button ${currentPage === page ? 'active' : ''}`}
                    >
                        {page}
                    </button>
                ))}
                {endPage < totalPages && <span className="pagination-ellipsis">...</span>}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="agent-table-pagination-next-button"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>} */}
        </div>
    );
};

export default LedgerTable;

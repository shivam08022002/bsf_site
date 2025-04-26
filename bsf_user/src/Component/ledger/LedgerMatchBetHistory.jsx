import React, { useState } from 'react';
import './css/LedgerMatchBetHistorySessionOdds.css';
import LedgerMatchBetHistorySessionOddsTable from './ledgertables/LedgerMatchBetHistorySessionOddsTable';

const LedgerMatchBetHistory = ({ betHistoryTitle, betHistory, isFancy }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleHeaderClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="ledger-match-bet-history-session-odds">
            <div className="ledger-match-bet-history-session-odds-header" onClick={handleHeaderClick}>
                <div className="ledger-match-bet-history-session-odds-title">
                    <label>{betHistoryTitle}</label>
                </div>
                <div className="ledger-match-bet-history-session-odds-plus">
                    <button className="ledger-match-expand-button">
                        {isExpanded ? '-' : '+'}
                    </button>
                </div>
            </div>
            {isExpanded && (
                <LedgerMatchBetHistorySessionOddsTable betHistory={betHistory} isFancy={isFancy} />
            )}
        </div>
    );
};

export default LedgerMatchBetHistory;

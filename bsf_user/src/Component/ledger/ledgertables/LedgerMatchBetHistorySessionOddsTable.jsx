import React, { useState } from 'react';
import '../css/LedgerMatchBetHistorySessionOddsTable.css';
import {
    KHAI,
    LAGAI
} from '../../../common/constants';

const LedgerMatchBetHistorySessionOddsTable = ({ betHistory, isFancy }) => {

    return (
        <div className="ledger-match-bet-history-session-odds-table-root">
            <div>
                <table className="ledger-match-bet-history-session-odds-table" cellpadding="0" cellspacing="0" border="0">
                    <thead>
                        <tr>
                            {/* <th>Date / Time</th> */}
                            <th className="ledger-match-bet-history-session-odds-table-th-big">Bet</th>
                            {isFancy && <th className="ledger-match-bet-history-session-odds-table-th-small">Run</th>}
                            <th className="ledger-match-bet-history-session-odds-table-th-small">Type</th>
                            <th className="ledger-match-bet-history-session-odds-table-th-small">Rate</th>
                            <th className="ledger-match-bet-history-session-odds-table-th-small">Amount</th>
                            <th className="ledger-match-bet-history-session-odds-table-th-small">Profit</th>
                            <th className="ledger-match-bet-history-session-odds-table-th-small">Loss</th>
                            <th className="ledger-match-bet-history-session-odds-table-th-small">Status</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div>
                <table className="ledger-match-bet-history-session-odds-table" cellpadding="0" cellspacing="0" border="0">
                    <tbody>
                        {betHistory && betHistory.map((bet, index) => (

                            <tr>
                                {/* <td>{bet.betDate}</td> */}
                                <td className="ledger-match-bet-history-session-odds-table-td-big">{bet.marketName}</td>
                                {isFancy && <td className="ledger-match-bet-history-session-odds-table-td-small">{bet.sessionValue}</td>}
                                {isFancy && <td className="ledger-match-bet-history-session-odds-table-td-small">{bet.candidate[0].toUpperCase() + bet.candidate.slice(1)}</td>}
                                {!isFancy && bet.candidate === "lay" && <td className="ledger-match-bet-history-session-odds-table-td-small">{KHAI}</td>}
                                {!isFancy && bet.candidate === "back" && <td className="ledger-match-bet-history-session-odds-table-td-small">{LAGAI}</td>}
                                <td className="ledger-match-bet-history-session-odds-table-td-small">{bet.rate}</td>
                                <td className="ledger-match-bet-history-session-odds-table-td-small">{bet.amount}</td>
                                <td className="ledger-match-bet-history-session-odds-table-td-small">{bet.profit}</td>
                                <td className="ledger-match-bet-history-session-odds-table-td-small">{bet.loss}</td>
                                <td className="ledger-match-bet-history-session-odds-table-td-small">{bet.betStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LedgerMatchBetHistorySessionOddsTable;
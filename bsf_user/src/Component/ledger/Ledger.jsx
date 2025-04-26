import { useState, useEffect } from "react";
import { httpHelpers } from "../../services/httpHelpers";
import { useNavigate, useLocation } from 'react-router-dom';
import LedgerTable from "./ledgertables/LedgerTable";
import './css/Ledger.css';
import LedgerDetails from "./LedgerDetails";

export default function Ledger({ role, logout, userId }) {

    let getStatement = "gamma/getUserLedger?&offset=0&limit=100";
    const clientLedger = ["DATE", "ENTRY", "DEBIT", "CREDIT", "BAL..."];
    const api = httpHelpers();
    const [statement, setStatement] = useState([]);
    let navigate = useNavigate();

    const fetchStatement = (startDate, endDate) => {
        api
            .get(`${getStatement}`)
            .then(res => {
                console.log("statement res", res);
                if (res && res.data && res.data.length > 0) {
                    setStatement(res.data);
                } else {
                    setStatement([]);
                }
            })

            .catch(err => {
                console.log("error error", err);
                if (err) {
                    if (err.data) {
                        if (err.data.status && err.data.status === 401) {
                            logout();
                        }
                    } else if (err.response) {
                        if (err.response.status && err.response.status === 401) {
                            logout();
                        }
                    }
                }
            });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchStatement();
    }, []);

    return (
        <div>
            {/* <div className="ledger-details-root">
                <LedgerDetails
                    text={"Match Toss Bets"}
                    width="90%"
                    marginLeft="auto"
                    marginRight="auto" />

                <LedgerDetails
                    text={"Match Plus Minus"}
                    width="86%"
                    marginLeft="auto"
                    marginRight="auto"
                    bgColor="#49494a" />
            </div> */}
            <div className="entity-ledger-root">
                {statement && <LedgerTable columns={clientLedger} data={statement} />}
            </div>
        </div>
    );
};

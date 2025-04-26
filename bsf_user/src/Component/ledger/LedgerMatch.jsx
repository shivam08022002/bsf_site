import { useState, useEffect } from "react";
import { httpHelpers } from "../../services/httpHelpers";
import { useNavigate, useParams } from 'react-router-dom';
import './css/Ledger.css';
import LedgerDetails from "./LedgerDetails";
import LedgerMatchBetHistory from "./LedgerMatchBetHistory";

export default function LedgerMatch({ role, logout }) {

    const { matchId } = useParams();
    let getLedgerMatch = "gamma/getUserMatchSummary?offset=0&limit=10&matchId=" + matchId;
    const clientLedger = ["DATE", "ENTRY", "DEBIT", "CREDIT", "BALANCE"];
    const api = httpHelpers();
    const [ledgerMatch, setLedgerMatch] = useState();
    const [bookmakerProfitLoss, setBookmakerProfitLoss] = useState();
    const [commission, setCommission] = useState();
    const [finalBalance, setFinalBalance] = useState();
    const [matchName, setMatchName] = useState();
    const [matchOddsProfitLoss, setMatchOddsProfitLoss] = useState();
    const [matchProfitLoss, setMatchProfitLoss] = useState();
    const [sessionProfitLoss, setSessionProfitLoss] = useState();
    const [share, setShare] = useState();
    const [tossOddsProfitLoss, setTossOddsProfitLoss] = useState();
    const [totalProfitLoss, setTotalProfitLoss] = useState();
    const [userBets, setUserBets] = useState();
    const [matchOddsBets, setMatchOddsBets] = useState();
    const [bookmakerBets, setBookmakerBets] = useState();
    const [fancyBets, setFancyBets] = useState();
    const [tossOddsBets, setTossOddsBets] = useState();
    let navigate = useNavigate();

    const fetchLedgerMatch = () => {
        api
            .get(`${getLedgerMatch}`)
            .then(res => {
                console.log("ledger match res", res);
                if (res && res.data) {
                    setLedgerMatch(res.data);
                    if (res.data.bookmakerProfitLoss) {
                        setBookmakerProfitLoss(res.data.bookmakerProfitLoss);
                    }
                    if (res.data.commission) {
                        setCommission(res.data.commission);
                    }
                    if (res.data.finalBalance) {
                        setFinalBalance(res.data.finalBalance);
                    }
                    if (res.data.matchName) {
                        setMatchName(res.data.matchName);
                    }
                    if (res.data.matchOddsProfitLoss) {
                        setMatchOddsProfitLoss(res.data.matchOddsProfitLoss);
                    }
                    if (res.data.matchProfitLoss) {
                        setMatchProfitLoss(res.data.matchProfitLoss);
                    }
                    if (res.data.sessionProfitLoss) {
                        setSessionProfitLoss(res.data.sessionProfitLoss);
                    }
                    if (res.data.share) {
                        setShare(res.data.share);
                    }
                    if (res.data.tossOddsProfitLoss) {
                        setShare(res.data.share);
                    }
                    if (res.data.tossOddsProfitLoss) {
                        setTossOddsProfitLoss(res.data.tossOddsProfitLoss);
                    }
                    if (res.data.totalProfitLoss) {
                        setTotalProfitLoss(res.data.totalProfitLoss);
                    }
                    if (res.data.userBets) {
                        if (res.data.userBets.matchodds) {
                            setMatchOddsBets(res.data.userBets.matchodds);
                        }
                        if (res.data.userBets.bookmaker) {
                            setBookmakerBets(res.data.userBets.bookmaker);
                        }
                        if (res.data.userBets.session) {
                            setFancyBets(res.data.userBets.session);
                        }
                        if (res.data.userBets.tossodds) {
                            setTossOddsBets(res.data.userBets.tossodds);
                        }
                    }
                } else {
                    setLedgerMatch(null);
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
        // window.scrollTo(0, 0);
        fetchLedgerMatch();
    }, []);

    return (
        <div>
            {ledgerMatch && <div className="ledger-details-root">
                <LedgerDetails
                    text={"Match Toss Bets"}
                    width="90%"
                    marginLeft="auto"
                    marginRight="auto"
                    coins={ledgerMatch.tossOddsProfitLoss} />
                {tossOddsBets && <div>
                    <LedgerMatchBetHistory betHistoryTitle={"Toss Odds History"} betHistory={tossOddsBets} />
                </div>}

                <LedgerDetails
                    text={"Match Winner Market Bets"}
                    width="90%"
                    marginLeft="auto"
                    marginRight="auto"
                    coins={ledgerMatch.matchOddsProfitLoss} />
                {matchOddsBets && <div>
                    <LedgerMatchBetHistory betHistoryTitle={"Match Odds History"} betHistory={matchOddsBets} />
                </div>}

                <LedgerDetails
                    text={"Match Winner Bookmaker Bets"}
                    width="90%"
                    marginLeft="auto"
                    marginRight="auto"
                    coins={ledgerMatch.bookmakerProfitLoss} />
                {bookmakerBets && <div>
                    <LedgerMatchBetHistory betHistoryTitle={"Bookmaker History"} betHistory={bookmakerBets} />
                </div>}

                <LedgerDetails
                    text={"Fancy Bets"}
                    width="90%"
                    marginLeft="auto"
                    marginRight="auto"
                    coins={ledgerMatch.sessionProfitLoss} />
                {fancyBets && <div>
                    <LedgerMatchBetHistory betHistoryTitle={"Fancy History"} betHistory={fancyBets} isFancy={true} />
                </div>}

                <LedgerDetails
                    text={"Match Plus Minus"}
                    width="86%"
                    marginLeft="auto"
                    marginRight="auto"
                    bgColor="#49494a"
                    blockMargin={true}
                    coins={ledgerMatch.matchProfitLoss} />

                <LedgerDetails
                    text={"My Commission"}
                    width="86%"
                    marginLeft="auto"
                    marginRight="auto"
                    bgColor="#49494a"
                    blockMargin={true}
                    coins={ledgerMatch.commission} />

                <LedgerDetails
                    text={"Amount After Comm. & Share"}
                    width="86%"
                    marginLeft="auto"
                    marginRight="auto"
                    bgColor="#49494a"
                    blockMargin={true}
                    coins={ledgerMatch.totalProfitLoss} />

                <LedgerDetails
                    text={"Net Plus Minus"}
                    width="86%"
                    marginLeft="auto"
                    marginRight="auto"
                    bgColor="#49494a"
                    blockMargin={true}
                    coins={ledgerMatch.totalProfitLoss} />
            </div>}
            {/* <div className="entity-ledger-root">
                {statement && <LedgerTable columns={clientLedger} data={statement} />}
            </div> */}
        </div>
    );
};

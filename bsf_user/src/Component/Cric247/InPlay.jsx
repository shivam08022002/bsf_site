import './css/InPlay.css';
import {
    CRICKET,
    FOOTBALL,
    TENNIS
} from '../../common/constants';
import MatchesCardView from './MatchesCardView';
import { useState, useEffect, useRef } from "react";
import { httpHelpers } from "../../services/httpHelpers";
import { useNavigate } from 'react-router-dom';
import { MdSportsCricket, MdSportsFootball, MdSportsSoccer, MdSportsTennis } from 'react-icons/md';

export default function InPlay({ role, logout, supportedSports, isSmallScreen }) {
    const cricket = supportedSports && supportedSports.includes(CRICKET);
    const football = supportedSports && supportedSports.includes(FOOTBALL);
    const tennis = supportedSports && supportedSports.includes(TENNIS);
    const [selectedSport, setSelectedSport] = useState(CRICKET);
    const cricketButtonRef = useRef(null);
    const tennisButtonRef = useRef(null);
    const footballButtonRef = useRef(null);
    let navigate = useNavigate();
    const getLiveGames = "/gamma/getAllMatches?sportType=";
    const [matches, setMatches] = useState(null);
    const api = httpHelpers();

    const handleMatchClick = (e, match) => {
        e.preventDefault();
        navigate(`matchscreen/${selectedSport}/${match.id}/${match.name}`);
    };

    const handleSportClick = (e, sport, buttonRef) => {
        e.preventDefault();
        setSelectedSport(sport);
        buttonRef.current.focus();
    };

    const fetchCricketMatches = async () => {
        api
            .get(`${getLiveGames}` + selectedSport + '&matchStatus=LIVE')
            .then(res => {
                console.log("live games 1", res);
                if (res && res.data && res.data.length > 0) {
                    console.log("live games 2", res.data);
                    setMatches(res.data);
                } else {
                    setMatches(null);
                }
                console.log("live games 3", matches);
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
        // try {
        //     const response = await api.customFetch("http://192.168.1.12:8080//beta/getAllMatches?sportType=");
        //     console.log("cricket res", response);

        //     if (response) {
        //         if (response.status === 200) {
        //             const data = await response.json();
        //             console.log("cricket data", data);
        //             setMatches(data);
        //         } else if (response === 401 || response.status === 401) {
        //             logout();
        //         }
        //     } else {
        //         alert(response);
        //     }
        // } catch (error) {
        //     console.error("Error fetching cricket matches:", error);
        // }
    };

    useEffect(() => {
        fetchCricketMatches();
        if (selectedSport === CRICKET)
            cricketButtonRef.current.focus();
    }, [selectedSport]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="inplay-root">
            <div className="inplay-sports-button-matches-card-container">
                <div className="inplay-sports-button-container">
                    {/* {cricket && <button className="inplay-sports-button" onClick={(e) => handleSportClick(e, CRICKET)} role="button">Cricket</button>}
                    {football && <button className="inplay-sports-button" onClick={(e) => handleSportClick(e, FOOTBALL)} role="button">Football</button>}
                    {tennis && <button className="inplay-sports-button" onClick={(e) => handleSportClick(e, TENNIS)} role="button">Tennis</button>} */}
                    <button ref={cricketButtonRef} className="inplay-sports-button" onClick={(e) => handleSportClick(e, CRICKET, cricketButtonRef)} role="button"><i className="inplay-sports-icons"><MdSportsCricket style={{ paddingTop: isSmallScreen ? "7px" : "0px" }} /></i>Cricket</button>
                    <button ref={footballButtonRef} className="inplay-sports-button" onClick={(e) => handleSportClick(e, FOOTBALL, footballButtonRef)} role="button"><i className="inplay-sports-icons"><MdSportsSoccer style={{ paddingTop: isSmallScreen ? "7px" : "0px" }} /></i>Football</button>
                    <button ref={tennisButtonRef} className="inplay-sports-button" onClick={(e) => handleSportClick(e, TENNIS, tennisButtonRef)} role="button"><i className="inplay-sports-icons"><MdSportsTennis style={{ paddingTop: isSmallScreen ? "7px" : "0px" }} /></i>Tennis</button>
                </div>
                <div className="inplay-matches-card-container">
                    {matches && matches.map((match, index) => (
                        match.matchStatus === "LIVE" && <div key={index} className="inplay-match-card-container" onClick={(e) => handleMatchClick(e, match)}><MatchesCardView id={match.id} match={match} status={match.matchStatus} isSmallScreen={isSmallScreen} /></div>
                    ))}
                    {!matches && <p style={{ color: 'red' }}>No {selectedSport.toUpperCase()} Matches!</p>}
                </div>
            </div>
        </div>
    );
};
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
import SeriesCardView from './SeriesCardView';
import { MdSportsCricket, MdSportsSoccer, MdSportsTennis } from 'react-icons/md';

export default function Tournament({ logout, isSmallScreen }) {
    const [selectedSport, setSelectedSport] = useState(CRICKET);
    const cricketButtonRef = useRef(null);
    const tennisButtonRef = useRef(null);
    const footballButtonRef = useRef(null);
    let navigate = useNavigate();
    const getAllSeries = "/gamma/getAllSeries?sportType=";
    const [allSeries, setAllSeries] = useState(null);
    const api = httpHelpers();

    const handleSeriesClick = (e, seriesId) => {
        e.preventDefault();
        navigate("/seriesmatches", { state: { seriesId } });
    };

    const handleSportClick = (e, sport, buttonRef) => {
        e.preventDefault();
        setSelectedSport(sport);
        buttonRef.current.focus();
    };

    const fetchAllSeries = async () => {
        api
            .get(`${getAllSeries}` + selectedSport)
            .then(res => {
                if (res && res.data && res.data.length > 0) {
                    setAllSeries(res.data);
                } else {
                    setAllSeries(null);
                }
            })
            .catch(err => {
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
        fetchAllSeries();
        if (selectedSport === CRICKET)
            cricketButtonRef.current.focus();
    }, [selectedSport]);

    return (
        <div className="inplay-root">
            <div className="inplay-sports-button-matches-card-container">
                <div className="inplay-sports-button-container">
                    <button ref={cricketButtonRef} className="inplay-sports-button" onClick={(e) => handleSportClick(e, CRICKET, cricketButtonRef)} role="button">
                        <i className="inplay-sports-icons"><MdSportsCricket style={{ paddingTop: isSmallScreen ? "7px" : "0px" }} /></i>
                        Cricket
                    </button>
                    <button ref={footballButtonRef} className="inplay-sports-button" onClick={(e) => handleSportClick(e, FOOTBALL, footballButtonRef)} role="button">
                        <i className="inplay-sports-icons"><MdSportsSoccer style={{ paddingTop: isSmallScreen ? "7px" : "0px" }} /></i>
                        Football
                    </button>
                    <button ref={tennisButtonRef} className="inplay-sports-button" onClick={(e) => handleSportClick(e, TENNIS, tennisButtonRef)} role="button">
                        <i className="inplay-sports-icons"><MdSportsTennis style={{ paddingTop: isSmallScreen ? "7px" : "0px" }} /></i>
                        Tennis
                    </button>
                </div>
                <div className="inplay-matches-card-container">
                    {allSeries && allSeries.length > 0 ? (
                        allSeries.map((series, index) => (
                            <div key={index} className="inplay-match-card-container" onClick={(e) => handleSeriesClick(e, series.id)}>
                                <SeriesCardView id={series.id} series={series} />
                            </div>
                        ))
                    ) : (
                        <div className="no-matches-message">
                            <p>No {selectedSport.toUpperCase()} Series Available!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
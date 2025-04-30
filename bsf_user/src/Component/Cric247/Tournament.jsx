import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './css/Tournament.css';
import {
    CRICKET,
    FOOTBALL,
    TENNIS
} from '../../common/constants';
import TournamentCardView from './TournamentCardView';
import { httpHelpers } from "../../services/httpHelpers";
import { MdSportsCricket, MdSportsSoccer, MdSportsTennis } from 'react-icons/md';

const Tournament = ({ logout }) => {
    const [selectedSport, setSelectedSport] = useState(CRICKET);
    const [isLoading, setIsLoading] = useState(false);
    const [allSeries, setAllSeries] = useState(null);
    
    const navigate = useNavigate();
    const api = httpHelpers();

    const sportTabs = [
        { id: CRICKET, label: 'Cricket', icon: <MdSportsCricket /> },
        { id: FOOTBALL, label: 'Football', icon: <MdSportsSoccer /> },
        { id: TENNIS, label: 'Tennis', icon: <MdSportsTennis /> }
    ];

    const handleSeriesClick = (seriesId) => {
        navigate("/seriesmatches", { state: { seriesId } });
    };
    
    const handleViewMoreClick = (seriesId) => {
        navigate("/seriesmatches", { state: { seriesId } });
    };

    const fetchAllSeries = async () => {
        setIsLoading(true);
        try {
            const response = await api.get(`gamma/getAllSeries?sportType=${selectedSport}`);
            if (response && response.data && response.data.length > 0) {
                // Log the first series object to see its structure
                console.log("Series data example:", response.data[0]);
                
                // Ensure every series has a sportType property
                const seriesWithSportType = response.data.map(series => ({
                    ...series,
                    sportType: series.sportType || selectedSport
                }));
                
                setAllSeries(seriesWithSportType);
            } else {
                setAllSeries(null);
            }
        } catch (err) {
            console.error("Error fetching series data:", err);
            if (err?.data?.status === 401 || err?.response?.status === 401) {
                logout();
            }
            setAllSeries(null);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchAllSeries();
    }, [selectedSport]);

    return (
        <div className="tournament-container">
            
            <div className="sport-tabs">
                {sportTabs.map((sport) => (
                    <button
                        key={sport.id}
                        className={`sport-tab ${selectedSport === sport.id ? 'active' : ''}`}
                        onClick={() => setSelectedSport(sport.id)}
                    >
                        <span className="sport-icon">{sport.icon}</span>
                        <span className="sport-label">{sport.label}</span>
                    </button>
                ))}
            </div>
            
            <div className="series-grid">
                {isLoading ? (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Loading tournaments...</p>
                    </div>
                ) : allSeries && allSeries.length > 0 ? (
                    allSeries.map((series) => (
                        <div 
                            key={series.id} 
                            className="series-item"
                            onClick={() => handleSeriesClick(series.id)}
                        >
                            <TournamentCardView 
                                series={series} 
                                match={{
                                    id: series.id,
                                    name: series.name,
                                    oddsBetCount: series.matchCount || 0,
                                    sessionBetCount: series.sessionCount || 0,
                                    matchStatus: series.status || 'Tournament'
                                }}
                                onViewMoreClick={handleViewMoreClick}
                            />
                        </div>
                    ))
                ) : (
                    <div className="no-series-message">
                        <div className="empty-state-icon">
                            {selectedSport === CRICKET ? <MdSportsCricket size={48} /> :
                             selectedSport === FOOTBALL ? <MdSportsSoccer size={48} /> :
                             <MdSportsTennis size={48} />}
                        </div>
                        <h3>No {selectedSport.charAt(0).toUpperCase() + selectedSport.slice(1)} Tournaments Available</h3>
                        <p>Check back later for upcoming tournaments</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tournament;
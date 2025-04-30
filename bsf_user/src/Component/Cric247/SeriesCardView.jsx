import React from 'react';
import { MdCalendarToday, MdSportsCricket, MdSportsSoccer, MdSportsTennis } from 'react-icons/md';
import { AiOutlineArrowRight } from 'react-icons/ai';
import './css/SeriesCardView.css';
import { 
    CRICKET, 
    FOOTBALL, 
    TENNIS 
} from '../../common/constants';

const SeriesCardView = ({ series }) => {
    // Default to cricket if no sportType is provided
    const sportType = series.sportType || CRICKET;

    const formatDate = (dateString) => {
        if (!dateString) return 'TBD';
        
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };
    
    const getCardBackground = () => {
        switch (sportType) {
            case CRICKET:
                return 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)';
            case FOOTBALL:
                return 'linear-gradient(135deg, #4568dc 0%, #b06ab3 100%)';
            case TENNIS:
                return 'linear-gradient(135deg, #ff8008 0%, #ffc837 100%)';
            default:
                return 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)';
        }
    };
    
    const getSportIcon = () => {
        switch (sportType) {
            case CRICKET:
                return <MdSportsCricket className="series-sport-icon cricket" />;
            case FOOTBALL:
                return <MdSportsSoccer className="series-sport-icon football" />;
            case TENNIS:
                return <MdSportsTennis className="series-sport-icon tennis" />;
            default:
                return <MdSportsCricket className="series-sport-icon cricket" />;
        }
    };
    
    const startDate = formatDate(series.startDate);
    const endDate = formatDate(series.endDate);
    
    return (
        <div 
            className="series-card" 
            style={{ background: getCardBackground() }}
        >
            <div className="series-card-content">
                <div className="series-header">
                    {getSportIcon()}
                    <h3 className="series-name">{series.name || 'Unknown Series'}</h3>
                </div>
                
                <div className="series-dates">
                    <div className="date-container">
                        <MdCalendarToday className="calendar-icon" />
                        <div className="date-info">
                            <span className="date-label">Start:</span>
                            <span className="date-value">{startDate}</span>
                        </div>
                    </div>
                    <AiOutlineArrowRight className="date-arrow" />
                    <div className="date-container">
                        <MdCalendarToday className="calendar-icon" />
                        <div className="date-info">
                            <span className="date-label">End:</span>
                            <span className="date-value">{endDate}</span>
                        </div>
                    </div>
                </div>
                
                <button className="view-matches-btn">
                    View Matches
                </button>
            </div>
        </div>
    );
};

export default SeriesCardView;

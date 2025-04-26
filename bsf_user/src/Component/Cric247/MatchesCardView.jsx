import * as React from 'react';
import Chip from '@mui/joy/Chip';
import './css/InPlay.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import imageCard from '../../assets/imageCard.png';
const CardContainer = styled(Box)(({ theme, isSmallScreen }) => ({
    backgroundColor: '#fff',
    color: '#3a61a2',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    width: '100%', // Allows it to resize correctly
    borderRadius: '10px 10px 10px 10px',
}));

export default function MatchesCardView({ match, isSmallScreen }) {
    return (
        <div className="match-card-root">
            <CardContainer isSmallScreen={isSmallScreen}>
                <div className="match-card-header-container">
                    <label style={{ cursor: "pointer"}}>{match && match.openDate}</label>
                </div>
            <div style={{display:"flex",flexDirection:"row",}}>
                <div className='card-icon' style={{display:"flex", alignItems:"center",alignSelf:"center", padding:"10px", borderRight:"1px solid #3a61a2"}}>
                        <img style={{borderRadius:"15px",height:"80px",width:"auto"}} src={imageCard} alt='Card Icon' />
                        </div>
                <div className="match-card-body-container" >
                    <div className="match-card-match-name-container" >
                       
                        <label className="match-card-match-name-label">{match.name}</label>
                    </div>
                    <div>
                        <label className="match-card-match-info-label"></label>
                    </div>
                    <div className="match-card-match-bets-container">
                        <label className="match-card-match-bets-label">Match Bets : {match.oddsBetCount}</label>
                        <label className="match-card-match-bets-label">Session Bets : {match.sessionBetCount}</label>
                    </div>
                    <div className="match-card-status-container">
                        <Chip
                            variant="outlined"
                            color="primary"
                            size="sm"
                            sx={{ pointerEvents: 'none', textAlign: "bottom", marginTop: "auto" }}
                        >
                            {match && match.matchStatus}
                        </Chip>
                        {match && match.matchStatus && match.matchStatus.includes("LIVE") && <label className="inplay-blink">In Play</label>}
                    </div>
                </div>
            </div>
            </CardContainer>
        </div>
    );
}

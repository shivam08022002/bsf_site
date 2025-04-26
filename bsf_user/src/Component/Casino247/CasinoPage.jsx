import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import './CasinoPage.css';
import { EvolutionArray } from './Evolution.jsx';
import { Astar } from './Astar.jsx';
import { SaGamingArray } from './Sagaming.jsx';
import { JDBArray } from './JDB.jsx';
import { jiliArray } from './Jili.jsx';
import { PgsoftArray } from './PgSoft.jsx';
import { CQ9Array } from './CQ9.jsx';
// import { RedTigerArray } from './RedTiger.jsx';
import { SpribeArray } from './Spribe.jsx';
import { V8Array } from './V8.jsx';
import { Yeebet } from './YeeBet.jsx';
import { PlayTechLobby } from './PlayTech.jsx';
import { KingMidasArray} from './KingMidas.jsx';
// import { MicroGamingArray } from './MicroGaming.jsx';
import TokenService from '../../services/token-service.js';
// import { httpHelpers } from '../../services/httpHelpers.js';

const providerData = [
  { name: 'All', games: [] },
  { name: 'Evolution', games: EvolutionArray },
  { name: 'PlayTech', games: PlayTechLobby},
  { name: 'Astar', games: Astar },
  { name: 'SaGaming', games: SaGamingArray },
  { name: 'King Midas', games: KingMidasArray},
  { name: 'YeeBet', games: Yeebet },
  { name: 'CQ9', games: CQ9Array },
  { name: 'JDB', games: JDBArray },
  { name: 'Jili', games: jiliArray },
  { name: 'PgSoft', games: PgsoftArray },
  // { name: 'RedTiger', games: RedTigerArray },
  { name: 'Spribe', games: SpribeArray },
  // { name: 'MicroGaming', games: MicroGamingArray },
  { name: 'V8', games: V8Array },
];

// Populate 'All' category with all games
providerData[0].games = providerData.slice(1).flatMap(provider => provider.games);

const ITEMS_PER_PAGE = 30;

const CasinoPage = ({ currentSportName = "casino" }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('All');
  const [displayedGames, setDisplayedGames] = useState([]);
  const [page, setPage] = useState(1);

  const banners = {
    casino: {
      title: "",
      tagline: "",
      bgImage: "https://img.freepik.com/free-vector/casino-poker-game-banner-with-realistic-dice-design-vector_1017-46276.jpg?semt=ais_hybrid",
    },
  };

  const currentBanner = banners[currentSportName] || banners.casino;

  const handleProviderClick = (providerName) => {
    setSelectedProvider(providerName);
    setPage(1);
    setSearchTerm('');
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCasinoGamesClick = async (e, gameId, isLoggedIn, providerName) => {
    e.preventDefault();
    try {
        const accessToken = TokenService.getLocalAccessToken();
        console.log(`Provider: ${providerName}, Game ID: ${gameId}`);  // Debugging  

        if (!accessToken) {
            console.error("No access token found! User might be logged out.");
            return;
        }

        if (!gameId) {
            console.error("No gameId provided! Check if the selected provider's games have valid IDs.");
            return;
        }

        const res = await axios.get(`https://nice247.pro/backend/gamma/getCasinoGameUrl?gameId=${gameId}`, {
          headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        if (res.data && res.data.gameUrl) {
            console.log(`Game URL for ${providerName}:`, res.data.gameUrl);
            window.open(res.data.gameUrl, "_blank");
        } else {
            console.error(`Invalid response format for ${providerName}:`, res.data);
        }
    } catch (err) {
        console.error(`Error fetching game link for ${providerName}:`, err.response?.data || err.message);
    }
};
const filteredGames = useMemo(() => {
  const currentProviderGames = providerData.find(p => p.name === selectedProvider)?.games || [];
  return currentProviderGames.filter(game => 
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [searchTerm, selectedProvider]);

const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);

useEffect(() => {
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  setDisplayedGames(filteredGames.slice(startIndex, endIndex));
}, [searchTerm, selectedProvider, page, filteredGames]);

useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  return (
    <div className="casino-root">
      <div className="casino-page">
        <div
          className="casino-page-banner"
          style={{ backgroundImage: `url(${currentBanner.bgImage})` }}
        >
          <div className="banner-content">
            <div className="banner-text">
              <h1>{currentBanner.title}</h1>
              <p>{currentBanner.tagline}</p>
            </div>
          </div>
        </div>

        <div className="casino-controls">
          <div className="provider-buttons-container">
            <div className="provider-buttons">
              {providerData.map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => handleProviderClick(provider.name)}
                  className={`provider-button ${selectedProvider === provider.name ? 'active' : ''}`}
                >
                  {provider.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="casino-section">
          <div className="casino-grid">
            {displayedGames.map((game) => (
              <div
                key={game.id}
                className="casino-card"
              >
                <div className="casino-card-inner">
                  <img src={game.img} alt={game.name} className="casino-game-img" />
                  <div className="casino-overlay">
                    <h3>{game.name}</h3>
                    <button className="play-button" onClick={(e) => handleCasinoGamesClick(e, game.id,selectedProvider)}>Play Now</button>
                  </div>
                </div>
              </div>
            ))}
            {displayedGames.length === 0 && <p className="no-games">No games found.</p>}
          </div>
          {totalPages > 1 && (
          <div className="pagination">
            <button 
              className="pagination-button"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <div className="pagination-numbers">
              {[...Array(totalPages)].map((_, index) => (
               <button
               key={index + 1}
               className={`pagination-number ${page === index + 1 ? 'active' : ''}`}
               onClick={() => handlePageChange(index + 1)}
             >
               {index + 1}
             </button>
             
              ))}
            </div>
            <button 
              className="pagination-button"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
          )}
         </div>
      </div>
    </div>
  );
};
export default CasinoPage;
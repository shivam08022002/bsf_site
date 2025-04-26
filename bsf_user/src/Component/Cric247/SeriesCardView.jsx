import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import './css/InPlay.css';

export default function SeriesCardView({ id, series }) {
    return (
        <Card
            variant="outlined"
            orientation="horizontal"
            sx={{
                width: "100%",
                height: "46px",
                // border: "1px solid",
                // boxShadow: "rgb(0 0 0 / 30%) 0px 4px 4px, rgb(231 238 236) 0px 0px 0px 3px",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 1px 1px",
                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                cursor: "pointer",
                paddingRight: "0px",
                paddingLeft: "0px",
            }}
        >
            {/* <AspectRatio ratio="1" sx={{ width: 30 }}>
                <img
                    src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
                    srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
                    loading="lazy"
                    alt=""
                />
            </AspectRatio> */}
            <CardContent style={{ paddingLeft: "15px", paddingRight: "15px" }}>
                <Typography level="title-lg" id="card-description" className="tournament-card-title" style={{ color: "#3a61a2", fontWeight: "400" }}>
                    {series.name}
                </Typography>
                {/* <Typography level="body-sm" aria-describedby="card-description" mb={1}>
                    <Link
                        overlay
                        underline="none"
                        href="#interactive-card"
                        sx={{ color: 'text.tertiary' }}
                    >
                        {match.openDate}
                    </Link>
                </Typography>
                <Chip
                    variant="outlined"
                    color="primary"
                    size="sm"
                    sx={{ pointerEvents: 'none', textAlign: "bottom" }}
                >
                    {match && match.matchStatus}
                </Chip> */}
                <label className="all-series-blink">View All Matches</label>
            </CardContent>
        </Card>
    );
}

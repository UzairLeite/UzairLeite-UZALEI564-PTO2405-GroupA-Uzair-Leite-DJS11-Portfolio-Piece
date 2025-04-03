import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getShowDetails } from '../api';
import { Button, Card } from "@chakra-ui/react";
import { addFavourite, removeFavourite, isFavourite } from '../utils/favourites';

export function Show() {
    const { showId } = useParams();
    const [showDetails, setShowDetails] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getShowDetails(showId);
            setShowDetails(res.data);
        };
        fetchData();
    }, [showId]);

    const toggleFavouriteShow = () => {
        if (isFavourite(showDetails.id)) {
            removeFavourite(showDetails.id);
        } else {
            addFavourite(showDetails);
        }
        setShowDetails({ ...showDetails }); // Trigger re-render
    };

    const toggleFavouriteSeason = (season) => {
        if (isFavourite(season.id)) {
            removeFavourite(season.id);
        } else {
            addFavourite(season);
        }
        setShowDetails({ ...showDetails }); // Trigger re-render
    };

    if (!showDetails) return <div>Loading...</div>;

    return <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>{showDetails.title}</h1>
        <Button
            onClick={toggleFavouriteShow}
            colorScheme={isFavourite(showDetails.id) ? 'red' : 'gray'}
            style={{ marginBottom: '1rem' }}
        >
            {isFavourite(showDetails.id) ? 'Unfavourite Show' : 'Favourite Show'}
        </Button>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Seasons</h2>
        <div>
            {showDetails.seasons.map((season, index) => (
                <Card.Root width="100%" key={index} style={{ marginBottom: '1rem' }}>
                    <Card.Body>
                        <Card.Title>{season.title}</Card.Title>
                        <Card.Description>{season.description}</Card.Description>
                    </Card.Body>
                    <Card.Footer justifyContent="flex-end">
                        <Button
                            onClick={() => toggleFavouriteSeason(season)}
                            colorScheme={isFavourite(season.id) ? 'red' : 'gray'}
                        >
                            {isFavourite(season.id) ? 'Unfavourite Season' : 'Favourite Season'}
                        </Button>
                    </Card.Footer>
                </Card.Root>
            ))}
        </div>
    </div>;
}

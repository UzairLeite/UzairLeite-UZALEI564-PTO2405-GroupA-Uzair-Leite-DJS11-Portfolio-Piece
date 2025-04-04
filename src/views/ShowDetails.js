import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShowDetails } from "../api";
import { Avatar, Button, Card, Heading, Text } from "@chakra-ui/react";
import { AudioPlayer } from "../audio/AudioPlayer";
import { Tabs } from "@chakra-ui/react"

export const ShowDetails = () => {
    const { id } = useParams();
    const [show, setShow] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [selectedFavourites, setSelectedFavourites] = useState([]);

    useEffect(() => {
        const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        setSelectedFavourites(favourites);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getShowDetails(id);
            setShow(res.data);
            console.log(res.data);
        };
        fetchData();
    }, [id]);

    if (!show) return <div>Loading...</div>;

    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>{show.title}</h1>    {
                show.seasons.map((season) => (
                    <Button key={season.season} onClick={() => setSelectedSeason(season.season)} colorScheme="blue" mr="2">
                        {season.title}
                    </Button>
                ))
            }
            <Tabs.Root lazyMount unmountOnExit defaultValue="tab-1">
                <Tabs.List>
                    <Tabs.Trigger value="tab-1">Show Details</Tabs.Trigger>
                    <Tabs.Trigger value="tab-2">Favourites</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="tab-1">
                    <h1>Show Details</h1>
                    <div>
                        <Card.Root width="100%">
                            <Card.Body gap="2">
                                <Avatar.Root size="xl" shape="rounded">
                                    <Avatar.Image src={show.image} />
                                    <Avatar.Fallback name={show.title} />
                                </Avatar.Root>
                                <Card.Title mt="2">{show.title}</Card.Title>
                                <Card.Description>{show.description}</Card.Description>
                            </Card.Body>
                        </Card.Root>

                        {show.seasons.filter(season => season.season === selectedSeason).map((season, index) => (
                            <Card.Root key={index} mt="4">
                                <Card.Body>
                                    <Heading size="md">Season {season.season}</Heading>
                                    {season.episodes.map((episode, epIndex) => (
                                        <div key={epIndex}>
                                            <Text>{episode.episode}. {episode.title}</Text>
                                            <AudioPlayer episode={episode} />
                                            <Button onClick={() => {
                                                // Handle favourite logic here
                                                const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
                                                console.log("*", episode);
                                                if (favourites.includes(episode.title)) {
                                                    favourites.splice(favourites.indexOf(episode.title), 1);
                                                } else {
                                                    favourites.push(episode.title);
                                                }
                                                localStorage.setItem('favourites', JSON.stringify(favourites));
                                                setSelectedFavourites(favourites);
                                            }}>{
                                                    selectedFavourites.includes(episode.title) ? 'Unfavourite' : 'Favourite'
                                                }
                                            </Button>
                                        </div>
                                    ))}
                                </Card.Body>
                            </Card.Root>
                        ))}
                    </div>
                </Tabs.Content>
                <Tabs.Content value="tab-2">
                    {show.seasons.filter(season => season.season === selectedSeason).map((season, index) => (
                        <Card.Root key={index} mt="4">
                            <Card.Body>
                                <Heading size="md">Season {season.season}</Heading>
                                {season.episodes.filter(episode => selectedFavourites.includes(episode.title)).map((episode, epIndex) => (
                                    <div key={epIndex}>
                                        <Text>{episode.episode}. {episode.title}</Text>
                                        <AudioPlayer episode={episode} />
                                    </div>
                                ))}
                            </Card.Body>
                        </Card.Root>
                    ))}
                </Tabs.Content>

            </Tabs.Root>
        </div>
    );
};
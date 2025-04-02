import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShowDetails } from "../api";
import { Avatar, Box, Button, Card, Heading, Text } from "@chakra-ui/react";
import { EpisodeList } from "./EpisodeList";
import { AudioPlayer } from "./AudioPlayer";

export const ShowDetails = () => {
    const { id } = useParams();
    const [show, setShow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentEpisode, setCurrentEpisode] = useState(null);

    useEffect(() => {
        const fetchShowDetails = async () => {
            try {
                const res = await getShowDetails(id);
                setShow(res.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchShowDetails();
    }, [id]);

    if (loading) return <Box>Loading show details...</Box>;
    if (error) return <Box>Error: {error}</Box>;
    if (!show) return <Box>Show not found</Box>;

    return (
        <Box>
            <Card.Root>
                <Card.Body>
                    <Avatar.Root size="xl">
                        <Avatar.Image src={show.image} />
                        <Avatar.Fallback name={show.title} />
                    </Avatar.Root>
                    <Heading>{show.title}</Heading>
                    <Text>{show.description}</Text>
                </Card.Body>
            </Card.Root>

            {show.seasons.map(season => (
                <Box key={season.season} mt="4">
                    <Heading size="md">Season {season.season}</Heading>
                    <EpisodeList
                        episodes={season.episodes}
                        onEpisodeSelect={setCurrentEpisode}
                    />
                </Box>
            ))}

            {currentEpisode && (
                <AudioPlayer
                    episode={currentEpisode}
                    onClose={() => setCurrentEpisode(null)}
                />
            )}
        </Box>
    );
};
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShowDetails } from "../api";
import { Avatar, Button, Card, Heading, Text } from "@chakra-ui/react";

export const ShowDetails = () => {
    const { id } = useParams();
    const [show, setShow] = useState(null);

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

                {show.seasons.map((season, index) => (
                    <Card.Root key={index} mt="4">
                        <Card.Body>
                            <Heading size="md">Season {season.season}</Heading>
                            {season.episodes.map((episode, epIndex) => (
                                <div key={epIndex}>
                                    <Text>{episode.episode}. {episode.title}</Text>
                                    <Button
                                        variant="outline"
                                        onClick={() => console.log("Play", episode.file)}
                                    >
                                        Play
                                    </Button>
                                </div>
                            ))}
                        </Card.Body>
                    </Card.Root>
                ))}
            </div>
        </div>
    );
};
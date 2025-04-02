// import { useEffect, useState } from "react";
// import { Link } from "react-router";
import { Avatar, Button, Card } from "@chakra-ui/react";
import { getGenres } from "../api";

const hardcodedGenres = [
    { id: 1, title: 'Personal Growth', image: '', description: '' },
    { id: 2, title: 'Investigative Journalism', image: '', description: '' },
    { id: 3, title: 'History', image: '', description: '' },
    { id: 4, title: 'Comedy', image: '', description: '' },
    { id: 5, title: 'Entertainment', image: '', description: '' },
    { id: 6, title: 'Business', image: '', description: '' },
    { id: 7, title: 'Fiction', image: '', description: '' },
    { id: 8, title: 'News', image: '', description: '' },
    { id: 9, title: 'Kids and Family', image: '', description: '' }
];

export const Genres = () => {
    hardcodedGenres.forEach(async (genre) => {
        try {
            const res = await getGenres(genre.id);
            console.log(res.data);
        } catch (error) {
            console.error(`Failed to fetch genre ${genre.id}:`, error);
        }
    });

    return (
        <div>
            <h1>Genres</h1>
            <div>
                {hardcodedGenres.map((genre, index) => (
                    <Card.Root width="100%" key={genre.id}>
                        <Card.Body gap="2">
                            <Avatar.Root size="lg" shape="rounded">
                                <Avatar.Image src={genre.image} />
                                <Avatar.Fallback name={genre.title} />
                            </Avatar.Root>
                            <Card.Title mt="2">{genre.title}</Card.Title>
                            <Card.Description>{genre.description}</Card.Description>
                        </Card.Body>
                        <Card.Footer justifyContent="flex-end">
                            <Button variant="outline">View</Button>
                            <Button>Join</Button>
                        </Card.Footer>
                    </Card.Root>
                ))}
            </div>
        </div>
    );
};
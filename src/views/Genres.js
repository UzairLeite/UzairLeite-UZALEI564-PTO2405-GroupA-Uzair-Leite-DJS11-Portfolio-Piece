import { useEffect, useState } from "react";
import { Avatar, Card, Box, Select } from "@chakra-ui/react";
import { getGenres } from "../api";
import { useSorting } from "../hooks/Sorting";

export const Genres = () => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const { sortItems, sortField, setSortField } = useSorting();

    useEffect(() => {
        const fetchGenres = async () => {
            const res = await getGenres();
            setGenres(res.data);
            setLoading(false);
        };
        fetchGenres();
    }, []);

    if (loading) return <Box>Loading...</Box>;

    return (
        <Box>
            <h1>Genres</h1>

            <Select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                mb="4"
            >
                <option value="name">Name</option>
                <option value="id">ID</option>
            </Select>

            <div>
                {sortItems(genres).map(genre => (
                    <Card.Root key={genre.id}>
                        <Card.Body>
                            <Avatar.Root>
                                <Avatar.Image src={genre.image} />
                            </Avatar.Root>
                            <Card.Title>{genre.name}</Card.Title>
                        </Card.Body>
                    </Card.Root>
                ))}
            </div>
        </Box>
    );
};
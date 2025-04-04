import { getPreviews } from '../api';
import { useEffect, useState } from 'react';
import { Avatar, Button, Card, HStack, Stack } from "@chakra-ui/react";
import { Link } from 'react-router';
import { useSorting } from '../hooks/Sorting';
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react"

export function Home() {
    const [previews, setPreviews] = useState([]);
    const { sortedItems, requestSort, sortConfig } = useSorting();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getPreviews();
            setPreviews(res.data);
            setLoading(false);
            console.log(res.data);
        };
        fetchData();
    }, []);

    const sortedPreviews = sortedItems(previews); // Sort previews using the hook

    if (loading) {
        return (
            <Stack gap="6" maxW="lg" mx="auto" mt="10">
                <HStack width="full">
                    <SkeletonCircle size="10" />
                    <SkeletonText noOfLines={2} />
                </HStack>
                <Skeleton height="200px" />
            </Stack>
        )
    }

    return <div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' }}>PodFlow</h1>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginBottom: '1rem' }}>
            <Button size="sm" onClick={() => requestSort(null)}>
                Sort by Default {sortConfig.field === null ? (sortConfig.isAsc ? '↑' : '↓') : ''}
            </Button>
            <Button size="sm" onClick={() => requestSort('title')}>
                Sort by Title {sortConfig.field === 'title' ? (sortConfig.isAsc ? '↑' : '↓') : ''}
            </Button>
            <Button size="sm" onClick={() => requestSort('description')}>
                Sort by Description {sortConfig.field === 'description' ? (sortConfig.isAsc ? '↑' : '↓') : ''}
            </Button>
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Podcasts</h2>
        <div>
            {sortedPreviews.map((preview, index) => (
                <Card.Root width="100%" key={index}>
                    <Card.Body gap="2">
                        <Avatar.Root size="xlg" shape="rounded">
                            <Avatar.Image src={preview.image} style={{ width: '18%', height: '10%' }} />
                            <Avatar.Fallback name="Nue Camp" />
                        </Avatar.Root>
                        <Card.Title mt="2">{preview.title}</Card.Title>
                        <Card.Description>{preview.description}</Card.Description>
                    </Card.Body>
                    <Card.Footer justifyContent="flex-end">
                        <Button variant="outline" as={Link} to={`/show/${preview.id}`} >View</Button>
                    </Card.Footer>
                </Card.Root>
            ))}
        </div>
    </div>
}
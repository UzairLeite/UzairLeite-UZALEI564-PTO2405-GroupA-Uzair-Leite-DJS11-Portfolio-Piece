import { getPreviews } from '../api';
import { useEffect, useState } from 'react';
import { Avatar, Button, Card } from "@chakra-ui/react"

export function Home() {
    const [previews, setPreviews] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await getPreviews();
            setPreviews(res.data)
            console.log(res.data)
        }
        fetchData();
    }, []);
    return <div>
        <h1>Podcasts</h1>
        <div>
            {previews.map((preview, index) => (
                <Card.Root width="100%" key={index}>
                    <Card.Body gap="2">
                        <Avatar.Root size="lg" shape="rounded">
                            <Avatar.Image src={preview.image} />
                            <Avatar.Fallback name="Nue Camp" />
                        </Avatar.Root>
                        <Card.Title mt="2">{preview.title}</Card.Title>
                        <Card.Description>{preview.description}</Card.Description>
                    </Card.Body>
                    <Card.Footer justifyContent="flex-end">
                        <Button variant="outline">View</Button>
                        <Button>Join</Button>
                    </Card.Footer>
                </Card.Root>
            ))}
        </div>
    </div>
}
import { Button, List, ListItem } from "@chakra-ui/react";

export const EpisodeList = ({ episodes, onEpisodeSelect }) => {
    return (
        <List spacing={3}>
            {episodes.map(episode => (
                <ListItem key={episode.episode}>
                    <Button
                        variant="ghost"
                        onClick={() => onEpisodeSelect(episode)}
                    >
                        {episode.episode}. {episode.title}
                    </Button>
                </ListItem>
            ))}
        </List>
    );
};

export const AudioPlayer = ({ episode }) => {
    console.log(episode);
    return (
        <audio controls src={episode.file} />
    );
};
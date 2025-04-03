// ...existing code... mock functions...

export async function getShowDetails(showId) {
    // Mock API call
    return {
        data: {
            id: showId,
            title: `Show ${showId}`,
            seasons: [
                { id: `${showId}-season1`, title: 'Season 1', description: 'Description of Season 1' },
                { id: `${showId}-season2`, title: 'Season 2', description: 'Description of Season 2' },
            ],
        },
    };
}

// ...existing code...
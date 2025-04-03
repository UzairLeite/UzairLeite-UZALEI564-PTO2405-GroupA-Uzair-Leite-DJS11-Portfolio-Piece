const FAVOURITES_KEY = 'favourites';

// Fetch all favourites from localStorage
export function getFavourites() {
    const favourites = localStorage.getItem(FAVOURITES_KEY);
    return favourites ? JSON.parse(favourites) : [];
}

// Add an item to favourites
export function addFavourite(item) {
    const favourites = getFavourites();
    if (!favourites.find(fav => fav.id === item.id)) {
        favourites.push(item);
        localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
    }
}

// Remove an item from favourites
export function removeFavourite(itemId) {
    const favourites = getFavourites();
    const updatedFavourites = favourites.filter(fav => fav.id !== itemId);
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(updatedFavourites));
}

// Check if an item is in favourites
export function isFavourite(itemId) {
    const favourites = getFavourites();
    return favourites.some(fav => fav.id === itemId);
}

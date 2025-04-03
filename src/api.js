import axios from "axios"
const BASE_URL = "https://podcast-api.netlify.app"
// /: Array of PREVIEW.
// /genre/<ID>: GENRE object.
// /id/<ID>: SHOW object with SEASON and EPISODE.

export const getPreviews = async () => {
    return axios.get(BASE_URL + "/")
}

export const getGenres = async () => {
    return axios.get(`${BASE_URL}/genre`);
};

export const getShowDetails = async (id) => {
    return axios.get(`${BASE_URL}/id/${id}`);
};

export const toggleFavorite = (episodeId) => axios.post(`/api/favorites/${episodeId}`);
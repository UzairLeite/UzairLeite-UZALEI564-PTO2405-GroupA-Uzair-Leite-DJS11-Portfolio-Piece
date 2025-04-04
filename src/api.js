import axios from "axios"
const BASE_URL = "https://podcast-api.netlify.app"

export const getPreviews = async () => {
    return axios.get(BASE_URL + "/")
}

export const getShowDetails = async (id) => {
    return axios.get(`${BASE_URL}/id/${id}`);
};

export const toggleFavorite = (episodeId) => axios.post(`/api/favorites/${episodeId}`);
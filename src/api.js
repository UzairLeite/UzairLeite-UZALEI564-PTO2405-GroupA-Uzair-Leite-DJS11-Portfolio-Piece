import axios from "axios"
const BASE_URL = "https://podcast-api.netlify.app"
// /: Array of PREVIEW.
// /genre/<ID>: GENRE object.
// /id/<ID>: SHOW object with SEASON and EPISODE.

export const getPreviews = async () => {
    return axios.get(BASE_URL + "/")
}

export const getGenres = async (id) => {
    const url = BASE_URL + "/genre/" + id
    console.log(url)
    return axios.get(url)
}

export const getShowDetails = async (id) => {
    return axios.get(`${BASE_URL}/id/${id}`);
}

export const toggleFavourite = async (itemID, isFavourite) => {
    return Promise.resolve({
        data: {
            success: true,
            isFavourite: !isFavourite
        }
    })
}
import {apiService} from "./apiService";
import {urls} from "../constants";
import {IRes} from "../types";
import {IGenre, IGenres} from "../interfaces";

const genreService = {
    getAllGenres: (): IRes<IGenres<IGenre[]>> => apiService.get(urls.genres.base)
}

export {
    genreService
}
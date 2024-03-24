import {apiService} from "./apiService";
import {urls} from "../constants";
import {IRes} from "../types";
import {IData, IGenre, IGenres, IMovie} from "../interfaces";

const genreService = {
    getAllGenres: (): IRes<IGenres<IGenre[]>> => apiService.get(urls.genres.base),
    getMoviesCountByGenre: (genreId: number): IRes<IData<IMovie[]>> => apiService.get(urls.genres.byGenre(genreId)),
}

export {
    genreService
}
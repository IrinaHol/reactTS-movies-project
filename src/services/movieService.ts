import {apiService} from "./apiService";
import {urls} from "../constants";
import {IRes} from "../types";
import {IData, IMovie} from "../interfaces";

const movieService = {
    getAll: (page: string): IRes<IData<IMovie[]>> => apiService.get(urls.movies.base,  {params: {page}}),
    getById: (id: number): IRes<IMovie> => apiService.get(urls.movies.byId(id)),
    getMoviesByGenre: (genreId: number, page: string): IRes<IData<IMovie[]>> => apiService.get(urls.genres.byGenre(genreId), {
        params: {page}}),
    searchByTitle: (search: string = '', page: string = '1'): IRes<IData<IMovie[]>> => apiService.get(urls.movies.bySearch(search), {params: {page}})
}

export {
    movieService
}
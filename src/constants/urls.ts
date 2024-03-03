const baseURL = 'https://api.themoviedb.org/3'

const movies = '/discover/movie';
const movie = '/movie';
const genre =  '/genre/movie/list';
const moviesByGenre = '/discover/movie';
const searchMovie = '/search/movie'

const urls = {
    movies: {
        base: movies,
        byId: (id: number): string => `${movie}/${id}`,
        bySearch: (word: string): string => `${searchMovie}?query=${word}`
    },
    genres: {
        base: genre,
        byGenre: (id:number): string => `${moviesByGenre}?with_genres=${id}`
    },

}

export {
    baseURL, urls
}
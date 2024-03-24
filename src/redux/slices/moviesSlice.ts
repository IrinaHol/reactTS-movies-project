import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IData, IGenre, IGenres, IMovie} from "../../interfaces";
import {genreService, movieService} from "../../services";

interface IState {
    movies: IData<IMovie[]>,
    genres: IGenres<IGenre[]>,
    movie: IMovie,
    movieCountByGenres: number
}

const initialState: IState = {
    movies: null,
    genres: null,
    movie: null,
    movieCountByGenres: 0
}

const getAll = createAsyncThunk<IData<IMovie[]>, { page: string }>(
    'moviesSlice/getAll',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getAll(page);
            return data
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response?.data)
        }
    }
)

const getAllGenres = createAsyncThunk<IGenres<IGenre[]>, void>(
    'moviesSlice/getAllGenres',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await genreService.getAllGenres();
            return data
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response?.data)
        }
    }
)

const getMoviesByGenre = createAsyncThunk<IData<IMovie[]>, { id: number, page: string }>(
    'moviesSlice/getMoviesByGenre',
    async ({id, page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getMoviesByGenre(id, page)
            return data
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response?.data)
        }
    }
)

const getMovieByTitle = createAsyncThunk<IData<IMovie[]>, { search: string, page: string }>(
    'moviesSlice/getMovieByTitle',
    async ({search, page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.searchByTitle(search, page)
            return data
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response?.data)
        }
    }
)

const getMovieById = createAsyncThunk<IMovie, { id: number }>(
    'moviesSlice/getMovieById',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getById(id)
            return data

        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response?.data)
        }
    }
)

const getMovieByCountGenre = createAsyncThunk<IData<IMovie[]>, { id: number }>(
    'moviesSlice/getMovieByCountGenre',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await genreService.getMoviesCountByGenre(id)
            return data

        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response?.data)
        }
    }
)


const moviesSlice = createSlice({
    name: 'moviesSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAllGenres.fulfilled, (state, action) => {
                state.genres = action.payload
            })
            .addCase(getMovieById.fulfilled, (state, action) => {
                state.movie = action.payload
            })
            .addCase(getMovieByCountGenre.fulfilled, (state, action) => {
                state.movieCountByGenres = action.payload.total_results
            })
            .addMatcher(isFulfilled(getAll, getMovieByTitle,getMoviesByGenre), (state, action) => {
                state.movies = action.payload
            })

})

const {reducer: movieReducer, actions} = moviesSlice;

const movieActions = {
    ...actions,
    getAll,
    getAllGenres,
    getMoviesByGenre,
    getMovieByTitle,
    getMovieById,
    getMovieByCountGenre
}

export {
    movieReducer,
    movieActions
}
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import css from './MoviesList.module.css';
import {PaginationMovies} from "../../Pagination";
import {MovieCard} from "../MovieCard";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {Loading} from "../../Loading";
import {movieActions} from "../../../redux";

const MoviesList = () => {
    let {movies} = useAppSelector(state => state.movies);
    const {isLoading, errors} = useAppSelector( state => state.loading);
    const {theme} = useAppSelector( state => state.theme);
    const [page, setPage] = useState(1);

    const dispatch = useAppDispatch();
    const {genreId, search} = useParams();

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    useEffect(() => {
        if (genreId) {
            dispatch(movieActions.getMoviesByGenre({id: +genreId, page: `${page}`}))
        } else if (search){
            dispatch(movieActions.getMovieByTitle({search, page: `${page}`}));
        } else {
            dispatch(movieActions.getAll({page: `${page}`}))
        }

    }, [page, search, genreId, dispatch]);

    return (
        <div>
            {isLoading && <Loading/>}
            {errors && <h1>{errors.status_message} Something went wrong!</h1>}
                <div className={theme ? css.mainContainerWhite : css.mainContainer}>
                    <div className={css.line}></div>
                    <div>
                        <div className={css.moviesContainer}>{
                            movies?.results.map(movie => <MovieCard key={movie.id} id={movie.id}
                                                                   poster_path={movie.poster_path} title={movie.title}
                                                                   rating={movie.vote_average}/>)
                        }
                        </div>
                        <PaginationMovies count={movies?.total_pages <= 500 ? movies?.total_pages : 500} page={+page} onChange={handleChange}/>
                    </div>
                </div>
        </div>
    );
}


export {MoviesList};
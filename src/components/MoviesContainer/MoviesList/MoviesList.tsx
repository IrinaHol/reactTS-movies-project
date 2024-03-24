import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";

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
    const dispatch = useAppDispatch();


    const [query, setQuery] = useSearchParams({page: '1'});
    const page = query.get('page');


    const handleChange = (value: number): void => {
        const newParams = new URLSearchParams(query.toString());
        newParams.set('page', value.toString());
        setQuery(newParams);
    }

    useEffect(() => {
        dispatch(movieActions.getAll({page}))
    }, [page]);

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
                        <PaginationMovies count={500} page={+page} onChange={handleChange}/>
                    </div>
                </div>
        </div>
    );
}


export {MoviesList};
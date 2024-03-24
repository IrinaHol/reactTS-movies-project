import {useEffect} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";


import {PaginationMovies} from "../../Pagination";
import {MovieCard} from "../MovieCard";
import css from './MovieByGenre.module.css'
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {Loading} from "../../Loading";
import {movieActions} from "../../../redux";

const MoviesByGenre = () => {
    let {movies} = useAppSelector(state => state.movies);
    let dispatch = useAppDispatch();
    const {isLoading, errors} = useAppSelector(state => state.loading);
    const {theme} = useAppSelector( state => state.theme);

    const [query, setQuery] = useSearchParams({page: '1'});
    const page = query.get('page');
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(movieActions.getMoviesByGenre({id: +id, page}))
    }, [page, id, dispatch]);

    const handleChange = (value: number): void => {
        const newParams = new URLSearchParams(query.toString());
        newParams.set('page', value.toString());
        setQuery(newParams);
    }

    return (
        <div>
            {isLoading && <Loading/>}
            {errors && <h1>{errors.status_message} Something went wrong!</h1>}
            <div className={theme ? css.mainContainerLight : css.mainContainerDark}>
                <div className={css.btnBack}>
                    <button onClick={() => navigate(-1)}>BACK</button>
                </div>
                <div className={css.moviesContainer}>{movies?.results.map(movieByGenre => <MovieCard
                    key={movieByGenre.id} id={movieByGenre.id} poster_path={movieByGenre.poster_path}
                    title={movieByGenre.title} rating={movieByGenre.vote_average}/>)}
                    <div className={css.pagination}><PaginationMovies
                        count={movies?.total_pages <= 500 ? movies?.total_pages : 500}
                        page={+page} onChange={handleChange}/></div>
                </div>
            </div>
        </div>
    );
};

export {MoviesByGenre};
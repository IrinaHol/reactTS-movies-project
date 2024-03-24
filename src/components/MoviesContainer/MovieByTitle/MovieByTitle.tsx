import {useEffect} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";

import {MovieCard} from "../MovieCard";
import {PaginationMovies} from "../../Pagination";
import css from './MovieByTitle.module.css'
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {Loading} from "../../Loading";
import {movieActions} from "../../../redux";

const MovieByTitle = () => {
    const {movies} = useAppSelector(state => state.movies);
    const {isLoading, errors} = useAppSelector(state => state.loading);
    const {theme} = useAppSelector( state => state.theme);

    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams({page: '1'});
    const {search} = useParams();
    const navigate = useNavigate();

    const page = query.get('page');

    useEffect(() => {
        dispatch(movieActions.getMovieByTitle({search, page}));
    }, [page, search, dispatch]);

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
                {!movies?.total_results ? <div className={css.notFound}><h2>There is no movie</h2></div> :
                    <div className={css.moviesContainer}>{movies?.results.map(movieByTitle => <MovieCard
                        key={movieByTitle.id} id={movieByTitle.id} poster_path={movieByTitle.poster_path}
                        title={movieByTitle.title} rating={movieByTitle.vote_average}/>)}
                        <div className={css.pagination}><PaginationMovies
                            count={movies?.total_pages <= 500 ? movies?.total_pages : 500} page={+page}
                            onChange={handleChange}/></div>
                    </div>
                }
            </div>
        </div>
    );
};

export {MovieByTitle};
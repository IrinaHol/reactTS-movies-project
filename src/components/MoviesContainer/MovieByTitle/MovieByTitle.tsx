import {useEffect, useState} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";

import {movieService} from "../../../services";
import {IData, IMovie} from "../../../interfaces";
import {MovieCard} from "../MovieCard";
import {PaginationMovies} from "../../Pagination";
import css from './MovieByTitle.module.css'
import {useAppContext} from "../../../hooks";
import {Loading} from "../../Loading";

const MovieByTitle = () => {
    const [moviesByTitle, setMoviesByTitle] = useState<IData<IMovie[]>>({
        results: [],
        page: null,
        total_pages: 1,
        total_results: null
    })
    const [query, setQuery] = useSearchParams({page: '1'});
    const [isLoading, setIsLoading] = useState(true);

    const {search} = useParams();
    const navigate = useNavigate();
    const {theme,} = useAppContext();

    const page = query.get('page');

    useEffect(() => {
        movieService.searchByTitle(search, page).then(({data}) => setMoviesByTitle(() => {
            const {results, page, total_pages, total_results} = data
            setIsLoading(false)

            return {
                results,
                page,
                total_pages,
                total_results
            }
        }))
    }, [page, search]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number): void => {
        const newParams = new URLSearchParams(query.toString());
        newParams.set('page', value.toString());
        setQuery(newParams);
    }

    return (
        <div>{isLoading ? <Loading/> :
            <div className={theme ? css.mainContainerLight : css.mainContainerDark}>
                <div className={css.btnBack}>
                    <button onClick={() => navigate(-1)}>BACK</button>
                </div>
                <div className={css.moviesContainer}>{moviesByTitle.results.map(movieByTitle => <MovieCard
                    key={movieByTitle.id} id={movieByTitle.id} poster_path={movieByTitle.poster_path}
                    title={movieByTitle.title} rating={movieByTitle.vote_average} state={movieByTitle}/>)}
                    <div className={css.pagination}><PaginationMovies
                        count={moviesByTitle?.total_pages <= 500 ? moviesByTitle?.total_pages : 500} page={+page}
                        onChange={handleChange}/></div>
                </div>
            </div>
        }</div>
    );
};

export {MovieByTitle};
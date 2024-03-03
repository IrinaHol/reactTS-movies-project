import {useEffect, useState} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";

import {IData, IMovie} from "../../../interfaces";
import {PaginationMovies} from "../../Pagination";
import {MovieCard} from "../MovieCard";
import css from './MovieByGenre.module.css'
import {useAppContext} from "../../../hooks";
import {Loading} from "../../Loading";
import {movieService} from "../../../services";

const MoviesBytGenre = () => {

    const [moviesByGenres, setMoviesByGenres] = useState<IData<IMovie[]>>({
        results: [],
        page: null,
        total_pages: 1,
        total_results: 1
    })
    const [isLoading, setIsLoading] = useState(true);

    const [query, setQuery] = useSearchParams({page: '1'});
    const page = query.get('page');
    const {genreId} = useParams();
    const navigate = useNavigate();
    const {theme,} = useAppContext();

    useEffect(() => {
        movieService.getMoviesByGenre(+genreId, page).then(({data}) => setMoviesByGenres(() => {
            const {results, page, total_pages, total_results} = data
            setIsLoading(false)
            return {
                results,
                page,
                total_pages,
                total_results
            }
        }))
    }, [page, genreId]);

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
                <div className={css.moviesContainer}>{moviesByGenres.results.map(movieByGenre => <MovieCard
                    key={movieByGenre.id} id={movieByGenre.id} poster_path={movieByGenre.poster_path}
                    title={movieByGenre.title} rating={movieByGenre.vote_average} state={movieByGenre}/>)}
                    <div className={css.pagination}><PaginationMovies
                        count={moviesByGenres?.total_pages <= 500 ? moviesByGenres?.total_pages : 500}
                        page={+page} onChange={handleChange}/></div>
                </div>
            </div>
        }</div>
    );
};

export {MoviesBytGenre};
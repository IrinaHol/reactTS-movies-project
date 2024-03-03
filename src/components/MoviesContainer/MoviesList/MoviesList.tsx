import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

import {movieService} from "../../../services";
import {IData, IMovie} from "../../../interfaces";
import css from './MoviesList.module.css';
import {PaginationMovies} from "../../Pagination";
import {MovieCard} from "../MovieCard";
import {useAppContext} from "../../../hooks";
import {Loading} from "../../Loading";

const MoviesList = () => {

    const [movies, setMovies] = useState<IData<IMovie[]>>({
        results: [],
        page: null,
        total_pages: null,
        total_results: null
    })

    const [query, setQuery] = useSearchParams({page: '1'});
    const page = query.get('page');
    const {theme,} = useAppContext();
    const [isLoading, setIsLoading] = useState(true)

    const handleChange = (event: React.ChangeEvent<unknown>, value: number): void => {
        const newParams = new URLSearchParams(query.toString());
        newParams.set('page', value.toString());
        setQuery(newParams);
    }

    useEffect(() => {
        movieService.getAll(page).then(({data}) => setMovies(() => {
            const {results, page, total_pages, total_results} = data
            setIsLoading(false)
            return {
                results,
                page,
                total_pages,
                total_results
            }

        }))
    }, [page]);

    return (
        <div>
            {isLoading ? <Loading/> :
                <div className={theme ? css.mainContainerWhite : css.mainContainer}>
                    <div className={css.line}></div>
                    <div>
                        <div className={css.moviesContainer}>{
                            movies.results.map(movie => <MovieCard key={movie.id} id={movie.id} state={movie}
                                                                   poster_path={movie.poster_path} title={movie.title}
                                                                   rating={movie.vote_average}/>)
                        }
                        </div>
                        <PaginationMovies count={500} page={+page} onChange={handleChange}/>
                    </div>
                </div>
            }
        </div>
    );
}

export {MoviesList};
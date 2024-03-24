import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {PosterPreview} from "../../PosterPreview";
import {StarsRating} from "../../StarsRating";
import css from './MovieInfo.module.css'
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {Loading} from "../../Loading";
import {movieActions} from "../../../redux";


const MovieInfo = () => {
    const {movie} = useAppSelector(state => state.movies);
    const {isLoading, errors} = useAppSelector(state => state.loading);
    const {theme} = useAppSelector(state => state.theme);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        dispatch(movieActions.getMovieById({id: +id}))
    }, [id, dispatch]);

    return (
        <div>
            <section className={theme ? css.movieInfoContainerLight : css.movieInfoContainerDark}>
                <div className={css.btnBack}>
                    <button onClick={() => navigate(-1)}>BACK</button>
                </div>
                {isLoading && <Loading/>}
                {errors && <h1>{errors.status_message} Something went wrong!</h1>}
                <div className={css.movieInfoBox}>
                    <div className={css.poster}><PosterPreview poster_path={movie?.poster_path} title={movie?.title}/>
                    </div>
                    <div className={css.movieInfo}>
                        <h1>{movie?.title}</h1>
                        <p><span>Release date: </span> {movie?.release_date}</p>
                        <span>Rating: </span>
                        <StarsRating rating={movie?.vote_average}/>
                        <p><span>Genres: </span></p>
                        <ul>{movie?.genres?.map(genre => <li key={genre.id} onClick={() => navigate(`/moviesByGenre/${genre.id}`)}>{genre.name}</li>)}</ul>
                        <p><span>Overview: </span>{movie?.overview}</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export {MovieInfo};
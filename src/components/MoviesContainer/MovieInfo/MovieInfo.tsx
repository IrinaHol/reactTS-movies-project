import {FC} from "react";
import {useNavigate} from "react-router-dom";

import {IMovie} from "../../../interfaces";
import {PosterPreview} from "../../PosterPreview";
import {StarsRating} from "../../StarsRating";
import css from './MovieInfo.module.css'
import {useAppContext} from "../../../hooks";

interface IProps {
    movieInfo: IMovie
}

const MovieInfo: FC<IProps> = ({movieInfo}) => {
    const {title, release_date, overview, poster_path, genres, vote_average} = movieInfo;

    const navigate = useNavigate();
    const {theme,} = useAppContext();

    return (
        <div>

            <section className={theme ? css.movieInfoContainerLight : css.movieInfoContainerDark}>
                <div className={css.btnBack}>
                    <button onClick={() => navigate(-1)}>BACK</button>
                </div>
                <div className={css.movieInfoBox}>
                    <div className={css.poster}><PosterPreview poster_path={poster_path} title={title}/></div>
                    <div className={css.movieInfo}>
                        <h1>{title}</h1>
                        <p><span>Release date: </span> {release_date}</p>
                        <span>Rating: </span>
                        <StarsRating rating={vote_average}/>
                        <p><span>Genres: </span></p>
                        <ul>{genres.map(genre => <li onClick={() => navigate(`/moviesByGenre/${genre.id}`)}
                                                     key={genre.id}> {genre.name}</li>)}</ul>
                        <p><span>Overview: </span>{overview}</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export {MovieInfo};
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {IMovie} from "../../interfaces";
import {useAppLocation} from "../../hooks";
import {movieService} from "../../services";
import {MovieInfo} from "../../components/MoviesContainer";
import {Loading} from "../../components/Loading";

const MovieInfoPage = () => {
    const [movieInfo, setMovieInfo] = useState<IMovie>(null)
    const [isLoading, setIsLoading] = useState(true);

    const {state} = useAppLocation<{ movie: IMovie }>();
    const {id} = useParams();


    useEffect(() => {
        if (state?.movie) {
            setMovieInfo(state.movie)
        } else {
            movieService.getById(+id).then(({data}) => setMovieInfo(data))
            setIsLoading(false)
        }
    }, [id, state]);

    return (
        <div>{isLoading ? <Loading/> :
            <div>{movieInfo && <MovieInfo movieInfo={movieInfo}/>}</div>
        }</div>
    );
};

export {MovieInfoPage};
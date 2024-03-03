import {MoviesList} from "../../components/MoviesContainer";
import {Outlet} from "react-router-dom";

const MoviesListPage = () => {
    return (
        <div>
            <Outlet/>
            <MoviesList/>
        </div>
    );
};

export {MoviesListPage};
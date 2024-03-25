import {createBrowserRouter, Navigate} from "react-router-dom";

import {MainLayout} from "./layouts/MainLayout";
import {GenrePage, MovieInfoPage, MoviesListPage} from "./pages";
import {NotFound} from "./components/NotFound";

const router = createBrowserRouter([
    {
        path: '/', element: <MainLayout/>, children: [
            {index: true, element: <Navigate to={'movies'}/>},
            {path: 'movies', element: <MoviesListPage/>, children: [
                    {path: '/movies/genres', element: <GenrePage/>},
                ]
            },
            {path: 'movie/:id', element: <MovieInfoPage/>},
            {path: 'moviesByGenre/:genreId', element: <MoviesListPage/>},
            {path: 'movieSearch/:search', element: <MoviesListPage/>},
            {path: '*', element: <NotFound/>}
        ]
    }
]);

export {
    router
}
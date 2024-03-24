import {createBrowserRouter, Navigate} from "react-router-dom";

import {MainLayout} from "./layouts/MainLayout";
import {MovieByTitle, MoviesByGenre} from "./components/MoviesContainer";
import {GenrePage, MovieInfoPage, MoviesListPage} from "./pages";
import {NotFound} from "./components/NotFound";

const router = createBrowserRouter([
    {
        path: '/', element: <MainLayout/>, children: [
            {index: true, element: <Navigate to={'movies'}/>},
            {path: 'movies', element: <MoviesListPage/>, children: [
                    {path: 'genres', element: <GenrePage/>},
                ]
            },
            {path: 'movie/:id', element: <MovieInfoPage/>},
            {path: 'moviesByGenre/:id', element: <MoviesByGenre/>},
            {path: 'movieSearch/:search', element: <MovieByTitle/>},
            {path: '*', element: <NotFound/>}
        ]
    }
]);

export {
    router
}
import {FC} from "react";

import css from './PostPreview.module.css';
import posterDefault from '../../images/default_poster.png'

interface IProps {
    poster_path: string,
    title: string
}

const PosterPreview: FC<IProps> = ({poster_path, title}) => {
    return (
        <section className={css.posterPreview}>
            {poster_path ?
                <img className={css.image} src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title}/> :
                <img src={posterDefault} alt={'default'}/>}
        </section>
    );
};

export {PosterPreview};
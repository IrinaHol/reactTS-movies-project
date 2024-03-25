import {useNavigate} from "react-router-dom";
import Switch from '@mui/material/Switch';

import {SearchMovie} from "../SearchMovie";
import css from './Header.module.css'
import userIcon from '../../assets/images/icons8-user-64.png';
import userIconBlack from '../../assets/images/icons7-user-64.png';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {themeActions} from "../../redux";

const Header = () => {
    const dispatch = useAppDispatch();
    const {theme} = useAppSelector(state => state.theme);
    const navigate = useNavigate();

    const handleChange = (): void => {
        dispatch(themeActions.setTrigger());
    };


    return (
        <header className={theme ? css.headerContainerLight : css.headerContainerDark}>
            <h1 onClick={() => navigate('movies')}>MovieDB</h1>
            <nav className={theme ? css.navBoxWhite : css.navBoxBlack}>
                <button onClick={() => navigate('movies')}>Movies</button>
                <button onClick={() => navigate('movies/genres')}>Genres</button>
                <SearchMovie/>
            </nav>
            <div className={css.switch}>
                <Switch
                    checked={theme}
                    onChange={handleChange}
                    inputProps={{'aria-label': 'controlled'}}
                    color="default"
                />
            </div>
            <div className={css.userIcon}>
                <img src={theme ? userIconBlack : userIcon} alt="userIcon"/>
            </div>
        </header>
    );
}

export {Header};
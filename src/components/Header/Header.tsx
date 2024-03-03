import React from "react";
import {NavLink, useNavigate} from "react-router-dom";
import Switch from '@mui/material/Switch';

import {SearchMovie} from "../SearchMovie";
import css from './Header.module.css'
import userIcon from '../../images/icons8-user-64.png';
import userIconBlack from '../../images/icons7-user-64.png';
import {useAppContext} from "../../hooks";

const Header = () => {
    const navigate = useNavigate();
    const {theme, setTheme} = useAppContext();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setTheme(event.target.checked);
    };

    return (
        <header className={theme ? css.headerContainerLight : css.headerContainerDark}>
            <h1 onClick={() => navigate('movies')}>MovieDB</h1>
            <nav className={theme ? css.navBoxWhite : css.navBoxBlack}>
                <NavLink to={'movies'}>Movies</NavLink>
                <NavLink to={'movies/genres'}>Genres</NavLink>
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
};

export {Header};
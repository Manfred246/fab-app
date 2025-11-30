import { Link, useLocation } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import './Navigation.css';

function Navigation({ darkMode, onToggleTheme }) {
    const location = useLocation();

    return (
        <nav className="main-navigation">
            <div className="nav-brand">
                <Link to="/">
                    <h2>Трекер технологий</h2>
                </Link>
            </div>

            <ul className="nav-menu">
                <li>
                    <Link
                        to="/"
                        className={location.pathname === '/' ? 'active' : ''}
                    >
                        Главная
                    </Link>
                </li>
                <li>
                    <Link
                        to="/technologies"
                        className={location.pathname === '/technologies' ? 'active' : ''}
                    >
                        Все технологии
                    </Link>
                </li>
                <li>
                    <Link
                        to="/add-technology"
                        className={location.pathname === '/add-technology' ? 'active' : ''}
                    >
                        Добавить технологию
                    </Link>
                </li>
                <li>
                    <Link
                        to="/stats"
                        className={location.pathname === '/stats' ? 'active' : ''}
                    >
                        Статистика
                    </Link>
                </li>
                <li>
                    <Link
                        to="/settings"
                        className={location.pathname === '/settings' ? 'active' : ''}
                    >
                        Настройки
                    </Link>
                </li>
                <li>
                    <IconButton
                        onClick={onToggleTheme}
                        color="inherit"
                        aria-label={darkMode ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
                    >
                        {darkMode ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
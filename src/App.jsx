import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import Stats from './pages/Stats';
import Settings from './pages/Settings';
import TechnologySearch from './components/TechnologySearch';
import BulkStatusEditor from './components/BulkStatusEditor';
import NotificationSystem from './components/NotificationSystem';
import useTechnologiesApi from './hooks/useTechnologiesApi';
import './App.css';

function App() {
    const { technologies, loading, error, refetch, updateMultipleStatuses } = useTechnologiesApi();
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('darkMode');
        if (savedTheme) {
            setDarkMode(JSON.parse(savedTheme));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));

        if (darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }, [darkMode]);

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: '#1976d2',
            },
            secondary: {
                main: '#dc004e',
            },
        },
    });

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    if (loading) {
        return (
            <div className="app-loading">
                <div className="spinner"></div>
                <p>Загрузка технологий...</p>
            </div>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <div className="app">
                    <Navigation darkMode={darkMode} onToggleTheme={toggleTheme} />
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/technologies" element={
                                <div className="page">
                                    <div className="page-header">
                                        <h1>Все технологии</h1>
                                        <button onClick={refetch} className="btn btn-primary">
                                            Обновить
                                        </button>
                                    </div>
                                    
                                    {error && (
                                        <div className="app-error">
                                            <p>{error}</p>
                                            <button onClick={refetch} className="btn btn-primary">
                                                Попробовать снова
                                            </button>
                                        </div>
                                    )}

                                    <TechnologySearch 
                                        technologies={technologies}
                                        onTechnologySelect={(tech) => console.log('Selected:', tech)}
                                    />
                                    
                                    <BulkStatusEditor 
                                        technologies={technologies}
                                        onStatusUpdate={updateMultipleStatuses}
                                    />
                                    
                                    <TechnologyList technologies={technologies} />
                                </div>
                            } />
                            <Route path="/technology/:techId" element={<TechnologyDetail />} />
                            <Route path="/add-technology" element={<AddTechnology />} />
                            <Route path="/stats" element={<Stats />} />
                            <Route path="/settings" element={
                                <Settings darkMode={darkMode} onToggleTheme={toggleTheme} />
                            } />
                        </Routes>
                    </main>
                    <NotificationSystem />
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import Stats from './pages/Stats';
import Settings from './pages/Settings';
import TechnologySearch from './components/TechnologySearch';
import useTechnologiesApi from './hooks/useTechnologiesApi';
import './App.css';

function App() {
    const { technologies, loading, error, refetch } = useTechnologiesApi();

    if (loading) {
        return (
            <div className="app-loading">
                <div className="spinner"></div>
                <p>Загрузка технологий...</p>
            </div>
        );
    }

    return (
        <Router>
            <div className="app">
                <Navigation />
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
                                <TechnologyList technologies={technologies} />
                            </div>
                        } />
                        <Route path="/technology/:techId" element={<TechnologyDetail />} />
                        <Route path="/add-technology" element={<AddTechnology />} />
                        <Route path="/stats" element={<Stats />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
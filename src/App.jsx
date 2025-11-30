import './App.css';
import { useState, useEffect } from 'react';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';

function App() {
    const [technologies, setTechnologies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('techTrackerData');
        if (saved) {
            try {
                const parsedData = JSON.parse(saved);
                setTechnologies(parsedData);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
                setTechnologies(getInitialTechnologies());
            }
        } else {
            setTechnologies(getInitialTechnologies());
        }
    }, []);

    const getInitialTechnologies = () => [
        {
            id: 1,
            title: 'React Components',
            description: 'Изучение базовых компонентов',
            status: 'not-started',
            notes: ''
        },
        {
            id: 2,
            title: 'JSX Syntax', 
            description: 'Освоение синтаксиса JSX',
            status: 'not-started',
            notes: ''
        },
        {
            id: 3,
            title: 'State Management',
            description: 'Работа с состоянием компонентов',
            status: 'not-started',
            notes: ''
        }
    ];

    useEffect(() => {
        if (technologies.length > 0) {
            localStorage.setItem('techTrackerData', JSON.stringify(technologies));
            console.log('Данные сохранены в localStorage:', technologies);
        }
    }, [technologies]);

    const handleStatusChange = (id, newStatus) => {
        setTechnologies(prevTechnologies => 
            prevTechnologies.map(tech => 
                tech.id === id ? { ...tech, status: newStatus } : tech
            )
        );
    };

    const updateTechnologyNotes = (techId, newNotes) => {
        setTechnologies(prevTech =>
            prevTech.map(tech =>
                tech.id === techId ? { ...tech, notes: newNotes } : tech
            )
        );
    };

    const filteredTechnologies = technologies.filter(tech =>
        tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="App">
            <header className="App-header">
                <h1>Трекер изучения технологий</h1>
            </header>

            <ProgressHeader technologies={technologies} />
            
            {/* Поле поиска */}
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Поиск технологий..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span>Найдено: {filteredTechnologies.length}</span>
            </div>
            
            <div className="technologies-grid">
                <h2>Дорожная карта технологий</h2>
                {filteredTechnologies.map(tech => (
                    <TechnologyCard
                        key={tech.id}
                        id={tech.id}
                        title={tech.title}
                        description={tech.description}
                        status={tech.status}
                        notes={tech.notes}
                        onStatusChange={handleStatusChange}
                        onNotesChange={updateTechnologyNotes}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
import './App.css';
import { useState } from 'react';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';

function App() {
    const [technologies, setTechnologies] = useState([
        {
            id: 1,
            title: 'React Components',
            description: 'Изучение базовых компонентов',
            status: 'not-started'
        },
        {
            id: 2,
            title: 'JSX Syntax', 
            description: 'Освоение синтаксиса JSX',
            status: 'in-progress'
        },
        {
            id: 3,
            title: 'State Management',
            description: 'Работа с состоянием компонентов',
            status: 'completed'
        }
    ]);

    const handleStatusChange = (id, newStatus) => {
        setTechnologies(prevTechnologies => 
            prevTechnologies.map(tech => 
                tech.id === id ? { ...tech, status: newStatus } : tech
            )
        );
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Трекер изучения технологий</h1>
            </header>

            <ProgressHeader technologies={technologies} />
            
            <div className="technologies-grid">
                <h2>Дорожная карта технологий</h2>
                {technologies.map(tech => (
                    <TechnologyCard
                        key={tech.id}
                        id={tech.id}
                        title={tech.title}
                        description={tech.description}
                        status={tech.status}
                        onStatusChange={handleStatusChange}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
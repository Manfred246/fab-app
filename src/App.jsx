import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';

function App() {
    const technologies = [
        { 
            id: 1, 
            title: 'React Components', 
            description: 'Изучение функциональных и классовых компонентов, их жизненного цикла и методов', 
            status: 'completed' 
        },
        { 
            id: 2, 
            title: 'JSX Syntax', 
            description: 'Освоение синтаксиса JSX, работа с выражениями и условным рендерингом', 
            status: 'in-progress' 
        },
        { 
            id: 3, 
            title: 'State Management', 
            description: 'Работа с состоянием компонентов, использование хуков useState и useEffect', 
            status: 'not-started' 
        }
    ];

    return (
        <div className="App">
            <header className="App-header">
                <h1>Трекер изучения технологий</h1>
                <p>Отслеживайте ваш прогресс в изучении современных технологий</p>
            </header>

            <ProgressHeader technologies={technologies} />
            
            <div className="technologies-grid">
                <h2>Дорожная карта технологий</h2>
                {technologies.map(tech => (
                    <TechnologyCard
                        key={tech.id}
                        title={tech.title}
                        description={tech.description}
                        status={tech.status}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
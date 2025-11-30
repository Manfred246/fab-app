import './App.css';
import useTechnologies from './hooks/useTechnologies';
import ProgressBar from './components/ProgressBar';
import TechnologyCard from './components/TechnologyCard';
import QuickActions from './components/QuickActions';

function App() {
    const { technologies, updateStatus, updateNotes, markAllCompleted, resetAllStatuses, progress } = useTechnologies();

    return (
        <div className="app">
            <header className="app-header">
                <h1>Трекер изучения технологий</h1>
                <ProgressBar
                    progress={progress}
                    label="Общий прогресс"
                    color="#4CAF50"
                    animated={true}
                    height={20}
                />
            </header>

            <QuickActions 
                onMarkAllCompleted={markAllCompleted}
                onResetAll={resetAllStatuses}
                technologies={technologies}
            />

            <main className="app-main">
                <div className="technologies-grid">
                    {technologies.map(tech => (
                        <TechnologyCard
                            key={tech.id}
                            technology={tech}
                            onStatusChange={updateStatus}
                            onNotesChange={updateNotes}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default App;
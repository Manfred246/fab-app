import { useState, useEffect } from 'react';
import './Stats.css';

function Stats() {
    const [technologies, setTechnologies] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('technologies');
        if (saved) {
            setTechnologies(JSON.parse(saved));
        }
    }, []);

    const total = technologies.length;
    const completed = technologies.filter(t => t.status === 'completed').length;
    const inProgress = technologies.filter(t => t.status === 'in-progress').length;
    const notStarted = technologies.filter(t => t.status === 'not-started').length;
    
    const progressPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    const categoryStats = technologies.reduce((acc, tech) => {
        acc[tech.category] = (acc[tech.category] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="page">
            <div className="page-header">
                <h1>Статистика</h1>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Общий прогресс</h3>
                    <div className="progress-circle">
                        <span>{progressPercentage}%</span>
                    </div>
                </div>

                <div className="stat-card">
                    <h3>Распределение по статусам</h3>
                    <div className="status-stats">
                        <div className="stat-item">
                            <span className="stat-label">Завершено:</span>
                            <span className="stat-value">{completed}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">В процессе:</span>
                            <span className="stat-value">{inProgress}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Не начато:</span>
                            <span className="stat-value">{notStarted}</span>
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <h3>По категориям</h3>
                    <div className="category-stats">
                        {Object.entries(categoryStats).map(([category, count]) => (
                            <div key={category} className="stat-item">
                                <span className="stat-label">{category}:</span>
                                <span className="stat-value">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stats;
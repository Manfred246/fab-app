import './ProgressHeader.css';

function ProgressHeader({ technologies }) {
    const total = technologies.length;
    const completed = technologies.filter(tech => tech.status === 'completed').length;
    const progressPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="progress-header">
            <div className="stats">
                <div className="stat-item">
                    <span className="stat-number">{total}</span>
                    <span className="stat-label">Всего технологий</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{completed}</span>
                    <span className="stat-label">Изучено</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{progressPercentage}%</span>
                    <span className="stat-label">Прогресс</span>
                </div>
            </div>
            
            <div className="progress-bar-container">
                <div 
                    className="progress-bar"
                    style={{ width: `${progressPercentage}%` }}
                >
                    <span className="progress-text">{progressPercentage}%</span>
                </div>
            </div>
        </div>
    );
}

export default ProgressHeader;
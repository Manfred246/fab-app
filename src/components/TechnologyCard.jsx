import './TechnologyCard.css';

function TechnologyCard({ title, description, status }) {
    return (
        <div className={`technology-card ${status}`}>
            <div className="card-header">
                <h3 className="card-title">{title}</h3>
                <span className={`status-badge ${status}`}>
                    {getStatusText(status)}
                </span>
            </div>
            <p className="card-description">{description}</p>
            <div className="card-footer">
                {getStatusIcon(status)}
            </div>
        </div>
    );
}

function getStatusText(status) {
    switch(status) {
        case 'completed': return 'Изучено';
        case 'in-progress': return 'В процессе';
        case 'not-started': return 'Не начато';
        default: return status;
    }
}

function getStatusIcon(status) {
    switch(status) {
        case 'completed': return '✅';
        case 'in-progress': return '⏳';
        case 'not-started': return '⭕';
        default: return '📌';
    }
}

export default TechnologyCard;
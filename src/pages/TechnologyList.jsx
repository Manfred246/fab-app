import { Link } from 'react-router-dom';
import './TechnologyList.css';

function TechnologyList({ technologies }) {
    const getStatusText = (status) => {
        switch(status) {
            case 'completed': return 'Изучено';
            case 'in-progress': return 'В процессе';
            case 'not-started': return 'Не начато';
            default: return status;
        }
    };

    return (
        <div className="page">
            <div className="technologies-grid">
                {technologies.map(tech => (
                    <div key={tech.id} className="technology-item">
                        <h3>{tech.title}</h3>
                        <p>{tech.description}</p>
                        <div className="technology-meta">
                            <span className={`status status-${tech.status}`}>
                                {getStatusText(tech.status)}
                            </span>
                            <Link to={`/technology/${tech.id}`} className="btn-link">
                                Подробнее →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {technologies.length === 0 && (
                <div className="empty-state">
                    <p>Технологий пока нет.</p>
                    <Link to="/add-technology" className="btn btn-primary">
                        Добавить первую технологию
                    </Link>
                </div>
            )}
        </div>
    );
}

export default TechnologyList;
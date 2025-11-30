import './TechnologyCard.css';

function TechnologyCard({ id, title, description, status, onStatusChange }) {
    const handleClick = () => {
        const statusOrder = ['not-started', 'in-progress', 'completed'];
        const currentIndex = statusOrder.indexOf(status);
        const nextIndex = (currentIndex + 1) % statusOrder.length;
        const nextStatus = statusOrder[nextIndex];
        
        onStatusChange(id, nextStatus);
    };

    return (
        <div 
            className={`technology-card status-${status}`}
            onClick={handleClick}
        >
            <div className="card-header">
                <h3 className="card-title">{title}</h3>
                <span className={`status-badge status-${status}`}>
                    {status === 'completed' ? 'Изучено' : 
                     status === 'in-progress' ? 'В процессе' : 'Не начато'}
                </span>
            </div>
            <p className="card-description">{description}</p>
            <div className="card-footer">
                {status === 'completed' ? '✅' : 
                 status === 'in-progress' ? '⏳' : '⭕'}
            </div>
        </div>
    );
}

export default TechnologyCard;
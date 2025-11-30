import './TechnologyCard.css';

function TechnologyCard({ id, title, description, status, notes, onStatusChange, onNotesChange }) {
    const handleClick = () => {
        const statusOrder = ['not-started', 'in-progress', 'completed'];
        const currentIndex = statusOrder.indexOf(status);
        const nextIndex = (currentIndex + 1) % statusOrder.length;
        const nextStatus = statusOrder[nextIndex];
        
        onStatusChange(id, nextStatus);
    };

    const handleNotesChange = (e) => {
        onNotesChange(id, e.target.value);
    };

    return (
        <div className={`technology-card status-${status}`}>
            <div className="card-main" onClick={handleClick}>
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
            
            {/* Компонент для заметок */}
            <div className="notes-section">
                <h4>Мои заметки:</h4>
                <textarea
                    value={notes}
                    onChange={handleNotesChange}
                    placeholder="Записывайте сюда важные моменты..."
                    rows="3"
                />
                <div className="notes-hint">
                    {notes.length > 0 ? `Заметка сохранена (${notes.length} символов)` : 'Добавьте заметку'}
                </div>
            </div>
        </div>
    );
}

export default TechnologyCard;
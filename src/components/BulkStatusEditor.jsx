import { useState, useEffect } from 'react';
import './BulkStatusEditor.css';

function BulkStatusEditor({ technologies, onStatusUpdate }) {
    const [selectedTechIds, setSelectedTechIds] = useState([]);
    const [newStatus, setNewStatus] = useState('not-started');
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
        setSelectedTechIds([]);
    }, [technologies]);

    const handleTechSelect = (techId) => {
        setSelectedTechIds(prev => 
            prev.includes(techId) 
                ? prev.filter(id => id !== techId)
                : [...prev, techId]
        );
    };

    const handleSelectAll = () => {
        if (selectedTechIds.length === technologies.length) {
            setSelectedTechIds([]);
        } else {
            setSelectedTechIds(technologies.map(tech => tech.id));
        }
    };

    const handleStatusUpdate = async () => {
        if (selectedTechIds.length === 0) return;

        setIsUpdating(true);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        onStatusUpdate(selectedTechIds, newStatus);
        setIsUpdating(false);
        setUpdateSuccess(true);
        
        setTimeout(() => {
            setUpdateSuccess(false);
            setSelectedTechIds([]);
        }, 2000);
    };

    const getStatusText = (status) => {
        switch(status) {
            case 'completed': return 'Изучено';
            case 'in-progress': return 'В процессе';
            case 'not-started': return 'Не начато';
            default: return status;
        }
    };

    return (
        <div className="bulk-status-editor">
            <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="sr-only"
            >
                {isUpdating && 'Обновление статусов...'}
                {updateSuccess && `Статусы ${selectedTechIds.length} технологий успешно обновлены!`}
            </div>

            <h2>Массовое редактирование статусов</h2>

            {updateSuccess && (
                <div className="success-message" role="alert">
                    Статусы {selectedTechIds.length} технологий успешно обновлены на "{getStatusText(newStatus)}"
                </div>
            )}

            <div className="bulk-controls">
                <div className="selection-info">
                    <span>Выбрано: {selectedTechIds.length} из {technologies.length}</span>
                    {technologies.length > 0 && (
                        <button
                            type="button"
                            onClick={handleSelectAll}
                            className="btn-select-all"
                        >
                            {selectedTechIds.length === technologies.length ? 'Снять выделение' : 'Выбрать все'}
                        </button>
                    )}
                </div>

                <div className="status-controls">
                    <label htmlFor="bulk-status">Новый статус:</label>
                    <select
                        id="bulk-status"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        aria-describedby="bulk-status-help"
                    >
                        <option value="not-started">Не начато</option>
                        <option value="in-progress">В процессе</option>
                        <option value="completed">Изучено</option>
                    </select>
                    <button
                        onClick={handleStatusUpdate}
                        disabled={selectedTechIds.length === 0 || isUpdating}
                        className="btn-update"
                        aria-busy={isUpdating}
                    >
                        {isUpdating ? 'Обновление...' : `Применить к ${selectedTechIds.length}`}
                    </button>
                </div>

                <div id="bulk-status-help" className="help-text">
                    Выберите технологии и установите для них новый статус изучения
                </div>
            </div>

            <div className="technologies-list">
                <h3>Технологии</h3>
                {technologies.length === 0 ? (
                    <p className="no-technologies">Технологий не найдено</p>
                ) : (
                    <div className="tech-grid" role="list">
                        {technologies.map(tech => (
                            <div 
                                key={tech.id} 
                                className={`tech-item ${selectedTechIds.includes(tech.id) ? 'selected' : ''}`}
                                role="listitem"
                            >
                                <input
                                    type="checkbox"
                                    id={`tech-${tech.id}`}
                                    checked={selectedTechIds.includes(tech.id)}
                                    onChange={() => handleTechSelect(tech.id)}
                                    className="tech-checkbox"
                                />
                                <label 
                                    htmlFor={`tech-${tech.id}`}
                                    className="tech-label"
                                >
                                    <span className="tech-title">{tech.title}</span>
                                    <span className={`tech-status status-${tech.status}`}>
                                        {getStatusText(tech.status)}
                                    </span>
                                </label>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default BulkStatusEditor;
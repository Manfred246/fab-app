import { useState } from 'react';
import { FormControlLabel, Switch } from '@mui/material';
import './Settings.css';

function Settings({ darkMode, onToggleTheme }) {
    const [settings, setSettings] = useState({
        theme: 'light',
        notifications: true,
        autoSave: true
    });
    const [status, setStatus] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const exportToJSON = () => {
        try {
            const saved = localStorage.getItem('technologies');
            if (!saved) {
                setStatus('Нет данных для экспорта');
                setTimeout(() => setStatus(''), 3000);
                return;
            }

            const technologies = JSON.parse(saved);
            const dataStr = JSON.stringify(technologies, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `technologies_${new Date().toISOString().split('T')[0]}.json`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(url);
            setStatus(`Данные экспортированы (${technologies.length} технологий)`);
            setTimeout(() => setStatus(''), 3000);
        } catch (error) {
            setStatus('Ошибка экспорта данных');
            console.error('Ошибка экспорта:', error);
            setTimeout(() => setStatus(''), 3000);
        }
    };

    const importFromJSON = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                if (!Array.isArray(imported)) {
                    throw new Error('Неверный формат данных');
                }

                const isValid = imported.every(item => 
                    item && 
                    typeof item.title === 'string' && 
                    typeof item.category === 'string' &&
                    typeof item.status === 'string'
                );

                if (!isValid) {
                    throw new Error('Некорректная структура данных');
                }

                localStorage.setItem('technologies', JSON.stringify(imported));
                setStatus(`Успешно импортировано ${imported.length} технологий`);
                setTimeout(() => {
                    setStatus('');
                    window.location.reload();
                }, 2000);

            } catch (error) {
                setStatus('Ошибка импорта: неверный формат файла');
                console.error('Ошибка импорта:', error);
                setTimeout(() => setStatus(''), 3000);
            }
        };
        reader.readAsText(file);
        event.target.value = '';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/json') {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const imported = JSON.parse(event.target.result);
                    if (Array.isArray(imported)) {
                        const isValid = imported.every(item => 
                            item && 
                            typeof item.title === 'string' && 
                            typeof item.category === 'string'
                        );
                        if (isValid) {
                            localStorage.setItem('technologies', JSON.stringify(imported));
                            setStatus(`Импортировано ${imported.length} технологий через Drag&Drop`);
                            setTimeout(() => {
                                setStatus('');
                                window.location.reload();
                            }, 2000);
                        } else {
                            setStatus('Ошибка: некорректная структура данных в файле');
                        }
                    }
                } catch (error) {
                    setStatus('Ошибка импорта: неверный формат файла');
                }
            };
            reader.readAsText(file);
        } else {
            setStatus('Пожалуйста, выберите JSON файл');
        }
    };

    const handleReset = () => {
        if (confirm('Вы уверены, что хотите сбросить все данные? Это действие нельзя отменить.')) {
            localStorage.removeItem('technologies');
            setStatus('Все данные сброшены');
            setTimeout(() => {
                setStatus('');
                window.location.reload();
            }, 2000);
        }
    };

    return (
        <div className="page">
            <div className="page-header">
                <h1>Настройки</h1>
            </div>

            {status && (
                <div className={`status-message ${status.includes('Ошибка') ? 'error' : 'success'}`}>
                    {status}
                </div>
            )}

            <div className="settings-grid">
                <div className="setting-section">
                    <h3>Внешний вид</h3>
                    <div className="setting-group">
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={darkMode}
                                    onChange={onToggleTheme}
                                    name="darkMode"
                                />
                            }
                            label={darkMode ? 'Тёмная тема' : 'Светлая тема'}
                        />
                    </div>
                </div>

                <div className="setting-section">
                    <h3>Уведомления</h3>
                    <div className="setting-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="notifications"
                                checked={settings.notifications}
                                onChange={handleChange}
                            />
                            Включить уведомления
                        </label>
                    </div>
                    <div className="setting-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="autoSave"
                                checked={settings.autoSave}
                                onChange={handleChange}
                            />
                            Автосохранение
                        </label>
                    </div>
                </div>

                <div className="setting-section">
                    <h3>Управление данными</h3>
                    
                    <div className="setting-group">
                        <button onClick={exportToJSON} className="btn btn-primary">
                            Экспорт в JSON
                        </button>
                        <p className="setting-description">
                            Скачайте все данные в формате JSON для резервного копирования.
                        </p>
                    </div>

                    <div className="setting-group">
                        <label className="file-input-label">
                            Импорт из JSON
                            <input
                                type="file"
                                accept=".json"
                                onChange={importFromJSON}
                                style={{ display: 'none' }}
                            />
                        </label>
                        <p className="setting-description">
                            Загрузите данные из JSON файла. Существующие данные будут заменены.
                        </p>
                    </div>

                    <div className="setting-group">
                        <div
                            className={`drop-zone ${isDragging ? 'dragging' : ''}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            📁 Или перетащите JSON-файл сюда
                        </div>
                    </div>

                    <div className="setting-group">
                        <button onClick={handleReset} className="btn btn-danger">
                            Сбросить все данные
                        </button>
                        <p className="setting-description warning">
                            ⚠️ Внимание: это действие невозможно отменить.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
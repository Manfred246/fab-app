import { useState } from 'react';
import './Settings.css';

function Settings() {
    const [settings, setSettings] = useState({
        theme: 'light',
        notifications: true,
        autoSave: true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleExport = () => {
        const data = localStorage.getItem('technologies');
        if (data) {
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'technologies-backup.json';
            a.click();
            URL.revokeObjectURL(url);
        }
    };

    const handleImport = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    localStorage.setItem('technologies', JSON.stringify(data));
                    alert('Данные успешно импортированы!');
                    window.location.reload();
                } catch (error) {
                    alert('Ошибка при импорте данных');
                }
            };
            reader.readAsText(file);
        }
    };

    const handleReset = () => {
        if (confirm('Вы уверены, что хотите сбросить все данные? Это действие нельзя отменить.')) {
            localStorage.removeItem('technologies');
            window.location.reload();
        }
    };

    return (
        <div className="page">
            <div className="page-header">
                <h1>Настройки</h1>
            </div>

            <div className="settings-grid">
                <div className="setting-section">
                    <h3>Внешний вид</h3>
                    <div className="setting-group">
                        <label>Тема оформления</label>
                        <select
                            name="theme"
                            value={settings.theme}
                            onChange={handleChange}
                        >
                            <option value="light">Светлая</option>
                            <option value="dark">Темная</option>
                            <option value="auto">Авто</option>
                        </select>
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
                        <button onClick={handleExport} className="btn btn-primary">
                            Экспорт данных
                        </button>
                    </div>
                    <div className="setting-group">
                        <label className="file-input-label">
                            Импорт данных
                            <input
                                type="file"
                                accept=".json"
                                onChange={handleImport}
                                style={{ display: 'none' }}
                            />
                        </label>
                    </div>
                    <div className="setting-group">
                        <button onClick={handleReset} className="btn btn-danger">
                            Сбросить все данные
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
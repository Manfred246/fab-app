import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTechnology.css';

function AddTechnology() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'frontend'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const saved = localStorage.getItem('technologies');
        const technologies = saved ? JSON.parse(saved) : [];
        
        const newTechnology = {
            id: Date.now(),
            title: formData.title,
            description: formData.description,
            category: formData.category,
            status: 'not-started',
            notes: ''
        };

        technologies.push(newTechnology);
        localStorage.setItem('technologies', JSON.stringify(technologies));
        
        navigate('/technologies');
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="page">
            <div className="page-header">
                <h1>Добавить технологию</h1>
            </div>

            <form onSubmit={handleSubmit} className="technology-form">
                <div className="form-group">
                    <label>Название технологии</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Описание</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Категория</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="frontend">Фронтенд</option>
                        <option value="backend">Бэкенд</option>
                        <option value="database">Базы данных</option>
                        <option value="tools">Инструменты</option>
                    </select>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                        Добавить технологию
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={() => navigate('/technologies')}
                    >
                        Отмена
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddTechnology;
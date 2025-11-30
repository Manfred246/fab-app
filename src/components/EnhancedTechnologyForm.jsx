import { useState, useEffect } from 'react';
import './EnhancedTechnologyForm.css';

function EnhancedTechnologyForm({ onSave, onCancel, initialData = {} }) {
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || 'frontend',
        difficulty: initialData.difficulty || 'beginner',
        deadline: initialData.deadline || ''
    });

    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [isTouched, setIsTouched] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Название технологии обязательно';
        } else if (formData.title.trim().length < 2) {
            newErrors.title = 'Название должно содержать минимум 2 символа';
        } else if (formData.title.trim().length > 50) {
            newErrors.title = 'Название не должно превышать 50 символов';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Описание технологии обязательно';
        } else if (formData.description.trim().length < 10) {
            newErrors.description = 'Описание должно содержать минимум 10 символов';
        }

        if (formData.deadline) {
            const deadlineDate = new Date(formData.deadline);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (deadlineDate < today) {
                newErrors.deadline = 'Дедлайн не может быть в прошлом';
            }
        }

        setErrors(newErrors);
        setIsFormValid(Object.keys(newErrors).length === 0);
    };

    useEffect(() => {
        if (isTouched) {
            validateForm();
        }
    }, [formData, isTouched]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isTouched) {
            setIsTouched(true);
            validateForm();
            return;
        }
        
        if (isFormValid) {
            setIsSubmitting(true);
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            onSave(formData);
            setIsSubmitting(false);
            setSubmitSuccess(true);
            
            setTimeout(() => {
                setSubmitSuccess(false);
            }, 3000);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="enhanced-technology-form" noValidate>
            <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="sr-only"
            >
                {isSubmitting && 'Отправка формы...'}
                {submitSuccess && 'Форма успешно отправлена!'}
            </div>

            <h2>{initialData.title ? 'Редактирование технологии' : 'Добавление новой технологии'}</h2>

            {submitSuccess && (
                <div className="success-message" role="alert">
                    Технология успешно сохранена!
                </div>
            )}

            <div className="form-group">
                <label htmlFor="title" className="required">
                    Название технологии
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    className={errors.title ? 'error' : ''}
                    placeholder="Например: React, Node.js, TypeScript"
                    aria-required="true"
                    aria-invalid={!!errors.title}
                    aria-describedby={errors.title ? 'title-error' : undefined}
                    required
                />
                {errors.title && isTouched && (
                    <span id="title-error" className="error-message" role="alert">
                        {errors.title}
                    </span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="description" className="required">
                    Описание
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className={errors.description ? 'error' : ''}
                    placeholder="Опишите, что это за технология и зачем её изучать..."
                    aria-required="true"
                    aria-invalid={!!errors.description}
                    aria-describedby={errors.description ? 'description-error' : undefined}
                    required
                />
                {errors.description && isTouched && (
                    <span id="description-error" className="error-message" role="alert">
                        {errors.description}
                    </span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="category">Категория</label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="database">База данных</option>
                    <option value="devops">DevOps</option>
                    <option value="other">Другое</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="difficulty">Сложность</label>
                <select
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                >
                    <option value="beginner">Начальный</option>
                    <option value="intermediate">Средний</option>
                    <option value="advanced">Продвинутый</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="deadline">Дедлайн изучения</label>
                <input
                    id="deadline"
                    name="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={handleChange}
                    className={errors.deadline ? 'error' : ''}
                    aria-invalid={!!errors.deadline}
                    aria-describedby={errors.deadline ? 'deadline-error' : undefined}
                />
                {errors.deadline && isTouched && (
                    <span id="deadline-error" className="error-message" role="alert">
                        {errors.deadline}
                    </span>
                )}
            </div>

            <div className="form-actions">
                <button
                    type="submit"
                    className="btn-primary"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                >
                    {isSubmitting ? 'Сохранение...' : 'Сохранить'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="btn-secondary"
                >
                    Отмена
                </button>
            </div>
        </form>
    );
}

export default EnhancedTechnologyForm;
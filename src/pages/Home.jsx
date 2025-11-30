import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import './Home.css';

function Home() {
    const showTestNotifications = () => {
        if (window.showNotification) {
            window.showNotification('Успешное действие выполнено!', 'success');
            setTimeout(() => {
                window.showNotification('Внимание: требуется ваше действие', 'warning');
            }, 2000);
            setTimeout(() => {
                window.showNotification('Произошла ошибка при загрузке', 'error');
            }, 4000);
            setTimeout(() => {
                window.showNotification('Новая функция доступна', 'info');
            }, 6000);
        }
    };

    return (
        <div className="page">
            <div className="hero-section">
                <h1>Добро пожаловать в Трекер технологий</h1>
                <p>Отслеживайте ваш прогресс в изучении современных технологий</p>
                <div className="hero-actions">
                    <Link to="/technologies" className="btn btn-primary">
                        Посмотреть технологии
                    </Link>
                    <Link to="/add-technology" className="btn btn-secondary">
                        Добавить технологию
                    </Link>
                    <Button 
                        variant="outlined" 
                        onClick={showTestNotifications}
                        sx={{ color: 'white', borderColor: 'white' }}
                    >
                        Тест уведомлений
                    </Button>
                </div>
            </div>

            <div className="features">
                <h2>Возможности трекера</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3>Отслеживание прогресса</h3>
                        <p>Следите за вашим прогрессом в изучении каждой технологии</p>
                    </div>
                    <div className="feature-card">
                        <h3>Заметки</h3>
                        <p>Добавляйте заметки к каждой технологии для лучшего запоминания</p>
                    </div>
                    <div className="feature-card">
                        <h3>Статистика</h3>
                        <p>Анализируйте ваш общий прогресс и достижения</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
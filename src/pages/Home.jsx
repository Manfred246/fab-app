import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
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
                </div>
            </div>

            <div className="features">
                <h2>Возможности трекера</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3>📊 Отслеживание прогресса</h3>
                        <p>Следите за вашим прогрессом в изучении каждой технологии</p>
                    </div>
                    <div className="feature-card">
                        <h3>📝 Заметки</h3>
                        <p>Добавляйте заметки к каждой технологии для лучшего запоминания</p>
                    </div>
                    <div className="feature-card">
                        <h3>📈 Статистика</h3>
                        <p>Анализируйте ваш общий прогресс и достижения</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
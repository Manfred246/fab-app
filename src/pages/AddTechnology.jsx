import { useNavigate } from 'react-router-dom';
import useTechnologiesApi from '../hooks/useTechnologiesApi';
import EnhancedTechnologyForm from '../components/EnhancedTechnologyForm';
import './AddTechnology.css';

function AddTechnology() {
    const navigate = useNavigate();
    const { addTechnology } = useTechnologiesApi();

    const handleSave = async (techData) => {
        try {
            await addTechnology(techData);
            navigate('/technologies');
        } catch (error) {
            console.error('Ошибка при сохранении технологии:', error);
        }
    };

    const handleCancel = () => {
        navigate('/technologies');
    };

    return (
        <div className="page">
            <div className="page-header">
                <h1>Добавить технологию</h1>
            </div>
            
            <EnhancedTechnologyForm 
                onSave={handleSave}
                onCancel={handleCancel}
            />
        </div>
    );
}

export default AddTechnology;
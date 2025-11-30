import { useState, useEffect } from 'react';

function useTechnologiesApi() {
    const [technologies, setTechnologies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTechnologies = () => {
        try {
            setLoading(true);
            setError(null);
            
            const saved = localStorage.getItem('technologies');
            if (saved) {
                const technologiesData = JSON.parse(saved);
                setTechnologies(technologiesData);
            } else {
                const mockTechnologies = [
                    {
                        id: 1,
                        title: 'React',
                        description: 'Библиотека для создания пользовательских интерфейсов',
                        category: 'frontend',
                        difficulty: 'beginner',
                        resources: ['https://react.dev', 'https://ru.reactjs.org'],
                        status: 'not-started',
                        notes: ''
                    },
                    {
                        id: 2,
                        title: 'Node.js',
                        description: 'Среда выполнения JavaScript на сервере',
                        category: 'backend',
                        difficulty: 'intermediate',
                        resources: ['https://nodejs.org', 'https://nodejs.org/ru/docs/'],
                        status: 'not-started',
                        notes: ''
                    },
                    {
                        id: 3,
                        title: 'Typescript',
                        description: 'Типизированное надмножество JavaScript',
                        category: 'language',
                        difficulty: 'intermediate',
                        resources: ['https://www.typescriptlang.org'],
                        status: 'not-started',
                        notes: ''
                    }
                ];
                setTechnologies(mockTechnologies);
                localStorage.setItem('technologies', JSON.stringify(mockTechnologies));
            }

        } catch (err) {
            setError('Не удалось загрузить технологии');
            console.error('Ошибка загрузки:', err);
        } finally {
            setLoading(false);
        }
    };

    const addTechnology = async (techData) => {
        try {
            const newTech = {
                id: Date.now(),
                ...techData,
                status: 'not-started',
                notes: '',
                createdAt: new Date().toISOString()
            };

            const updatedTechnologies = [...technologies, newTech];
            setTechnologies(updatedTechnologies);
            localStorage.setItem('technologies', JSON.stringify(updatedTechnologies));
            
            return newTech;

        } catch (err) {
            throw new Error('Не удалось добавить технологию');
        }
    };

    const updateStatus = (techId, newStatus) => {
        const updatedTechnologies = technologies.map(tech =>
            tech.id === techId ? { ...tech, status: newStatus } : tech
        );
        setTechnologies(updatedTechnologies);
        localStorage.setItem('technologies', JSON.stringify(updatedTechnologies));
    };

    const updateMultipleStatuses = (techIds, newStatus) => {
        const updatedTechnologies = technologies.map(tech =>
            techIds.includes(tech.id) ? { ...tech, status: newStatus } : tech
        );
        setTechnologies(updatedTechnologies);
        localStorage.setItem('technologies', JSON.stringify(updatedTechnologies));
    };

    const updateNotes = (techId, newNotes) => {
        const updatedTechnologies = technologies.map(tech =>
            tech.id === techId ? { ...tech, notes: newNotes } : tech
        );
        setTechnologies(updatedTechnologies);
        localStorage.setItem('technologies', JSON.stringify(updatedTechnologies));
    };

    const deleteTechnology = (techId) => {
        const updatedTechnologies = technologies.filter(tech => tech.id !== techId);
        setTechnologies(updatedTechnologies);
        localStorage.setItem('technologies', JSON.stringify(updatedTechnologies));
    };

    useEffect(() => {
        fetchTechnologies();
    }, []);

    return {
        technologies,
        loading,
        error,
        refetch: fetchTechnologies,
        addTechnology,
        updateStatus,
        updateMultipleStatuses,
        updateNotes,
        deleteTechnology
    };
}

export default useTechnologiesApi;
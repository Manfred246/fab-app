import { useState, useEffect, useRef } from 'react';
import './TechnologySearch.css';

function TechnologySearch({ technologies, onTechnologySelect }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const searchTimeoutRef = useRef(null);

    const searchTechnologies = (query) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        setLoading(true);
        
        setTimeout(() => {
            const filtered = technologies.filter(tech =>
                tech.title.toLowerCase().includes(query.toLowerCase()) ||
                tech.description.toLowerCase().includes(query.toLowerCase()) ||
                tech.category.toLowerCase().includes(query.toLowerCase())
            );
            
            setSearchResults(filtered);
            setLoading(false);
        }, 300);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
            searchTechnologies(value);
        }, 500);
    };

    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="technology-search">
            <h3>Поиск технологий</h3>
            
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Введите название технологии..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                {loading && <span className="search-loading">⏳</span>}
            </div>

            {searchResults.length > 0 && (
                <div className="search-results">
                    <h4>Найдено технологий: {searchResults.length}</h4>
                    <div className="results-list">
                        {searchResults.map(tech => (
                            <div 
                                key={tech.id} 
                                className="result-item"
                                onClick={() => onTechnologySelect && onTechnologySelect(tech)}
                            >
                                <h5>{tech.title}</h5>
                                <p>{tech.description}</p>
                                <span className="tech-category">{tech.category}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {searchTerm.trim() && !loading && searchResults.length === 0 && (
                <p className="no-results">Технологии не найдены</p>
            )}
        </div>
    );
}

export default TechnologySearch;
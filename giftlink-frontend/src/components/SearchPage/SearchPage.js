// SearchPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { urlConfig } from '../../config';
import './SearchPage.css';

function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [ageRange, setAgeRange] = useState(6);
    const [searchResults, setSearchResults] = useState([]);

    const categories = ['Living', 'Bedroom', 'Bathroom', 'Kitchen', 'Office'];
    const conditions = ['New', 'Like New', 'Older'];

    const navigate = useNavigate();

    useEffect(() => {
        // fetch all products initially
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${urlConfig.backendUrl}/api/gifts`);
                if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.error('Fetch error: ' + error.message);
            }
        };
        fetchProducts();
    }, []);

    const handleSearch = async () => {
        const baseUrl = `${urlConfig.backendUrl}/api/search?`;
        const queryParams = new URLSearchParams({
            name: searchQuery,
            age_years: ageRange,
            category: document.getElementById('categorySelect').value,
            condition: document.getElementById('conditionSelect').value,
        }).toString();

        try {
            const response = await fetch(`${baseUrl}${queryParams}`);
            if (!response.ok) throw new Error('Search failed');
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Failed to fetch search results:', error);
        }
    };

    const goToDetailsPage = (productId) => {
        navigate(`/app/product/${productId}`);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="filter-section mb-3 p-3 border rounded">
                        <h5>Filters</h5>
                        <div className="d-flex flex-column">
                            <label htmlFor="categorySelect">Category</label>
                            <select id="categorySelect" className="dropdown-filter">
                                <option value="">All</option>
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>

                            <label htmlFor="conditionSelect">Condition</label>
                            <select id="conditionSelect" className="dropdown-filter">
                                <option value="">All</option>
                                {conditions.map(cond => <option key={cond} value={cond}>{cond}</option>)}
                            </select>

                            <label htmlFor="ageRange">Less than {ageRange} years</label>
                            <input
                                type="range"
                                id="ageRange"
                                className="age-range-slider"
                                min="1"
                                max="10"
                                value={ageRange}
                                onChange={e => setAgeRange(e.target.value)}
                            />
                        </div>

                        <div className="mt-3 d-flex">
                            <input
                                type="text"
                                className="search-input form-control"
                                placeholder="Search gifts..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                            <button className="search-button btn" onClick={handleSearch}>
                                Search
                            </button>
                        </div>
                    </div>

                    <div className="search-results mt-4">
                        {searchResults.length > 0 ? (
                            searchResults.map(product => (
                                <div key={product.id} className="search-results-card card mb-3">
                                    {product.image ? (
                                        <img src={product.image} alt={product.name} className="card-img-top" />
                                    ) : (
                                        <div className="no-image-available">No Image Available</div>
                                    )}
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">{product.description.slice(0, 100)}...</p>
                                    </div>
                                    <div className="card-footer">
                                        <button onClick={() => goToDetailsPage(product.id)} className="btn btn-primary">
                                            View More
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-products-alert">
                                No products found. Please revise your filters.
                            </div>
                        )}
                    </div>
                </div>
            </div>s
        </div>
    );
}

export default SearchPage;
import React, { useState, useEffect, Suspense } from 'react';

// Mock service function for fetching articles
const getArticles = async (category, page) => {
  // Simulated API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = {
    articles: [
      { id: 1, title: 'Article 1', summary: 'Summary 1', image: 'image1.jpg' },
      { id: 2, title: 'Article 2', summary: 'Summary 2', image: 'image2.jpg' },
      { id: 3, title: 'Article 3', summary: 'Summary 3', image: 'image3.jpg' },
      { id: 4, title: 'Article 4', summary: 'Summary 4', image: 'image4.jpg' },
    ],
    categories: ['Business', 'Technology', 'Entertainment'],
  };
  return response;
};

const LoadingSpinner = () => <div>Loading...</div>;

const ErrorMessage = ({ message }) => <div>Error: {message}</div>;

const ResponsiveImage = ({ src, alt }) => <img src={src} alt={alt} loading="lazy" />;

const ArticleList = ({ articles }) => (
  <div className="ArticleList" role="list">
    {articles.map((article) => (
      <div key={article.id} className="ArticleCard" role="listitem">
        <ResponsiveImage src={article.image} alt={article.title} />
        <h2>{article.title}</h2>
        <p>{article.summary}</p>
      </div>
    ))}
  </div>
);

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory, currentPage]);

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getArticles(selectedCategory, currentPage);
      setArticles(response.articles);
      setCategories(response.categories);
    } catch (error) {
      setError('An error occurred while fetching articles.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="HomePage">
      <CategoryFilter categories={categories} onChange={handleCategoryChange} />
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <React.Fragment>
          <ArticleList articles={articles} />
          <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
        </React.Fragment>
      )}
    </div>
  );
};

const CategoryFilter = ({ categories, onChange }) => (
  <div className="CategoryFilter">
    <select onChange={(e) => onChange(e.target.value)}>
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  </div>
);

const Pagination = ({ currentPage, onPageChange }) => (
  <div className="Pagination">
    <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
      Previous
    </button>
    <span>Page {currentPage}</span>
    <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
  </div>
);

const App = () => (
  <div className="App">
    <Suspense fallback={<LoadingSpinner />}>
      <HomePage />
    </Suspense>
  </div>
);

export default App;

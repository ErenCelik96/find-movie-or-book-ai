interface CategorySelectorProps {
    onSelect: (category: 'movie' | 'book') => void;
}

function CategorySelector({ onSelect }: CategorySelectorProps) {
    return (
        <div className="category-selector">
            <button
                onClick={() => onSelect('movie')}
                className="category-button movie-button"
            >
                <span className="button-icon">🎬</span>
                Film
            </button>
            <button
                onClick={() => onSelect('book')}
                className="category-button book-button"
            >
                <span className="button-icon">📚</span>
                Kitap
            </button>
        </div>
    );
}

export default CategorySelector; 
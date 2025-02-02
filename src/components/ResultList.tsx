import { SearchResult } from '@/types';
import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import movieLoading from '../animations/movie-loading.json';
import bookLoading from '../animations/book-loading.json';

interface ResultListProps {
    results: SearchResult[];
    isLoading: boolean;
    error: Error | null;
    category: string;
}

const Lottie = dynamic(() => import('lottie-react'), { 
    ssr: false,
    loading: () => <div className="loading-spinner" />
});

function ResultList({ results, isLoading, error, category }: ResultListProps) {
    const [expandedDescriptions, setExpandedDescriptions] = useState<{ [key: number]: boolean }>({});
    const [showMoreButtons, setShowMoreButtons] = useState<{ [key: number]: boolean }>({});
    const descriptionRefs = useRef<{ [key: number]: HTMLParagraphElement | null }>({});

    useEffect(() => {
        results?.forEach((_, index) => {
            const element = descriptionRefs.current[index];
            if (element) {
                setShowMoreButtons(prev => ({
                    ...prev,
                    [index]: element.scrollHeight > 96
                }));
            }
        });
    }, [results]);

    const handleCardClick = (title: string) => {
        const searchQuery = encodeURIComponent(title);
        const googleUrl = `https://www.google.com/search?q=${searchQuery}`;

        window.open(googleUrl, '_blank');
    };

    const toggleDescription = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        setExpandedDescriptions(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    if (isLoading) {
        return (
            <div className="loading-overlay">
                <div className="loading-animation">
                    <Lottie
                        animationData={category === 'movie' ? movieLoading : bookLoading}
                        loop={true}
                        style={{ width: 200, height: 200 }}
                    />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error-message">
                    {error instanceof Error ? error.message : 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.'}
                </div>
            </div>
        );
    }

    if (results === undefined) {
        return null;
    }

    if (results?.length === 0) {
        return (
            <div className="error-container">
                <div className="error-message">
                    Sonuç bulunamadı.
                </div>
            </div>
        );
    }
    return (
        <div className="result-list">
            {results?.map((result, index) => (
                <div
                    key={index}
                    className="result-card"
                    onClick={() => handleCardClick(result.title)}
                >
                    <div className="poster-container">
                        {'posterPath' in result ? (
                            result.posterPath ? (
                                <img
                                    src={result.posterPath}
                                    alt={result.title}
                                    className="poster-image"
                                />
                            ) : (
                                <div className="no-poster">📚</div>
                            )
                        ) : 'coverPath' in result ? (
                            result.coverPath ? (
                                <img
                                    src={result.coverPath}
                                    alt={result.title}
                                    className="poster-image"
                                />
                            ) : (
                                <div className="no-poster">📚</div>
                            )
                        ) : (
                            <div className="no-poster">🎬</div>
                        )}
                    </div>
                    <div className="result-content">
                        <h3 className="result-title">
                            {result.title}
                            {result.year && ` (${result.year})`}
                        </h3>
                        {'rating' in result && result.rating && (
                            <div className="rating">
                                ⭐ {result.rating.toFixed(1)}
                                {result.ratingCount && ` (${result.ratingCount} oy)`}
                            </div>
                        )}
                        <div className="description-container">
                            <p
                                ref={(el: HTMLParagraphElement | null) => {
                                    descriptionRefs.current[index] = el;
                                }}
                                className={`result-description ${!expandedDescriptions[index] ? 'clamp-4' : ''}`}
                            >
                                {result.description}
                            </p>
                            {showMoreButtons[index] && (
                                <button
                                    className="toggle-description"
                                    onClick={(e) => toggleDescription(e, index)}
                                >
                                    {expandedDescriptions[index] ? 'Daha az göster' : 'Devamını göster'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ResultList; 
import { useQuery } from '@tanstack/react-query';
import { getAISuggestions } from '../services/geminiService';
import { searchMovies } from '../services/tmdbService';
import { searchBooks } from '../services/googleBooksService';
import { Movie, Book } from '@/types';

export function useAISearch(category: string, query: string | Record<string, string>) {
    const shouldSearch = Boolean(
        category &&
        query &&
        (typeof query === 'string'
            ? query.trim() !== ''
            : Object.values(query).some(val => val?.trim?.() !== '')
        )
    );

    const aiQuery = useQuery({
        queryKey: ['ai-suggestions', category, query],
        queryFn: async () => {
            try {
                const data = await getAISuggestions(category, query);

                if (!data || Object.keys(data).length === 0) {
                    throw new Error('AI servisi şu anda kullanılamıyor');
                }

                if ((category === 'movie' && (!data.movies || data.movies.length === 0)) ||
                    (category === 'book' && (!data.books || data.books.length === 0))) {
                    throw new Error('Sonuç bulunamadı');
                }

                return data;
            } catch (error) {
                if (error instanceof Error) {
                    throw error;
                }
                throw new Error('AI servisi şu anda kullanılamıyor');
            }
        },
        enabled: !!category && !!query,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });

    const movieQuery = useQuery({
        queryKey: ['movie-details', aiQuery.data],
        queryFn: async () => {
            if (category !== 'movie') return null;
            const movies = aiQuery.data?.movies || [];

            try {
                const moviePromises = movies.map(async (movie: Movie) => {
                    try {
                        const results = await searchMovies(movie.title);
                        return results[0] || {
                            ...movie,
                            isAIResult: true,
                            posterPath: null,
                            rating: null,
                            voteCount: null
                        };
                    } catch {
                        return {
                            ...movie,
                            isAIResult: true,
                            posterPath: null,
                            rating: null,
                            voteCount: null
                        };
                    }
                });

                return Promise.all(moviePromises);
            } catch {
                return movies.map((movie: Movie) => ({
                    ...movie,
                    isAIResult: true,
                    posterPath: null,
                    rating: null,
                    voteCount: null
                }));
            }
        },
        enabled: !!aiQuery.data?.movies && category === 'movie' && shouldSearch,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });

    const bookQuery = useQuery({
        queryKey: ['book-details', aiQuery.data],
        queryFn: async () => {
            if (category !== 'book') return null;
            const books = aiQuery.data?.books || [];

            try {
                const bookPromises = books.map(async (book: Book) => {
                    try {
                        const googleBook = await searchBooks(book.title);
                        return googleBook ? {
                            ...book,
                            ...googleBook,
                            isAIResult: false
                        } : {
                            ...book,
                            isAIResult: true,
                            coverPath: null,
                            rating: null,
                            ratingCount: null
                        };
                    } catch {
                        return {
                            ...book,
                            isAIResult: true,
                            coverPath: null,
                            rating: null,
                            ratingCount: null
                        };
                    }
                });

                return Promise.all(bookPromises);
            } catch {
                return books.map((book: Book) => ({
                    ...book,
                    isAIResult: true,
                    coverPath: null,
                    rating: null,
                    ratingCount: null
                }));
            }
        },
        enabled: !!aiQuery.data?.books && category === 'book',
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });

    if (!shouldSearch) {
        return {
            data: null,
            isLoading: false,
            error: null
        };
    }

    if (category === 'movie' && movieQuery.data) {
        return {
            ...aiQuery,
            data: { movies: movieQuery.data }
        };
    }

    if (category === 'book' && bookQuery.data) {
        return {
            ...aiQuery,
            data: { books: bookQuery.data }
        };
    }

    return aiQuery;
} 
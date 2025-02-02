const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w185';

interface TMDBMovie {
    title: string;
    release_date?: string;
    overview: string;
    poster_path: string | null;
    vote_average: number;
    vote_count: number;
}

export async function searchMovies(query: string) {
    try {
        const response = await fetch(
            `/api/movies/search?query=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
            throw new Error('Film arama hatası');
        }

        const data = await response.json();

        return data.results.map((movie: TMDBMovie) => ({
            title: movie.title,
            year: movie.release_date?.split('-')[0] || '',
            description: movie.overview || 'Açıklama bulunmuyor.',
            posterPath: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null,
            rating: movie.vote_average,
            voteCount: movie.vote_count
        }));
    } catch (error) {
        console.error('TMDB Error:', error);
        throw new Error('Film arama servisi şu anda kullanılamıyor');
    }
} 
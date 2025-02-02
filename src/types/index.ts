export interface Movie {
    title: string;
    year?: string;
    description: string;
    posterPath?: string | null;
    rating?: number | null;
    voteCount?: number | null;
    isAIResult?: boolean;
    type?: 'movie';
    ratingCount?: number | null;
}

export interface GoogleBookImageLinks {
    smallThumbnail?: string;
    thumbnail?: string;
}

export interface GoogleBookVolumeInfo {
    title: string;
    authors?: string[];
    publishedDate?: string;
    description?: string;
    pageCount?: number;
    imageLinks?: GoogleBookImageLinks;
    averageRating?: number;
    ratingsCount?: number;
}

export interface GoogleBookResponse {
    items?: {
        volumeInfo: GoogleBookVolumeInfo;
    }[];
}

export interface Book {
    title: string;
    author: string;
    year?: string;
    description: string;
    coverPath?: string | null;
    pageCount?: number | null;
    rating?: number | null;
    ratingCount?: number | null;
    isAIResult?: boolean;
    type?: 'book';
}

export type SearchResult = Movie | Book;
import { GoogleBookResponse, Book } from '@/types';

export const searchBooks = async (title: string): Promise<Book | null> => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}&maxResults=1`
    );

    if (!response.ok) return null;

    const data: GoogleBookResponse = await response.json();
    
    if (data.items?.[0]?.volumeInfo) {
      const bookInfo = data.items[0].volumeInfo;
      return {
        title: bookInfo.title || '',
        author: bookInfo.authors?.join(', ') || 'Bilinmiyor',
        description: bookInfo.description || '',
        coverPath: bookInfo.imageLinks?.thumbnail || null,
        year: bookInfo.publishedDate?.substring(0, 4) || undefined,
        pageCount: bookInfo.pageCount || null,
        rating: bookInfo.averageRating || null,
        ratingCount: bookInfo.ratingsCount || null,
        isAIResult: false
      };
    }
    
    return null;
  } catch (error) {
    console.error('Google Books API error:', error);
    return null;
  }
}; 
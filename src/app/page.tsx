'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CategorySelector from '@/components/CategorySelector'
import MovieSearchForm from '@/components/MovieSearchForm'
import ResultList from '@/components/ResultList'
import { useAISearch } from '@/hooks/useAISearch'
import BookSearchForm from '@/components/BookSearchForm'

function SearchContainer() {
    const [category, setCategory] = useState<'movie' | 'book' | null>(null)
    const [searchQuery, setSearchQuery] = useState<string | Record<string, string>>('')

    const { data = null, isLoading, error } = useAISearch(
        category || '',
        searchQuery
    )

    const getBackgroundClass = () => {
        if (!category) return 'bg-initial'
        return `bg-${category}`
    }

    const handleCategorySelect = (selectedCategory: 'movie' | 'book') => {
        setCategory(selectedCategory)
        setSearchQuery('')
    }

    const handleSearch = (query: string | Record<string, string>) => {
        setSearchQuery(query)
    }

    return (
        <div className={`app-container ${getBackgroundClass()}`}>
            <div className="content-wrapper">
                <h1 className="app-title">
                    {!category ? 'Film veya Kitap Keşfet' : category === 'movie' ? 'Film Keşfet' : 'Kitap Keşfet'}
                </h1>
                <CategorySelector onSelect={handleCategorySelect} />
                {category && (
                    <>
                        {category === 'movie' ? (
                            <MovieSearchForm onSearch={handleSearch} />
                        ) : (
                            <BookSearchForm onSearch={handleSearch as (query: string) => void} />
                        )}
                        <ResultList
                            results={category === 'movie' ? data?.movies || null : data?.books || null}
                            isLoading={isLoading}
                            error={error as Error | null}
                            category={category}
                        />
                    </>
                )}
            </div>
        </div>
    )
}

export default function Home() {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <SearchContainer />
        </QueryClientProvider>
    )
} 
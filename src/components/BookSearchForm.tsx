import { useState } from 'react';

interface BookSearchFormProps {
    onSearch: (query: string) => void;
}

interface BookSearchFields {
    plot: string;
    genre: string;
    characters: string;
    author: string;
    extra: string;
}

function BookSearchForm({ onSearch }: BookSearchFormProps) {
    const [activeField, setActiveField] = useState<keyof BookSearchFields>('plot');
    const [searchFields, setSearchFields] = useState<BookSearchFields>({
        plot: '',
        genre: '',
        characters: '',
        author: '',
        extra: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const queryParts: string[] = [];

        if (searchFields.plot) queryParts.push(`Konu/Olay Örgüsü: ${searchFields.plot}`);
        if (searchFields.genre) queryParts.push(`Tür: ${searchFields.genre}`);
        if (searchFields.characters) queryParts.push(`Karakterler: ${searchFields.characters}`);
        if (searchFields.author) queryParts.push(`Yazar: ${searchFields.author}`);
        if (searchFields.extra) queryParts.push(`Ek Detaylar: ${searchFields.extra}`);

        const combinedQuery = queryParts.join('\n');
        if (combinedQuery.trim()) {
            onSearch(combinedQuery);
        }
    };

    const handleChange = (field: keyof BookSearchFields) => (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setSearchFields(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const fields = [
        { key: 'plot' as const, label: 'Konu/Olay Örgüsü', placeholder: 'Kitabın konusu veya olay örgüsü...' },
        { key: 'genre' as const, label: 'Tür', placeholder: 'Kitabın türü (örn: roman, bilim kurgu, fantastik, polisiye...)' },
        { key: 'characters' as const, label: 'Karakterler', placeholder: 'Önemli karakterler ve özellikleri...' },
        { key: 'author' as const, label: 'Yazar', placeholder: 'Yazarın adı...' },
        { key: 'extra' as const, label: 'Ek Detaylar', placeholder: 'Hatırladığınız diğer detaylar (kapak tasarımı, yayın yılı vb.)' }
    ];

    const isFormValid = Object.values(searchFields).some(value => value.trim() !== '');

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit} className="search-form">
                <div className="search-tabs">
                    {fields.map(field => (
                        <button
                            key={field.key}
                            type="button"
                            className={`search-tab ${activeField === field.key ? 'active' : ''}`}
                            onClick={() => setActiveField(field.key)}
                        >
                            {field.label}
                        </button>
                    ))}
                </div>
                <div className="search-input-container">
                    {fields.map(field => (
                        <div
                            key={field.key}
                            className={`search-field ${activeField === field.key ? 'active' : ''}`}
                            style={{ display: activeField === field.key ? 'block' : 'none' }}
                        >
                            <textarea
                                className="search-input"
                                value={searchFields[field.key]}
                                onChange={handleChange(field.key)}
                                placeholder={field.placeholder}
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="search-button"
                        disabled={!isFormValid}
                    >
                        Kitap Ara
                    </button>
                </div>
            </form>
        </div>
    );
}

export default BookSearchForm; 
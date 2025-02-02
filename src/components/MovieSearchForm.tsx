import { useState } from 'react';

interface MovieSearchFormProps {
    onSearch: (formData: Record<string, string>) => void;
}

interface FormData {
    plot: string;
    genre: string;
    setting: string;
    actors: string;
    extra: string;
}

function MovieSearchForm({ onSearch }: MovieSearchFormProps) {
    const [formData, setFormData] = useState<FormData>({
        plot: '',
        genre: '',
        setting: '',
        actors: '',
        extra: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const filledFields = Object.entries(formData)
            .filter(([, value]) => value.trim() !== '')
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
        onSearch(filledFields);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="movie-search-form">
            <div className="form-group full-width">
                <label htmlFor="plot">Film Konusu</label>
                <textarea
                    id="plot"
                    name="plot"
                    value={formData.plot}
                    onChange={handleChange}
                    placeholder="Filmin konusu, önemli sahneler veya olay örgüsü..."
                    rows={3}
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="genre">Tür</label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        placeholder="Komedi, Dram, Aksiyon vb."
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="setting">Mekan/Zaman</label>
                    <input
                        type="text"
                        id="setting"
                        name="setting"
                        value={formData.setting}
                        onChange={handleChange}
                        placeholder="Filmin geçtiği yer ve/veya zaman..."
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="actors">Oyuncular</label>
                    <input
                        type="text"
                        id="actors"
                        name="actors"
                        value={formData.actors}
                        onChange={handleChange}
                        placeholder="Hatırladığınız oyuncular..."
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="extra">Ek Bilgiler</label>
                    <input
                        type="text"
                        id="extra"
                        name="extra"
                        value={formData.extra}
                        onChange={handleChange}
                        placeholder="Aklınıza gelen diğer detaylar..."
                    />
                </div>
            </div>

            <div className="search-button-container">
                <button type="submit" className="search-button">Film Ara</button>
            </div>
        </form>
    );
}

export default MovieSearchForm; 
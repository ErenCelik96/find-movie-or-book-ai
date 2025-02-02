# AI-Powered Movie and Book Search

Bu proje, yapay zeka destekli bir film ve kitap arama motoru sunar. Google'ın Gemini AI servisi kullanılarak, kullanıcıların doğal dil ile arama yapmasına olanak tanır ve TMDB (The Movie Database) ve Google Books API'lerinden zengin içerik sağlar.

## 🚀 Özellikler

- 🤖 Gemini AI destekli doğal dil araması
- 🎬 TMDB API entegrasyonu ile detaylı film bilgileri
- 📚 Google Books API entegrasyonu ile kitap bilgileri
- 🎨 Kategoriye özel loading animasyonları
- 📱 Responsive tasarım
- ⚡ Next.js 14 ile yüksek performans
- 🔄 React Query ile etkin veri yönetimi

## 📁 Proje Yapısı
```bash
src/
├── app/
│ ├── layout.tsx
│ ├── page.tsx
│ └── api/
│     ├── ai/
│     ├── movies/
├── components/
│ ├── BookSearchForm.tsx
│ ├── MovieSearchForm.tsx
│ ├── ResultList.tsx
│ └── CategorySelector.tsx
├── hooks/
│ └── useAISearch.ts
├── services/
│ ├── geminiService.ts
│ ├── tmdbService.ts
│ └── googleBooksService.ts
├── styles/
│ └── globals.css
│ └── Home.global.css
├── types/
│ └── index.ts
└── animations/
├── movie-loading.json
└── book-loading.json
```

## 🛠️ Teknik Detaylar

### Kullanılan Teknolojiler

- **Framework**: Next.js 14
- **Dil**: TypeScript
- **Stil**: CSS
- **Fetching & Caching**: React Query
- **API'ler**: 
  - Gemini AI
  - TMDB API
  - Google Books API
- **Animasyonlar**: Lottie

### Önemli Bağımlılıklar

{
"next": "14.x",
"react": "18.x",
"typescript": "5.x",
"@tanstack/react-query": "^5.x",
"lottie-react": "^2.x",
"@google/generative-ai": "^0.21.0",
}

## 🚦 Kurulum

1. Repo'yu klonlayın:

```bash
git clone [repo-url]
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Environment değişkenlerini ayarlayın:
```env
TMDB_API_KEY=your_tmdb_api_key
GEMINI_API_KEY=your_gemini_api_key
```

4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

## 🌐 Deployment

Proje Netlify'da host edilmektedir. Environment değişkenleri Netlify dashboard üzerinden ayarlanmalıdır.

## 🔍 Kullanım

1. Kategori seçin (Film veya Kitap)
2. Arama kutusuna doğal dil ile sorgunuzu yazın
   - Örnek: "Jason Statham'ın aksiyon filmleri"
   - Örnek: "Distopik genç-yetişkin romanları"
3. Sonuçlar otomatik olarak listelenecektir

## ⚠️ Hata Yönetimi

- API hataları kullanıcı dostu mesajlar gösterilir
- Loading durumları kategoriye özel animasyonlar ile belirtilir
- Eksik görseller için fallback görüntüler kullanılır

## 🤝 Katkıda Bulunma

1. Fork'layın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit'leyin (`git commit -m 'feat: Add amazing feature'`)
4. Push'layın (`git push origin feature/amazing-feature`)
5. Pull Request açın

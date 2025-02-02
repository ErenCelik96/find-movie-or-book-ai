export const generatePrompt = (category: string, query: string | Record<string, string>) => {
  if (category === 'movie') {
    if (typeof query === 'string') {
      return `Sen deneyimli bir film eleştirmeni ve sinema veritabanı uzmanısın. 
      Kullanıcılar genellikle film sahnelerini, konusunu veya karakterlerini hatırlayıp adını hatırlayamadıkları filmleri bulmak için sana danışıyor.

      Kullanıcı Açıklaması: "${query}"

      ÖNEMLİ: Kriterlere uyan tüm filmleri listelemelisin, herhangi bir sayı sınırı olmadan.

      YANITINI BU JSON FORMATINDA VER:
      {
        "movies": [
          {
            "title": "Film Adı",
            "year": "Yapım Yılı",
            "description": "Filmin neden kriterlere uyduğunun DETAYLI açıklaması"
          }
        ]
      }`;
    }

    const {
      plot = '',
      genre = '',
      setting = '',
      actors = '',
      extra = ''
    } = query;

    return `Sen deneyimli bir film veritabanı uzmanısın. Verilen kriterlere göre film önerileri yapacaksın.

    ARAMA KRİTERLERİ:
    ${plot ? `KONU: ${plot}` : ''}
    ${genre ? `TÜR: ${genre}` : ''}
    ${setting ? `MEKAN/ZAMAN: ${setting}` : ''}
    ${actors ? `OYUNCULAR: ${actors}` : ''}
    ${extra ? `EK BİLGİLER: ${extra}` : ''}

    ARAMA TALİMATLARI:
    1. Bu kriterlere uyan TÜM filmleri listelemelisin
    2. Herhangi bir sayı sınırlaması YAPMA
    3. Sadece emin olduğun filmleri listele
    4. Her film için detaylı açıklama yaz
    5. Kriterlere uyan her filmi mutlaka dahil et

    YANITINI BU JSON FORMATINDA VER:
    {
      "movies": [
        {
          "title": "Film Adı",
          "year": "Yapım Yılı",
          "description": "Filmin neden kriterlere uyduğunun DETAYLI açıklaması"
        }
      ]
    }

    NOT: Lütfen kriterlere uyan TÜM filmleri listele. Sayı sınırı yok. Ne kadar çok uygun film varsa o kadar çok listele.`;
  }
  
  return `Sen deneyimli bir kitap eleştirmeni ve kütüphane uzmanısın.
    Kullanıcılar genellikle kitapların konusunu, karakterlerini veya temalarını hatırlayıp adını hatırlayamadıkları kitapları bulmak için sana danışıyor.

    ARAMA AÇIKLAMASI:
    ${typeof query === 'string' ? query : ''}

    ARAMA TALİMATLARI:
    1. Bu açıklamaya uyan TÜM kitapları listelemelisin
    2. Herhangi bir sayı sınırlaması YAPMA
    3. Sadece emin olduğun kitapları listele
    4. Her kitap için detaylı açıklama yaz
    5. Açıklamada kitabın neden kriterlere uyduğunu belirt

    YANITINI BU JSON FORMATINDA VER:
    {
      "books": [
        {
          "title": "Kitap Adı",
          "author": "Yazar Adı",
          "year": "Yayın Yılı (varsa)",
          "description": "Kitabın neden kriterlere uyduğunun DETAYLI açıklaması"
        }
      ]
    }

    NOT: Lütfen kriterlere uyan TÜM kitapları listele. Sayı sınırı yok.`;
};

export async function getAISuggestions(category: string, query: string | Record<string, string>) {
  try {
    const response = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category, query })
    });

    if (!response.ok) {
      console.error('AI servisi şu anda kullanılamıyor');
    }

    return response.json();
  } catch (error) {
    console.error('AI Error:', error);
  }
} 
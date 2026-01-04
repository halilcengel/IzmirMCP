# IzmirMCP — Izmir Public Transport MCP Server

[![NPM version](https://img.shields.io/npm/v/izmir-mcp.svg)](https://www.npmjs.com/package/izmir-mcp)
[![License](https://img.shields.io/npm/l/izmir-mcp.svg)](https://github.com/halilcengel/IzmirMCP/blob/main/LICENSE)

IzmirMCP, Izmir toplu tasima verilerini (IZBAN, ESHOT, Tramvay, Metro, Vapur/Izdeniz, Tren) Model Context Protocol (MCP) uzerinden sunan acik kaynakli bir TypeScript sunucusudur. AI asistanlari (Claude dahil) ve diger MCP istemcileri icin gerçek zamanli otobus konumlari, sefer saatleri ve durak bilgilerini kolayca erisilebilir hale getirir.

SEO odakli anahtar kavramlar: Izmir toplu tasima API, gerçek zamanli otobus konumu, Izmir metro saatleri, IZBAN seferleri, ESHOT duraklari, MCP server, Model Context Protocol.

---

## Neler Sunar?

- Izmir toplu tasima sistemleri icin tek noktadan MCP entegrasyonu
- Gerçek zamanli veriler: otobus konumlari ve yaklaşan seferler
- Sefer saatleri, istasyon/durak listeleri, hat aramalari
- Moduler yapi: Izban, Eshot, Metro, Tramvay, Vapur ve Tren araclari
- Node.js 18+ uyumlu, TypeScript ile gelistirilmis

---

## Desteklenen Sistemler ve Veri Tipleri

| Sistem | Sunulan Veriler |
| --- | --- |
| IZBAN | Istasyon listesi, seferler, ucret tarifesi |
| ESHOT | Durak ve hat arama, yaklasan otobusler, GPS konumlari, yakindaki duraklar |
| Tramvay | Hatlar, istasyonlar, sefer sikligi |
| Metro | Istasyonlar, sefer sikligi |
| Vapur (Izdeniz) | Iskeleler, hareket saatleri, calisma gunleri |
| Tren | Gar listesi ve konum bilgileri |

---

## Kurulum ve Hizli Baslangic

### NPM ile Calistirma (onerilen)

```bash
npx izmir-mcp
```

Alternatif olarak global kurulum:

```bash
npm install -g izmir-mcp
izmir-mcp
```

IzmirMCP, MCP stdio transport ile calisir; HTTP portu acmaz. MCP istemciniz bu sureci stdio uzerinden yonetir.

### Kaynaktan Kurulum

```bash
git clone https://github.com/halilcengel/IzmirMCP.git
cd IzmirMCP
npm install
npm run build
npm start
```

---

## MCP Istemcisi Yapilandirmasi (Claude, etc.)

```json
{
  "mcpServers": {
    "izmir-mcp": {
      "command": "npx",
      "args": ["izmir-mcp"]
    }
  }
}
```

---

## Ornek Kullanim Senaryolari

Asagidaki ornekler, bir MCP istemcisinde Izmir toplu tasima verilerini nasil sorgulayabileceginizi gosterir:

```text
ESHOT durak arama:
"Alsancak" bolgesindeki ESHOT duraklarini getir.

Hat uzerindeki otobus konumlari:
Hat 551 icin tum otobuslerin anlik GPS konumlarini getir.

Duraga yaklasan otobusler:
Durak ID 12345 icin yaklasan otobusleri listele.

IZBAN seferleri:
Aliağa (123) ile Alsancak (456) arasindaki IZBAN seferlerini getir.

Metro sefer sikligi:
Izmir metro sefer sikligini getir.

Vapur saatleri:
Karsiyaka - Alsancak arasi hafta ici vapur saatlerini getir.
```

Isterseniz, bu istemleri MCP arac cagrisina da cevirtebilirsiniz.

---

## Araclar (Tools)

### IZBAN
- `get-izban-stations` — Istasyon listesi
- `get-izban-departures` — Iki istasyon arasinda planli seferler
- `get-izban-fare-tariff` — Ucret tarifesi hesaplama

### ESHOT
- `get-eshot-stations` — Durak arama
- `get-eshot-lines` — Hat arama
- `get-line-approaching-buses` — Belirli duraga yaklasan otobusler
- `get-line-bus-locations` — Hat uzerindeki tum otobuslerin GPS konumu
- `get-station-approaching-buses` — Duraga yaklasan tum otobusler
- `get-nearby-stations-by-coords` — Koordinata gore yakindaki duraklar

### Tramvay
- `get-tram-lines` — Tum hatlar
- `get-tram-stations-by-sefer-id` — Sefer ID ile istasyonlar
- `get-tram-sefer-frequency-by-sefer-id` — Sefer sikligi

### Metro
- `get-metro-stations` — Istasyon listesi
- `get-metro-sefer-frequencies` — Sefer sikligi

### Vapur (Izdeniz)
- `get-ferry-timetables` — Kalkis/varis ve gun tipine gore hareket saatleri
- `get-ferry-timetables-by-pier` — Iskele bazli hareket saatleri
- `get-ferry-working-days` — Calisma gunleri
- `get-ferry-piers` — Iskele bilgileri

### Tren
- `get-train-stations` — Tren gar listesi

---

## Ortam Degiskenleri

| Degisken | Varsayilan | Aciklama |
| --- | --- | --- |
| `MCP_NAME` | `IzmirMCP` | MCP sunucu adi |
| `BASE_URL` | `https://openapi.izmir.bel.tr/api` | IBB OpenAPI base URL |
| `CKAN_BASE_URL` | `https://acikveri.bizizmir.com/api/3/action` | Acik veri CKAN API base URL |
| `ESHOT_HAT_RESOURCE_ID` | `bd6c84f8-49ba-4cf4-81f8-81a0fbb5caa3` | ESHOT hat verisi resource ID |
| `ESHOT_DURAK_RESOURCE_ID` | `0c791266-a2e4-4f14-82b8-9a9b102fbf94` | ESHOT durak verisi resource ID |
| `HTTP_TIMEOUT` | `10000` | HTTP istek zaman asimi (ms) |
| `MAX_RETRIES` | `3` | Yeniden deneme sayisi |

---

## Veri Kaynaklari

Veriler, Izmir Buyuksehir Belediyesi acik API ve acik veri kaynaklarindan alinmaktadir:

- https://openapi.izmir.bel.tr/api
- https://acikveri.bizizmir.com

---

## Ekran Goruntuleri

![Screenshot 2025-06-21 142156](https://github.com/user-attachments/assets/8fa2909d-7305-4a73-a95a-e0571075e15d)
![Screenshot 2025-06-21 142143](https://github.com/user-attachments/assets/17d000e7-18e9-44ac-aa21-000de072129b)
![Screenshot 2025-06-21 141825](https://github.com/user-attachments/assets/01753c47-fc4f-48b3-a9fe-e0899bf80df4)
<img width="2032" height="1161" alt="image" src="https://github.com/user-attachments/assets/4e23a9e2-8f58-4583-93e2-ef685d6fe924" />
<img width="1988" height="1117" alt="image" src="https://github.com/user-attachments/assets/4edc38c5-95a5-47e1-b996-d81918ae3c18" />

---

## Katkida Bulunma

Katkilar memnuniyetle karsilanir:

1. Depoyu fork'layin
2. Yeni bir branch acin (`git checkout -b ozellik/yenilik`)
3. Degisiklikleri commit'leyin
4. Branch'i push'layin
5. Pull Request olusturun

---

## Lisans

Bu proje [ISC Lisansi](https://github.com/halilcengel/IzmirMCP/blob/main/LICENSE) altinda lisanslanmistir.

---

## Sorumluluk Reddi

Bu proje Izmir Buyuksehir Belediyesi'nin resmi bir uygulamasi degildir. Veriler kamuya acik kaynaklardan alinmaktadir. Dogruluk ve guncellik konusunda garanti verilmez.

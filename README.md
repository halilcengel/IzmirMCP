# IzmirMCP

[![NPM version](https://img.shields.io/npm/v/izmir-mcp.svg)](https://www.npmjs.com/package/izmir-mcp)
[![License](https://img.shields.io/npm/l/izmir-mcp.svg)](https://github.com/halilcengel/IzmirMCP/blob/main/LICENSE)

İzmir Büyükşehir Belediyesi'nin İZBAN, ESHOT, Tramvay, Metro, Vapur (İzdeniz) ve Tren sistemlerinden gerçek zamanlı toplu taşıma verilerini, MCP (Model Context Protocol) tabanlı bir TypeScript sunucusu aracılığıyla yapay zeka modellerine ve diğer uygulamalara kolayca entegre etmenizi sağlayan açık kaynaklı bir araç setidir.

---

## ✨ Özellikler

*   **🚉 İZBAN**
    *   Tüm istasyonların listesini alın.
    *   Belirli istasyonlar arasındaki sefer saatlerini sorgulayın.
    *   Banliyö fiyat tarifesini sorgulayın.
*   **🚌 ESHOT**
    *   Durak ve hat adı veya numarasına göre arama yapın.
    *   Bir durağa yaklaşan otobüsleri anlık olarak takip edin.
    *   Belirli bir hattaki tüm araçların gerçek zamanlı GPS konumlarını alın.
    *   Koordinata göre yakın durakları sorgulayın.
*   **🚋 Tramvay**
    *   Tramvay hatlarını, istasyonlarını ve sefer sıklıklarını sorgulayın.
*   **🚇 Metro**
    *   Metro istasyonlarını ve sefer sıklıklarını sorgulayın.
*   **⛴️ Vapur (İzdeniz)**
    *   Vapur iskeleleri, hareket saatleri ve çalışma günlerini sorgulayın.
*   **🚂 Tren**
    *   İzmir'deki tren garlarını ve konumlarını sorgulayın.
*   **🔧 Kolay Entegrasyon**
    *   Node.js/TypeScript ile hızlı ve modern bir altyapı.
    *   Genişletilebilir ve modüler mimari.
    *   Yapay zeka (AI) ve MCP tabanlı sistemlerle (Claude vb.) doğrudan uyumlu.

---

## 🚀 Kurulum

1.  Depoyu klonlayın:

    ```bash
    git clone https://github.com/halilcengel/IzmirMCP.git
    cd IzmirMCP
    ```

2.  Bağımlılıkları yükleyin:

    ```bash
    npm install
    ```

3.  Projeyi derleyin:

    ```bash
    npm run build
    ```

---

## 🛠️ Kullanım

Sunucuyu yerel olarak başlatmak için:

```bash
npx izmir-mcp
```

Sunucu varsayılan olarak `3000` portunda çalışmaya başlayacaktır.

---

## 🤖 Claude veya Diğer MCP İstemcilerine Ekleme

`izmir-mcp` sunucusunu, Claude gibi bir MCP (Model Context Protocol) istemcisine entegre etmek için aşağıdaki gibi bir yapılandırma kullanabilirsiniz. Bu, yapay zeka modelinizin İzmir toplu taşıma verilerine doğrudan erişmesini sağlar.

```json
{
  "mcpServers": {
    "izmir-mcp": {
      "command": "npx",
      "args": [
        "izmir-mcp"
      ]
    }
  }
}
```
![Screenshot 2025-06-21 142156](https://github.com/user-attachments/assets/8fa2909d-7305-4a73-a95a-e0571075e15d)
![Screenshot 2025-06-21 142143](https://github.com/user-attachments/assets/17d000e7-18e9-44ac-aa21-000de072129b)
---
![Screenshot 2025-06-21 141825](https://github.com/user-attachments/assets/01753c47-fc4f-48b3-a9fe-e0899bf80df4)

---

## 🧰 Araçlar (Tools)

Bu proje, İZBAN, ESHOT, Tramvay, Metro, Vapur (İzdeniz) ve Tren servisleri için bir dizi araç sunar. Bu araçları kullanarak toplu taşıma verilerine programatik olarak erişebilirsiniz.

### İZBAN

```ts
import { registerIzbanTools } from 'izmir-mcp';
registerIzbanTools(server);
```

**Kullanılabilir Araçlar:**

*   `get-izban-stations` — Tüm İZBAN istasyonlarının tam listesini ID'leri ve isimleriyle birlikte döndürür.
*   `get-izban-departures` — İki İZBAN istasyonu arasındaki planlanmış seferleri listeler.
    *   `departureStationId` (string)
    *   `arrivalStationId` (string)
*   `get-izban-fare-tariff` — Banliyö fiyat tarifesini döndürür.
    *   `BinisIstasyonuId` (string)
    *   `InisIstasyonuId` (string)
    *   `Aktarma` (string)
    *   `httMi` (string)

### ESHOT

```ts
import { registerEshotTools } from 'izmir-mcp';
registerEshotTools(server);
```

**Kullanılabilir Araçlar:**

*   `get-eshot-stations` — Durak adı veya adresine göre arama yaparak eşleşen ESHOT durak kayıtlarını döndürür.
    *   `query` (string, opsiyonel)
    *   `limit` (number, opsiyonel)
*   `get-eshot-lines` — Hat numarası veya adına göre arama yaparak eşleşen ESHOT hat kayıtlarını döndürür.
    *   `query` (string, opsiyonel)
    *   `limit` (number, opsiyonel)
*   `get-line-approaching-buses` — Belirli bir hattaki otobüslerin belirli bir durağa yaklaşma durumunu gösterir.
    *   `hatNo` (string)
    *   `durakId` (string)
*   `get-line-bus-locations` — Belirli bir hattaki tüm otobüslerin gerçek zamanlı konumlarını döndürür.
    *   `hatNo` (string)
*   `get-station-approaching-buses` — Belirli bir durağa yaklaşmakta olan tüm otobüslerin gerçek zamanlı konumlarını döndürür.
    *   `durakId` (string)
*   `get-nearby-stations-by-coords` — Koordinata göre yakın ESHOT duraklarını döndürür.
    *   `x` (number)
    *   `y` (number)
    *   `inCoordSys` (string, opsiyonel)
    *   `outCoordSys` (string, opsiyonel)

### Tramvay

```ts
import { registerTramTools } from 'izmir-mcp';
registerTramTools(server);
```

**Kullanılabilir Araçlar:**

*   `get-tram-lines` — Tüm tramvay hatlarını döndürür.
*   `get-tram-stations-by-sefer-id` — Sefer numarasına göre tramvay istasyonlarını döndürür.
    *   `seferId` (string)
*   `get-tram-sefer-frequency-by-sefer-id` — Sefer numarasına göre tramvay sefer sıklıklarını döndürür.
    *   `seferId` (string)

### Metro

```ts
import { registerMetroTools } from 'izmir-mcp';
registerMetroTools(server);
```

**Kullanılabilir Araçlar:**

*   `get-metro-stations` — Tüm metro istasyonlarını, sıralama ve konum bilgileriyle döndürür.
*   `get-metro-sefer-frequencies` — Metro sefer sıklıklarını döndürür.

### Vapur (İzdeniz)

```ts
import { registerFerryTools } from 'izmir-mcp';
registerFerryTools(server);
```

**Kullanılabilir Araçlar:**

*   `get-ferry-timetables` — Vapur hareket saatlerini döndürür.
    *   `kalkis` (string)
    *   `varis` (string)
    *   `gunTipi` (string)
    *   `detay` (string)
*   `get-ferry-timetables-by-pier` — İskele bazlı vapur hareket saatlerini döndürür.
    *   `iskeleId` (string)
    *   `gunId` (string)
*   `get-ferry-working-days` — Vapurların çalışma günlerini döndürür.
*   `get-ferry-piers` — Vapur ve arabalı vapur iskele bilgilerini döndürür.

### Tren

```ts
import { registerTrainTools } from 'izmir-mcp';
registerTrainTools(server);
```

**Kullanılabilir Araçlar:**

*   `get-train-stations` — İzmir'deki tren garlarını ve konumlarını döndürür.

---

## 🤝 Katkıda Bulunma

Bu proje topluluk katkılarına açıktır. Eğer bir hata bulduysanız, yeni bir özellik eklemek isterseniz veya mevcut kodu iyileştirmek isterseniz, lütfen bir "issue" açın veya "pull request" gönderin.

1.  Projeyi "fork"layın.
2.  Yeni bir "branch" oluşturun (`git checkout -b ozellik/yeni-bir-ozellik`).
3.  Değişikliklerinizi "commit"leyin (`git commit -am 'Yeni bir özellik eklendi'`).
4.  "Branch"'inizi "push"layın (`git push origin ozellik/yeni-bir-ozellik`).
5.  Bir "Pull Request" oluşturun.

---

## 📜 Lisans

Bu proje [ISC Lisansı](https://github.com/halilcengel/IzmirMCP/blob/main/LICENSE) altında lisanslanmıştır.

---

## ⚠️ Sorumluluk Reddi

Bu proje, İzmir Büyükşehir Belediyesi'nin resmi bir uygulaması değildir. Veriler, herkese açık olan İBB API'lerinden alınmaktadır. Verilerin doğruluğu ve güncelliği konusunda herhangi bir garanti verilmemektedir. Proje, yalnızca bilgilendirme ve geliştirme amacıyla oluşturulmuştur.


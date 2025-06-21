# IzmirMCP

İzmir Büyükşehir Belediyesi’nin İZBAN ve ESHOT sistemlerinden gerçek zamanlı toplu taşıma verilerini, MCP (Model Context Protocol) tabanlı TypeScript sunucusu aracılığıyla kolayca entegre etmenizi sağlayan açık kaynaklı bir araç seti.

---

## Özellikler

* **İZBAN**

  * İstasyon listeleri
  * Belirli istasyonlar arası sefer saatleri
* **ESHOT**

  * Durak ve hat arama
  * Yaklaşan otobüs bilgisi
  * Hattaki tüm araçların gerçek zamanlı GPS konumları
* **Kolay Entegrasyon**

  * Node.js/TypeScript ile yazılmış
  * Genişletilebilir altyapı

---

## Kurulum

1. Depoyu klonlayın:

   ```bash
   git clone https://github.com/halilcengel/IzmirMCP.git
   cd IzmirMCP
   ```

2. Bağımlılıkları yükleyin:

   ```bash
   npm install
   ```

3. Projeyi derleyin:

   ```bash
   npm run build
   ```

---

## Kullanım

Yerel olarak çalıştırmak için:

```bash
npx izmir-mcp
```

---

## Claude veya Diğer MCP İstemcilerine Ekleme

Aşağıdaki örnek yapılandırma ile `izmir-mcp` sunucunuzu Claude gibi bir MCP istemcisine ekleyebilirsiniz:

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

---

## Araçlar (Tools)

### ESHOT

```ts
registerEshotTools(server);
```

* `get-eshot-stations`
* `get-eshot-lines`
* `get-line-approaching-buses`
* `get-line-bus-locations`
* `get-station-approaching-buses`

### İZBAN

```ts
registerIzbanTools(server);
```

* `get-izban-stations`
* `get-izban-departures`

---



---

## Lisans

ISC License


# 🍬 GulaGuard

PWA edukasi & monitoring gula untuk Gen Z Indonesia. HTML + CSS + JavaScript vanilla, tanpa build step.

## Jalankan lokal
```bash
npx serve .
```
Service Worker butuh `localhost` atau HTTPS.

## Push ke GitHub
```bash
git init
git add .
git commit -m "GulaGuard PWA"
git branch -M main
git remote add origin https://github.com/USERNAME/gulaguard.git
git push -u origin main
```

## Deploy ke Netlify
1. Buka app.netlify.com → **Add new site** → **Import an existing project** → pilih repo GitHub.
2. Build command: kosongkan. Publish directory: `.`
3. Klik **Deploy**. Netlify memberi HTTPS otomatis, jadi tombol "Install" PWA muncul.

## Gula Lens dengan Gemini
Buka tab Gula Lens → "Aktifkan Gemini Vision" → tempel API Key dari Google AI Studio. Key disimpan di browser pengguna. Tanpa key, aplikasi memakai simulator demo. Untuk produksi, sebaiknya lewatkan panggilan API lewat Netlify Function agar key tidak terekspos.

## Catatan
- Untuk install di Android yang optimal, tambahkan ikon PNG 192×192 dan 512×512 ke `manifest.json`.
- Data gizi adalah perkiraan edukatif, bukan saran medis.
- 

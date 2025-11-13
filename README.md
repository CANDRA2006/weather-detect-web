# ⛅ WeatherNow - Aplikasi Pendeteksi Cuaca

![HTML](https://img.shields.io/badge/HTML-5-orange.svg)
![CSS](https://img.shields.io/badge/CSS-3-blue.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow.svg)

## 📋 Deskripsi Proyek

**WeatherNow** adalah aplikasi web pendeteksi cuaca yang dirancang khusus untuk pemula yang ingin belajar membuat aplikasi berbasis API. Aplikasi ini menampilkan informasi cuaca real-time untuk berbagai kota di seluruh dunia dengan antarmuka yang menarik dan mudah digunakan.

### Fitur Utama:
- 🌍 Pencarian cuaca untuk kota di seluruh dunia
- 📍 Deteksi lokasi otomatis menggunakan GPS
- 🌡️ Informasi cuaca lengkap (suhu, kelembaban, kecepatan angin, dll)
- 📅 Prakiraan cuaca 5 hari ke depan
- 🎨 Desain modern dan responsif
- ⚡ Quick search untuk kota-kota populer
- 🌅 Informasi waktu matahari terbit dan terbenam

---

## 🚀 Cara Menggunakan

### 1. Clone Project
```bash
git clone https://github.com/candra2006/weather-detect-web.git
cd weathernow
```

### 2. Struktur File
```
weathernow/
│
├── public           # File utama berisi HTML, CSS, dan JavaScript
├── server           # Back-End sederhana yang bisa dimodifikasi menggunakan API kamu
└── README.md        # Dokumentasi proyek
```

### 3. Jalankan Aplikasi
Buka file `index.html` menggunakan browser favorit Anda (Chrome, Firefox, Edge, dll).

---

## 🔑 Tutorial Menambahkan API Key OpenWeatherMap

Aplikasi ini menggunakan **OpenWeatherMap API** untuk mengambil data cuaca. Ikuti langkah-langkah berikut untuk mendapatkan dan menambahkan API key:

### Langkah 1: Daftar di OpenWeatherMap
1. Kunjungi [https://openweathermap.org](https://openweathermap.org)
2. Klik tombol **Sign Up** di pojok kanan atas
3. Isi formulir pendaftaran dengan email dan password Anda
4. Verifikasi email yang dikirimkan ke inbox Anda

### Langkah 2: Dapatkan API Key
1. Login ke akun OpenWeatherMap Anda
2. Klik nama profil Anda di pojok kanan atas
3. Pilih menu **My API Keys**
4. Copy API key yang sudah tersedia (biasanya sudah dibuat otomatis)
   - Atau buat API key baru dengan klik **Generate** atau **Create Key**
5. **Penting**: API key baru butuh waktu 10 menit - 2 jam untuk aktif
6. Pada terminal masuk ke folder server dan jalankan perintah
```bash
npm start
```

### Langkah 3: Testing
1. Refresh halaman web di browser
2. Coba cari cuaca untuk kota tertentu
3. Jika berhasil, data cuaca akan muncul
4. Jika gagal, periksa:
   - Apakah API key sudah benar?
   - Apakah sudah menunggu 10 menit - 2 jam sejak pembuatan key?
   - Apakah koneksi internet aktif?

---

## 📚 Penjelasan API Endpoints

### 1. Current Weather API
```javascript
https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=id
```
**Parameter:**
- `q`: Nama kota yang dicari
- `appid`: API key Anda
- `units=metric`: Suhu dalam Celsius
- `lang=id`: Bahasa Indonesia

### 2. Forecast API (5 hari)
```javascript
https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=id
```

### 3. Weather by Coordinates
```javascript
https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=id
```

---

## 🛠️ Teknologi yang Digunakan

- **HTML5**: Struktur halaman web
- **CSS3**: Styling dan animasi
- **JavaScript (ES6)**: Logika aplikasi dan API calls
- **OpenWeatherMap API**: Sumber data cuaca
- **Font Awesome**: Icon library
- **Geolocation API**: Deteksi lokasi pengguna

---

## 💡 Tips untuk Pemula

1. **Pahami Fetch API**: Pelajari cara menggunakan `fetch()` untuk memanggil API
2. **Async/Await**: Gunakan async/await untuk menangani operasi asynchronous
3. **Error Handling**: Selalu tambahkan try-catch untuk menangani error
4. **API Rate Limit**: Free tier OpenWeatherMap memiliki limit 60 calls/menit
5. **Console Log**: Gunakan `console.log()` untuk debugging

---

## 🎓 Konsep yang Dipelajari

Dengan proyek ini, kamu akan belajar:
- ✅ Cara kerja REST API
- ✅ Fetch data dari API eksternal
- ✅ Manipulasi DOM dengan JavaScript
- ✅ Event handling (click, input, etc)
- ✅ Geolocation API
- ✅ Asynchronous JavaScript
- ✅ Error handling
- ✅ Responsive web design

---

## 🐛 Troubleshooting

### Error: "Invalid API Key"
- Pastikan API key sudah benar
- Tunggu 10 menit - 2 jam setelah membuat key baru

### Error: "City not found"
- Periksa ejaan nama kota
- Gunakan nama kota yang tepat

### Data tidak muncul
- Periksa koneksi internet
- Buka Console browser (F12) untuk melihat error
- Pastikan API key sudah ditambahkan di `script.js`

### Lokasi GPS tidak bekerja
- Izinkan akses lokasi di browser
- Pastikan menggunakan HTTPS atau localhost

---

## 👨‍💻 Kontribusi

Kontribusi selalu diterima! Jika Anda ingin menambahkan fitur atau memperbaiki bug:
1. Fork repository ini
2. Buat branch baru (`git checkout -b fitur-baru`)
3. Commit perubahan (`git commit -m 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

---

## 📧 Kontak

Jika ada pertanyaan atau saran, silakan hubungi:
- Email: chandraq818@gmail.com
- GitHub: [candra2006](https://github.com/candra2006)

---

## 🌟 Pengembangan Selanjutnya

Ide untuk pengembangan lebih lanjut:
- [ ] Tambahkan grafik cuaca interaktif
- [ ] Simpan riwayat pencarian
- [ ] Tambahkan tema gelap/terang
- [ ] Notifikasi cuaca ekstrem
- [ ] Prakiraan per jam
- [ ] Radar cuaca
- [ ] Multi-bahasa

---

**Selamat belajar dan coding! 🚀**

&copy; 2025 WeatherNow | All Rights Reserved

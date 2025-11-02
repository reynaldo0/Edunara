# 🌱 Edunara — Platform Edukasi Interaktif untuk UMKM Indonesia

**Edunara** adalah platform edukasi berbasis web yang dirancang untuk membantu pelaku **UMKM** dan **siswa digital** dalam menemukan, mempelajari, dan berinteraksi dengan kursus yang relevan di berbagai daerah Indonesia.  
Dibangun menggunakan **Next.js 16**, **React 19**, dan **Tailwind CSS 4**, proyek ini menampilkan pengalaman belajar interaktif yang cepat, modern, dan responsif.

---

## 🚀 Fitur Utama

✅ **Pilih Halaman Pengguna**
- Siswa atau Pemilik Kursus, dengan tampilan dan akses berbeda.

✅ **Pencarian & Filter Cerdas**
- Cari kursus berdasarkan **nama**, **kategori**, atau **domisili**.
- Filter kursus berdasarkan lokasi dan jenis pelatihan.

✅ **Peta Interaktif (Leaflet + GeoJSON)**
- Menampilkan lokasi tempat kursus secara visual di peta interaktif.

✅ **Informasi Detail Kursus**
- Detail lengkap kursus, mentor, rating, dan lokasi.

✅ **Forum Diskusi**
- Simulasi forum antara siswa dan pemilik kursus untuk berbagi pengalaman.

✅ **Tanya Mentor Profesional**
- Ruang interaktif bagi siswa untuk bertanya seputar materi.

✅ **Pengajuan Tempat Kursus**
- Formulir statis untuk menambahkan lembaga atau kursus ke dalam website.

✅ **Login & Register (UI Only)**
- Tampilan form login & register dengan desain modern (belum terhubung ke backend).

---

## 💡 Fitur Pengembangan Berikutnya

✨ **Dark Mode theme**
> Menambah profesionalitas & kenyamanan tampilan.

✨ **Event / Webinar Page**
> Menunjukkan kegiatan aktif komunitas Edunara.

✨ **AI Skill Matcher (Pencocokan Keahlian siswa Otomatis dengan pengisian form)**
> Gunakan AI untuk merekomendasikan kursus terbaik berdasarkan minat, lokasi, dan riwayat pencarian pengguna.

✨ **AI Translator ke semua bahasa**
> Fitur penerjemah otomatis seluruh konten kursus ke berbagai bahasa daerah atau Inggris.
---

## 🧠 Stack Teknologi

| Kategori | Teknologi |
|-----------|------------|
| **Framework** | [Next.js 16](https://nextjs.org/) |
| **Library UI** | [React 19](https://react.dev/), [React DOM 19](https://react.dev/reference/react-dom) |
| **Peta Interaktif** | [Leaflet 1.9](https://leafletjs.com/), [React Leaflet 5](https://react-leaflet.js.org/) |
| **Desain & Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Ikon & Visual** | [Heroicons](https://heroicons.com/), [React Icons](https://react-icons.github.io/react-icons/) |
| **Bahasa** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Quality Tools** | [ESLint 9](https://eslint.org/), [eslint-config-next](https://nextjs.org/docs/app/building-your-application/configuring/eslint) |

---

## ⚙️ Instalasi & Menjalankan Proyek

Ikuti langkah-langkah berikut untuk menjalankan proyek **Edunara** di komputer lokal:

### 1️⃣ Clone Repository
```bash
git clone https://github.com/username/edunara.git
```

### 2️⃣ Masuk ke Folder Proyek
```bash
cd edunara
```

### 3️⃣ Instal Dependencies
> Pastikan kamu sudah menginstal **Node.js versi 18 atau lebih tinggi**  
> (Disarankan menggunakan **npm** atau **yarn**)

```bash
npm install
# atau
yarn install
```

### 4️⃣ Jalankan Proyek di Mode Development
```bash
npm run dev
```

Buka browser dan akses:
```
http://localhost:3000
```
Website Edunara akan berjalan secara lokal 🧠

### 5️⃣ Build untuk Production
```bash
npm run build
npm start
```

---

## 🧩 Struktur Folder Utama

```
edunara/
├── app/               # Struktur utama Next.js (routing & page)
├── components/        # Komponen UI (Navbar, Footer, Card, dll)
├── public/            # File statis (gambar, ikon, data GeoJSON)
├── styles/            # Konfigurasi Tailwind dan global CSS
├── package.json       # Konfigurasi proyek & dependencies
└── tsconfig.json      # Konfigurasi TypeScript
```

---

## 💬 Kontribusi

Kontribusi sangat terbuka!  
Jika kamu ingin menambahkan fitur baru atau memperbaiki bug:

1. Fork repository ini  
2. Buat branch baru  
   ```bash
   git checkout -b fitur-baru
   ```
3. Lakukan perubahan  
4. Commit dan push  
5. Buat pull request dengan deskripsi fitur yang jelas  

---

## 👨‍💻 Tim Pengembang

| Nama | Peran | Kontak |
|------|--------|---------|
| **Reynaldo** | Founder & Developer | [LinkedIn](#) |
| **Dody Suprayogo** | Ide & Mentor Edukasi | [LinkedIn](#) |

---

## 🏁 Lisensi

Proyek ini dikembangkan untuk tujuan **pendidikan dan lomba inovasi digital**.  
Dilarang menggunakan ulang kode untuk kepentingan komersial tanpa izin dari pengembang utama.  
Lisensi: **MIT License**

---

### ✨ “Bangun Cerita Digitalmu bersama Edunara.”

# MIPA 2 — The Memory Book

Website yearbook MIPA 2 dengan konsep scrapbook aesthetic (cream, cokelat, hitam).

## Cara menjalankan
1. Ekstrak folder ZIP.
2. Buka folder `mipa2-scrapbook` di VS Code.
3. Jalankan `index.html` dengan ekstensi Live Server.

## Struktur foto
Taruh foto sesuai nama dan folder berikut:

- `assets/images/hero.jpg` — foto utama hero
- `assets/images/2023/1.jpg` — foto pilihan tahun 2023
- `assets/images/2024/1.jpg` — foto pilihan tahun 2024
- `assets/images/2025/1.jpg` — foto pilihan tahun 2025
- `assets/images/moments/1.jpg` sampai `4.jpg` — foto momen tambahan
- `assets/images/members/class.jpg` — foto seluruh kelas
- `assets/images/members/1.jpg` sampai `34.jpg` — foto masing-masing anggota
- `assets/images/boys/1.jpg` — foto grup The Boys
- `assets/images/girls/1.jpg` — foto grup The Girls

Kalau foto belum ada, website menampilkan placeholder otomatis. Ganti placeholder dengan foto asli untuk hasil terbaik.

## Mengubah nama anggota dan kategori
Buka `script.js`, cari bagian `const members = [...]`.
Ubah `name` dengan nama asli. Ubah `group` menjadi `boys` atau `girls`.
Contoh:
`{ name: "Nama Asli", group: "girls", photo: "assets/images/members/1.jpg" }`

Jumlah anggota bawaan 34. Jangan hapus koma antar objek.

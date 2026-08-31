# PRD.md
*(Dokumen ini adalah single source of truth untuk pengembangan web portfolio berbasis CV yang diunggah. Semua keputusan teknis, fitur, dan alur kerja tercantum di bawah — agent/engine apa pun **tidak** boleh mengubah keputusan-decisive tanpa persetujuan eksplisit.)*

---

## 1. Ringkasan Eksekutif
Produk: **Web Portfolio Personal** yang menampilkan isi CV dan proyek profesional, dengan panel admin yang memungkinkan pemilik (admin) melakukan CRUD pada setiap section (Education, Experience, Projects, Skills, Certifications, Awards, Contact, dan lain-lain).

Masalah yang diselesaikan: CV statis sulit diupdate cepat dan tidak terstruktur untuk publikasi — pemilik ingin portal portfolio yang rapi, bisa diperbarui sendiri tanpa deploy manual, dan menampilkan media (gambar, PDF, link) serta analytics sederhana.

Pengguna utama: pemilik portfolio (Admin — Anda) dan pengunjung publik (rekruter, kolaborator, publik umum). Proyek penting dikerjakan sekarang karena pemilik memiliki pengalaman dan proyek terkini yang harus dipresentasikan secara profesional dan mudah diupdate.

Sumber dasar: dokumen CV pengguna (dasar konten dan struktur). fileciteturn0file0L5-L8

---

## 2. Latar Belakang dan Tujuan Bisnis

**Latar belakang**
- Pemilik punya CV yang kaya konten (education, pengalaman, proyek AI, dsb.) namun versi online perlu fleksibilitas edit tanpa redeploy.
- Target impact: mempercepat personal branding, meningkatkan peluang kerja/kolaborasi, memudahkan berbagi bukti kerja (projek & publikasi).

**Tujuan bisnis (SMART)**
1. Release MVP: web publik + admin CRUD untuk semua section dalam 4 minggu (asumsi tim kecil). *(asumsi: lihat bagian Asumsi)*
2. Mengurangi waktu update CV dari ~2 jam (deploy manual) -> <5 menit melalui admin UI.
3. Meningkatkan jumlah unduhan/resume views 3x dalam 3 bulan setelah rilis (dengan integrasi analytics sederhana).
4. Menjaga uptime 99.5% untuk hosting publik pada 6 bulan pertama.

**KPI yang diukur**
- Time-to-update: rata-rata waktu dari membuka editor sampai perubahan live (target <5 menit).
- Error rate API: <1% per bulan.
- Page load (TTFB / interactive): <300ms untuk halaman utama pada cache hit.
- Retention admin (berapa sering admin memperbarui): target 1 update/bulan.
- Conversion: jumlah kontak/lead melalui tombol "Contact" per bulan.

---

## 3. Target Pengguna dan Persona

### Persona 1 — **Pemilik / Admin (Anda)**
- Profil: M. Ikhsan Pasaribu — developer/engineer, ingin portofolio yang rapi dan mudah diupdate.
- Kebutuhan: Tambah/edit/hapus entri (project, pengalaman, skill), unggah gambar / PDF resume, preview publik, publish/unpublish.
- Pain points: proses deploy manual, formatting inkonsisten, tidak ada histori/revert.
- Skenario utama: Menambahkan proyek baru lengkap dengan gambar, link GitHub, deskripsi, dan tag.

### Persona 2 — **Rekruter / Pengunjung Profesional**
- Profil: HR / hiring manager / rekan kolaborasi.
- Kebutuhan: melihat ringkasan pengalaman, unduh resume PDF, lihat proyek, kontak cepat.
- Pain points: halaman lambat, informasi tersebar, tidak ada bukti kerja (screenshots/links).
- Skenario utama: Mengunjungi portfolio, men-download resume, memeriksa proyek tertentu dan link GitHub.

### Persona 3 — **Kolaborator Teknis / Peer**
- Profil: Engineer / Product Manager yang ingin memverifikasi kontribusi.
- Kebutuhan: melihat detail teknis proyek, link repo, demo, tech stack, tanggal.
- Pain points: deskripsi singkat tanpa bukti atau artefak teknis.
- Skenario utama: Memfilter proyek berdasarkan tech stack atau tahun.

---

## 4. Daftar Fitur Lengkap dan Workflow (WAJIB, PALING PENTING)

> Catatan: semua fitur dituliskan per modul/epic. Untuk tiap fitur: user story, langkah pengguna (flow), kriteria penerimaan, dan prioritas MoSCoW.

---

### Modul A — Autentikasi & Akses (Authentication & Authorization)
**Fitur A1 — Login Admin**
- User story: *Sebagai Admin, saya ingin login ke panel admin supaya saya bisa mengelola konten portfolio.*
- Flow (entry → success / failure):
  1. Admin buka `/admin`.
  2. Klik `Login` → tampilkan form email & password.
  3. Kirim ke endpoint `/api/auth/login`.
  4. Jika kredensial valid → set session cookie HttpOnly + redirect ke dashboard.
  5. Jika gagal → tampilkan pesan error (wrong credentials) dan opsi `Forgot password`.
  6. Timeout sesi: setelah 30 menit idle, session invalid → redirect ke login.
- Failure flows:
  - Koneksi mati → tampil pesan “Connection error” dan retry.
  - Rate limit login attempts (blokir selama X menit setelah 5 percobaan).
- Acceptance criteria:
  - Login berhasil dengan kredensial valid; cookie ter-set dengan HttpOnly & Secure.
  - Gagal login menampilkan pesan yang jelas tanpa memaparkan alasan (security).
  - Sesi kadaluarsa sesuai konfigurasi.
- Prioritas: **Must have**

**Fitur A2 — Password Reset**
- User story: *Sebagai Admin, saya ingin mereset password lewat email supaya saya bisa kembali mengakses bila lupa kata sandi.*
- Flow:
  1. Pada form login klik `Forgot password`.
  2. Masukkan email → backend generate one-time token (exp 1 jam) → kirim email berisi link reset.
  3. Admin klik link → ke halaman reset (token divalidasi) → set password baru.
  4. Token invalid/expired → tampil pesan dan opsi kirim ulang.
- Acceptance:
  - Email reset terkirim dan link valid 1 jam.
  - Setelah reset, token tidak bisa dipakai ulang.
- Prioritas: **Must have**

**Fitur A3 — MFA (Two-Factor) — opsional untuk rilis awal (but recommended)**
- User story: *Sebagai Admin, saya ingin mengaktifkan MFA supaya akun lebih aman.*
- Prioritas: **Should have** (bisa rilis setelah MVP).

**Fitur A4 — RBAC sederhana**
- User story: *Sebagai sistem, saya ingin memiliki peran `admin` dan `viewer` supaya bisa membatasi akses.*
- Prioritas: **Must have** (minimal `admin` role).

---

### Modul B — Public Portfolio (Frontend Public)
**Fitur B1 — Halaman Beranda (Landing)**
- User story: *Sebagai Pengunjung, saya ingin melihat ringkasan profesional sehingga cepat tahu profil utama.*
- Flow:
  1. Pengunjung buka `/` → halaman statis di-cache (SSG/ISR).
  2. Menampilkan hero, ringkasan, link download resume, CTA contact.
- Acceptance: load time <1s (cache hit), tombol download resume mengunduh PDF yang terbaru.
- Prioritas: **Must have**

**Fitur B2 — Halaman Projects (list & detail)**
- User story: *Sebagai Pengunjung, saya ingin melihat daftar proyek dan klik detail untuk melihat artefak.*
- Flow:
  1. Klik `Projects` → list card proyek dengan thumbnail, tech tags, tahun.
  2. Klik proyek → ke halaman detail (deskripsi lengkap, gambar carousel, link repo, demo).
- Acceptance: setiap proyek harus menampilkan setidaknya title, tahun, stack, dan minimal 1 link (repo atau demo) jika diisi.
- Prioritas: **Must have**

**Fitur B3 — Halaman Resume / Download PDF**
- User story: *Sebagai Pengunjung, saya ingin mendownload resume terbaru.*
- Acceptance: file PDF yang diunduh adalah versi yang terakhir diupload di admin.
- Prioritas: **Must have**

**Fitur B4 — Search & Filter Projects**
- User story: *Sebagai Pengunjung/Kolaborator, saya ingin mencari atau memfilter proyek berdasarkan tag atau tahun.*
- Acceptance: filter mengembalikan hasil dalam <300ms untuk dataset kecil; UI menampilkan state kosong jika tidak ada hasil.
- Prioritas: **Should have**

**Fitur B5 — SEO & Social Preview (OG tags)**
- Prioritas: **Should have**

---

### Modul C — Admin Dashboard (CRUD)
**Fitur C1 — CRUD: Education**
- User story: *Sebagai Admin, saya ingin menambah/edit/hapus entri pendidikan supaya CV online selalu up-to-date.*
- Flow:
  1. /admin → menu Education → klik `Add Education`.
  2. Form: institution, degree, start/end, description, attachments.
  3. Submit → validasi required fields → API POST `/api/admin/education`.
  4. Success → tampil di list; opsi publish/unpublish.
  5. Delete → soft-delete (dapat restore).
- Acceptance:
  - Validasi client & server identik (server authoritative).
  - Soft-delete dan recovery tersedia.
- Prioritas: **Must have**

**Fitur C2 — CRUD: Experience, Projects, Research, Awards, Certifications, Skills**
- Setiap entri mengikuti pola yang sama: form, preview, publish/unpublish, soft-delete, ordering (drag & drop).
- User story contoh (Projects): *Sebagai Admin, saya ingin menambah proyek dengan deskripsi, link, gambar, supaya pengunjung dapat memverifikasi klaim saya.*
- Acceptance: upload gambar ≤ 10MB per file, preview bekerja, tags disimpan sebagai array, link validasi URL.
- Prioritas: **Must have**

**Fitur C3 — Media Manager (Uploads & CDN)**
- User story: *Sebagai Admin, saya ingin mengunggah gambar, PDF, dan video singkat ke storage yang dapat diakses oleh public.*
- Flow:
  1. Upload melalui drag-drop di form.
  2. Upload streaming ke storage provider (Supabase Storage / S3) → optimasi (resize, progressive JPEG/AVIF), CDN delivery.
  3. Tautan public tersimpan di DB.
- Acceptance: file yang diupload diproses (thumbnail + full), file public bisa diakses melalui URL CDN, preview di admin muncul.
- Prioritas: **Must have**

**Fitur C4 — Versioning & Audit Trail**
- User story: *Sebagai Admin, saya ingin memiliki histori perubahan per entri untuk revert bila perlu.*
- Acceptance: setiap perubahan menyimpan `who`, `when`, `diff`; revert satu klik restore previous revision.
- Prioritas: **Should have**

**Fitur C5 — Preview & Publish Workflow**
- User story: *Sebagai Admin, saya ingin preview perubahan sebelum publish agar tidak terjadi kesalahan publikasi.*
- Acceptance: preview menampilkan hasil akhir persis seperti public (client-side rendering).
- Prioritas: **Must have**

**Fitur C6 — Bulk Import / Export (CSV / JSON)**
- Prioritas: **Could have**

**Fitur C7 — Role & Settings (Site Meta, Contact Info, Theme)**
- Prioritas: **Could have**

---

### Modul D — Integrasi & Operasional
**Fitur D1 — Resume PDF Generator / Uploader**
- Opsi 1: Admin upload PDF resume; public download itu.
- Opsi 2: Generate PDF dari data (server-side PDF generation) — *Could have*
- Prioritas: **Must have** (minimal upload)

**Fitur D2 — Analytics sederhana**
- Page views, downloads, top projects (anonim).
- Prioritas: **Should have**

**Fitur D3 — Backup & Export Data**
- Daily backup DB + storage snapshot. Restore tested setiap bulan.
- Acceptance: RTO ≤ 4 jam (restoration test).
- Prioritas: **Must have**

---

### Dua Workflow Paling Kompleks (Rinci, bernomor)

#### Workflow 1 — Menambah / Mempublish Proyek Baru (Project CRUD + Media + Publish + Preview + Revert)
1. Admin login ke `/admin` (autentikasi valid).
2. Menu `Projects` → klik `Add Project`.
3. Isi field wajib: Title (required), Year (required), Short description (required), Detailed description (optional, rich text/Markdown), Tech stack (tags), Links (repo/demo), Visibility (draft/publish).
4. Upload media: drag-drop gambar/video/PDF.
   - Client melakukan pre-validation (tipe file, ukuran).
   - File diupload multipart ke endpoint `/api/uploads` → server menyimpan ke Supabase Storage / S3.
   - Server men-trigger image processing: generate thumbnail, webp/avif, store metadata.
5. Setelah menyimpan, sistem menampilkan preview (render dari saved data, tanpa publish).
6. Admin klik `Publish`:
   - Server set `published_at` timestamp; object tersedia untuk public (cache purge atau ISR revalidation).
7. Acceptance:
   - Setelah publish, halaman proyek public menampilkan semua field, gambar via CDN, link bekerja.
   - Jika media gagal diupload → rollback partial upload + tampil pesan error, entri tidak dibuat.
8. Revert:
   - Admin dapat membuka audit trail entri → pilih versi sebelumnya → klik `Revert` → entri kembali ke versi tersebut; tindakan dicatat.
9. Edge cases:
   - Jika koneksi putus saat upload → client dapat resume upload (chunked) atau memberi opsi retry.
   - Jika duplicate title → warn but allow (admin decides), dapatkan slug auto-unique.

#### Workflow 2 — Autentikasi + MFA + Session Expiry + Password Reset
1. Admin buka `/admin` → login dengan email/password.
2. Jika MFA diaktifkan:
   - Setelah password valid, kirim challenge (TOTP / push / SMS depending on setup).
   - Admin masukkan code → server validate → set long-lived session cookie (Secure, HttpOnly).
3. Session policy:
   - Idle timeout: 30 menit; Max lifetime: 30 hari for remember-me (optional).
   - Pada session expiry: halaman admin mendeteksi 401 → redirect ke login, simpan unsaved draft localStorage (jika ada).
4. Password reset:
   - Admin klik `Forgot password` → request token → token via email (1 hour expiry).
   - Reset flow seperti di bagian fitur A2.
5. Acceptance:
   - Session cookie memiliki Secure & HttpOnly flags; refresh token tidak disimpan di localStorage.
   - MFA challenge ditetapkan bila aktif; jika admin kehilangan device MFA, ada proses recovery manual (opsi contact support / recovery code).
6. Failure flows:
   - Koneksi error saat MFA challenge → fallback (resend) atau batalkan.
   - Brute-force: setelah 5 percobaan gagal, akun diblokir sementara (exponential backoff).

---

## 5. Kebutuhan Non-Fungsional

**Performa**
- Halaman utama (cache hit) interactive < 1s; TTFB <300ms.
- API CRUD p99 response <500ms (dataset kecil).
- Image delivery via CDN; gambar terkompresi/responsive.

**Keamanan**
- HTTPS mandatory.
- Auth: Supabase Auth / NextAuth (decision di bagian Keputusan). Session cookie HttpOnly, Secure.
- Data-at-rest: database encrypted (managed provider).
- Media signed URLs bila diperlukan.
- Rate limiting untuk endpoint authentication.
- Input validation server-side + sanitasi (prevent XSS).
- Backup automated; DB backups daily; retention 30 hari.
- Audit log untuk semua admin actions (who/when/what).

**Skalabilitas**
- Target MVP: mampu melayani 10k unique visitors / bulan.
- Arsitektur: static-first (SSG/ISR) frontend + serverless API (scales horizontally).
- Storage: object storage with CDN (scales).

**Aksesibilitas**
- Target WCAG 2.1 AA minimal.
- Kontras warna, semantic HTML, keyboard navigable admin UI.

**Lokalisasi**
- Bahasa utama: Bahasa Indonesia (UI default). Bahasa Inggris optional for public (Could have).

**Kompatibilitas**
- Desktop + mobile responsive; modern browsers (Chrome, Firefox, Safari, Edge).
- No IE11 support.

**Observability & SLO**
- Error tracking (Sentry) + uptime monitoring (UptimeRobot).
- Alerts for error rate >1% atau API latency >1s p95.

---

## 6. Arah Teknis Tingkat Tinggi

**Stack rekomendasi (direkomendasikan karena pengalaman pemilik dan standar industri):**
- Frontend: Next.js (React) + TailwindCSS — static-first (SSG/ISR) untuk SEO & perf.
- Backend API: serverless functions (Next.js API routes / Vercel Functions) atau NodeJS service (FastAPI / NestJS) bila butuh lebih besar.
- Database: PostgreSQL (managed — Supabase / Railway / Neon).
- Storage: Supabase Storage / S3 + CDN (Vercel / Cloudflare).
- Auth: Supabase Auth (Email/password + optional OAuth providers) atau NextAuth terkonfigurasi dengan Supabase.
- Hosting: Vercel (frontend), Supabase for DB & auth (or Railway / Render).
- CI/CD: GitHub Actions (automated tests, linting, deployment).
- Observability: Sentry + Prometheus/Datadog (opsional).
- AI/ML: **Tidak** diperlukan untuk MVP. Jika di masa depan ingin fitur AI (auto-summarize CV / generate project descriptions), pisahkan backend-ai; gunakan provider (Google / OpenAI) sesuai budget. Untuk sekarang, backend monolith (backend-api) cukup.
- Alasan pemisahan backend-api & backend-ai: kalau ada inference heavy workloads atau penyimpanan vektor maka resource & scaling berbeda — pisahkan untuk keamanan biaya dan autoscaling.

---

## 7. Keputusan yang Sudah Ditetapkan
1. **Database**: PostgreSQL (managed).
2. **Auth provider**: Supabase Auth (email/password) sebagai default.
3. **Hosting frontend**: Vercel (SSG/ISR).
4. **Storage**: Supabase Storage atau S3 + CDN (deliver via CDN).
5. **Frontend framework**: Next.js (React).
6. **Language & styling**: TypeScript + TailwindCSS.
7. **No built-in LLM for MVP**: AI features hanya R&D untuk roadmap; backend-ai terpisah jika diperlukan.
8. **Backup retention**: 30 hari default.
> Semua keputusan di atas wajib dicatat di AGENTS.md sebelum agen mana pun mengubah stack.

---

## 8. Batasan dan Asumsi

**Batasan**
- Tim: diasumsikan 1-2 developer + 1 reviewer/designer.
- Budget: prefer solusi yang masih bisa berjalan di free/low-cost tier (Vercel personal + Supabase free tier) selama MVP.
- Waktu: MVP development 4 minggu (asumsi 1 developer full-time).

**Asumsi (WAJIB dinyatakan)**
1. Hanya satu admin (pemilik) pada rilis awal. Multi-admin & granular roles masuk roadmap.
2. Pemilik akan menyediakan file resume PDF final atau mengizinkan sistem menyimpan yang diupload.
3. Konten CV dalam file yang diunggah akan menjadi basis struktur (education, experience, projects, dsb.). Jika ada field yang tidak ada, admin akan mengisi lewat dashboard.
4. Media (gambar/video) disediakan oleh admin; sistem akan mengoptimalkan/resize otomatis.
5. Pengunjung tidak memerlukan autentikasi untuk melihat portfolio; hanya admin yang butuh login.
6. Tidak ada integrasi pembayaran atau elemen e-commerce.

---

## 9. Di Luar Cakupan
- Fitur pencarian teks penuh lintas PDF/attachment berdasar indexing (Could have later).
- Fitur multi-user collaboration (co-editing real-time).
- Auto-generation resume via LLM (future roadmap).
- Marketplace / job-application tracking.
- Support untuk enterprise SSO (SAML) — masuk roadmap di versi setelah MVP jika diperlukan.

---

## 10. Risiko dan Mitigasi

**Risiko 1 — Data loss pada media / DB**
- Mitigasi: daily backups, test restore bulanan, soft-delete + audit trail.

**Risiko 2 — Kebocoran kredensial / akses admin**
- Mitigasi: enforce HTTPS, secure cookies, rate limiting login, opsi MFA, audit logs.

**Risiko 3 — Performance degradation pada trafik tak terduga**
- Mitigasi: static-first architecture (SSG/ISR), CDN for assets, autoscale backend, caching layer, limit heavy operations (batching uploads).

**Risiko 4 — Reputasi (konten salah atau tidak akurat)**
- Mitigasi: preview sebelum publish, versioning & revert, approval step (manual) sebelum public (if needed).

---

## 11. Larangan Eksplisit
1. **Jangan** ubah nama database atau provider (Postgres/Supabase) tanpa persetujuan eksplisit.
2. **Jangan** install dependency eksternal baru di project (baik frontend atau backend) tanpa menuliskan alasan, security review, dan persetujuan.
3. **Jangan** melakukan migrasi skema database destructive (DROP TABLE / DROP COLUMN) tanpa mengarsipkan skema lama dan persetujuan manual.
4. **Jangan** publish konten admin otomatis tanpa konfirmasi `Publish` oleh admin.
5. **Jangan** menyimpan token/jwt di localStorage; gunakan HttpOnly cookies untuk session.
6. **Jangan** memakai LLM / external 3rd-party data upload ke pihak ketiga tanpa penandaan di PRD & persetujuan (privacy).

---

## Lampiran: Checklist Rilis MVP (Deliverables)
- [ ] Halaman publik utama + Projects + Resume download.
- [ ] Admin dashboard: login, CRUD untuk Education, Experience, Projects, Skills, Certifications, Awards.
- [ ] Media manager + CDN deployment pipeline.
- [ ] Auth & password reset.
- [ ] Preview & publish flow.
- [ ] Backup + monitoring + error tracking.
- [ ] Dokumentasi penggunaan singkat untuk admin (how-to add project, upload resume).

---

## Roadmap Pasca-MVP (singkat)
- Q2: MFA & multi-admin, granular RBAC.
- Q3: Versioning lanjutan + audit exports; PDF generator otomatis.
- Q4: Optional AI features (auto-summarize, project description generator) sebagai backend-ai terpisah.

---

## Lampiran: Asumsi Teknis & Operasional (disingkat)
- MVP menggunakan Next.js + Supabase + Vercel (free/low-cost compatible).
- Admin adalah satu orang; tidak ada dukungan multi-tenant.
- Bahasa UI: Bahasa Indonesia default.

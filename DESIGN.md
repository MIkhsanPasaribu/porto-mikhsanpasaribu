---
name: mikhsan-portfolio-design
colors:
  primary: "#0B57D1"            # utama — CTA, links utama
  primary-700: "#0948B3"        # hover/active
  primary-500: "#0B57D1"
  primary-300: "#4B86F0"        # subtle accents
  secondary: "#06B6D4"          # aksen sekunder untuk tag/labels
  tertiary: "#F59E0B"           # aksen warm (badges minor)
  neutral-900: "#0B1220"        # teks gelap (on-surface light mode)
  neutral-700: "#374151"
  neutral-500: "#6B7280"
  neutral-300: "#D1D5DB"
  neutral-100: "#F3F4F6"        # surface light
  surface: "#FFFFFF"           # card / page background (light)
  on-surface: "#0B1220"        # teks di atas surface
  surface-variant: "#FBFDFF"   # subtle panels
  backdrop: "rgba(11,17,32,0.6)" # modals overlay
  error: "#DC2626"
  success: "#16A34A"
  info: "#2563EB"
  shadow: "rgba(11,17,32,0.08)"
  focus-ring: "rgba(11,87,209,0.18)"
dark:
  primary: "#7FB0FF"
  primary-700: "#5E94F6"
  neutral-900: "#E6EEF9"
  neutral-700: "#CBD5E1"
  neutral-500: "#9AA7B8"
  neutral-300: "#64748B"
  surface: "#0B1220"
  on-surface: "#F8FAFC"
  surface-variant: "#081024"
  backdrop: "rgba(3,6,12,0.7)"
  shadow: "rgba(2,6,12,0.6)"
typography:
  hero-xl: "Inter, 40px, 700"     # judul halaman / hero
  headline-lg: "Inter, 28px, 600" # section title
  headline-md: "Inter, 20px, 600"
  body-md: "Inter, 16px, 400"
  body-sm: "Inter, 14px, 400"
  label-sm: "Inter, 12px, 600"
  mono-code: "IBM Plex Mono, 13px, 400"
radius:
  sm: 6px
  md: 12px
  lg: 16px
spacing:
  space-xxs: 4px
  space-xs: 8px
  space-sm: 12px
  space-md: 16px
  space-lg: 24px
  space-xl: 32px
components:
  button-primary:
    background: "{colors.primary}"
    color: "{colors.surface}"
    border-radius: "{radius.md}"
    padding-vertical: "{spacing.space-sm}"
    padding-horizontal: "18px"
    box-shadow: "0 6px 18px {colors.shadow}"
    hover-background: "{colors.primary-700}"
    focus-ring: "{colors.focus-ring}"
    disabled-opacity: 0.48
  button-secondary:
    background: "transparent"
    color: "{colors.primary}"
    border: "1px solid {colors.neutral-300}"
    border-radius: "{radius.md}"
    hover-background: "{colors.surface-variant}"
  card:
    background: "{colors.surface}"
    border-radius: "{radius.lg}"
    padding: "{spacing.space-md}"
    box-shadow: "0 8px 30px {colors.shadow}"
  input:
    background: "{colors.surface-variant}"
    color: "{colors.on-surface}"
    border: "1px solid {colors.neutral-300}"
    border-radius: "{radius.md}"
    padding: "{spacing.space-sm}"
    focus-border: "{colors.primary}"
    error-border: "{colors.error}"
  input-error:
    background: "{colors.surface-variant}"
    color: "{colors.error}"
    border: "1px solid {colors.error}"
  toast-success:
    background: "{colors.success}"
    color: "{colors.surface}"
  avatar:
    size-sm: 32px
    size-md: 56px
    size-lg: 96px
motion:
  duration-micro: 120ms
  duration-short: 200ms
  duration-medium: 320ms
  duration-long: 600ms
  easing-standard: "cubic-bezier(0.2, 0.8, 0.2, 1)"
  easing-decelerate: "cubic-bezier(0.0, 0.0, 0.2, 1)"
breakpoints:
  mobile: 0
  sm: 640px
  md: 900px
  lg: 1024px
  xl: 1280px
grid:
  columns-desktop: 12
  columns-tablet: 8
  gap: "{spacing.space-md}"
icons:
  library: "Heroicons (outline + solid)"
  size-sm: 16px
  size-md: 20px
  size-lg: 24px
  size-xl: 32px
---

### Ringkasan
Sistem desain ini dirancang untuk portfolio profesional seorang developer: bersih, informatif, dan fokus pada konten (projek, pengalaman, bukti teknis). Kepribadian visualnya formal–percaya-diri dengan sentuhan hangat dari aksen sekunder agar terasa manusiawi — bukan eksperimental atau berlebihan. Ruang putih (white space) dipakai secara strategis untuk menonjolkan artefak (project cards, code snippets, PDF resume), bukan untuk dekorasi. UI ditujukan agar cepat terbaca oleh rekruter maupun engineer: hirarki tipografi jelas, tombol CTA menonjol, dan komponen admin ringkas & dapat di-scan.

### Alasan Pemilihan Gaya Visual
Setelah riset terhadap gaya populer (glassmorphism, neumorphism/soft UI, neo‑brutalism, bento grid, skeuomorphism, flat/minimalism, Material Design) kami memilih **kombinasi: Minimalism (primary) + Material Design principles (secondary)**.

Alasan:
- Portfolio developer menuntut fokus pada konten, kejelasan, dan kecepatan — karakteristik Minimalism sangat cocok (lihat trend developer portfolios 2026: minimal & content-focused). ([templifica.com](https://templifica.com/blog/developer-portfolio-templates-creating-a-job-winning-portfolio?utm_source=chatgpt.com))  
- Material Design menyediakan panduan aksesibilitas, skala tipografi, dan pola interaksi (elevations, focus, tactile feedback) yang langsung dapat diterapkan untuk komponen admin dan UX forms. Material juga menekankan kontras warna & legibilitas (WCAG guidance), hal penting untuk memastikan teks tetap terbaca. ([m1.material.io](https://m1.material.io/usability/accessibility.html?utm_source=chatgpt.com))
- Gaya seperti Neumorphism / Soft UI menarik secara estetika tetapi berisiko menurunkan aksesibilitas (kontras/lembutnya shadow membuat kontrol sulit dikenali). Karena portfolio ditujukan untuk publik profesional dan rekruter (yang mengharapkan kejelasan), neumorphism *tidak dipilih* sebagai gaya dasar; jika digunakan, hanya sebagai aksen ilustratif yang tidak memuat fungsi interaktif. (lihat kritik neumorphism). ([techbyjeel.com](https://techbyjeel.com/blog/css-neumorphism-is-it-still-worth-using?utm_source=chatgpt.com))
- Neo‑brutalism dan skeuomorphism berpotensi mengganggu persepsi profesional untuk use-case ini (bisa terasa "eksperimental" atau "ketinggalan zaman" pada recruiter). ([todaymade.com](https://www.todaymade.com/blog/brutalist-web-design?utm_source=chatgpt.com))
- Bento grid adalah pola layout yang bagus untuk tata letak kompleks — kami *mengadopsi prinsip grid responsif (12-col desktop)* yang kompatibel dengan pendekatan bento jika diinginkan, tetapi layout tetap minimal: lihat token `grid` di atas.

Garis besar keputusan gaya: minimal + material → tampilan bersih, fokus konten, interaksi yang dapat diandalkan dan dapat diakses, animasi halus menggunakan Motion, dan ilustrasi vektor kaya memakai Lottie .lottie hanya untuk kasus di mana ilustrasi menambah nilai (featured project highlight, hero illustration — bukan untuk elemen UI dasar).

### Gaya yang Dipertimbangkan tetapi **Tidak** Dipakai (dan kenapa)
- **Neumorphism / Soft UI** — tidak dipakai sebagai gaya utama karena isu kontras dan affordance interaktif (but may be used sparingly for non-interactive decorative panels only). ([techbyjeel.com](https://techbyjeel.com/blog/css-neumorphism-is-it-still-worth-using?utm_source=chatgpt.com))  
- **Glassmorphism** — estetika modern, tapi rentan terhadap kontras rendah dan dapat mengurangi keterbacaan pada teks tipis; tidak dipilih untuk body text atau controls.  
- **Neo‑brutalism** — kuat dan unik, tapi risiko alienasi audiens rekruter dan potensi mengurangi trust untuk konteks professional. ([todaymade.com](https://www.todaymade.com/blog/brutalist-web-design?utm_source=chatgpt.com))  
- **Skeuomorphism** — terlalu dekoratif untuk portfolio profesional; konsumsi ruang visual tinggi dan tidak praktis untuk banyak konten teknis.

### Warna — peran token
- **primary (#0B57D1)**: warna aksi utama — hanya satu CTA per layar (mis: "Download Resume", "Contact", "Publish"). Gunakan primary untuk CTA dan link penting saja. Kontras terhadap `surface` dan `on-surface` harus diuji; primary dipilih cukup gelap untuk memastikan white-on-primary kontras baik.
- **secondary (#06B6D4)**: aksen sekunder untuk tag, highlights non-CTA (teknologi tag, chip, pill badges).
- **tertiary (#F59E0B)**: warna hangat pembeda untuk status (publishing, highlights) — penggunaan terbatas agar tidak mencuri perhatian dari CTA utama.
- **neutral-100..900**: skala netral untuk teks, subtext, borders, dan backgrounds. `neutral-900` dipakai untuk teks utama pada mode terang; `neutral-300` untuk border ringan.
- **surface / surface-variant**: latar card & panel; perbedaan subtle diperlukan agar konten tidak "melekat" ke latar.
- **dark tokens**: mode gelap override — warna lebih terang untuk teks, surface gelap. Semua warna teks di mode gelap harus tetap memenuhi WCAG.

**Kontras & aksesibilitas:** Pastikan pasangan warna teks/background memenuhi minimal 4.5:1 untuk teks normal. Gunakan tools (WebAIM/WAVE) di CI untuk memverifikasi kombinasi token yang dipakai pada komponen. Panduan Material harus diikuti untuk text-on-color. ([m1.material.io](https://m1.material.io/usability/accessibility.html?utm_source=chatgpt.com))

### Tipografi
- **Font utama:** Inter (variable) — dibaca baik di layar, performa bagus, populer di produk developer.  
- **Font monospace untuk code snippets:** IBM Plex Mono atau Fira Code — untuk menampilkan potongan kode / terminal output di project detail.  
- **Skala:** headline → 40/28/20, body 16/14, label 12. Gunakan satu atau dua font-weight utama per layar (400 normal, 600 semibold, 700 bold untuk hero).  
- **Penggunaan:**  
  - `hero-xl` untuk nama & hero tagline;  
  - `headline-lg` untuk judul section (Projects, Experience);  
  - `body-md` untuk paragraf deskriptif;  
  - `mono-code` untuk code blocks dan data teknis.  
- **Line-height & spacing:** body text min 1.5 line-height; paragraf spacing >= `space-sm` untuk keterbacaan pada layar.

### Motion dan Animasi
- **Prinsip utama:** animasi untuk komunikasi (state change, feedback), bukan dekorasi. Animasi harus: singkat, dapat diprediksi, dan hormati prefers-reduced-motion.  
- **Durasi:** `duration-micro` 120ms (micro interactions hover), `duration-short` 200ms (button press), `duration-medium` 320ms (list reordering, modals), `duration-long` 600ms (transition page full).  
- **Easing:** gunakan `easing-standard` untuk kebanyakan transisi; `easing-decelerate` untuk exit/decay animations.  
- **Komponen Motion:** gunakan Motion (Framer Motion) untuk: page transitions (fade + translateY 8–16px), button press (scale 0.98), image hover (subtle lift + shadow).  
- **Magic UI patterns:** loading shimmer untuk konten list; animated list reflow untuk admin reorder; skeletons untuk media-heavy entries. Gunakan Magic UI hanya bila komponen memerlukan interactivity built-in (e.g., animated list).  
- **Lottie (.lottie):** hanya untuk hero illustration atau empty-state illustrations yang memerlukan storytelling; jangan gunakan Lottie untuk spinner sederhana. Pakai `@lottiefiles/dotlottie-react`.  
- **Accessibility:** respect `prefers-reduced-motion` — all animations must fallback to instant state change.

### Mode Gelap
- Token `dark` di atas mengatur warna gelap. Aturan:
  - Semua teks di mode gelap harus memenuhi kontras 4.5:1 terhadap surface.
  - Shadow di mode gelap harus lebih lembut (gunakan `colors.shadow` gelap/opaque).
  - Jangan gunakan transparansi berlebih pada elemen teks di mode gelap (hindari opacities < 0.86 pada teks).
  - Uji kombinasi warna accent (primary/secondary/tertiary) di mode gelap agar maintain brand recognition tanpa membuat teks sulit dibaca.

### Breakpoint Responsif & Grid
- **Titik breakpoint:** mobile `<640px` (sm), tablet `640–1024px` (md), desktop `>=1024px` (lg).  
- **Grid:** 12 kolom desktop, 8 pada tablet, 1 pada mobile. Gap default `space-md` (16px).  
- **Layout principle:** Prioritaskan linear content flow di mobile — hero → summary → featured project → projects list (stacked). Gunakan bento-like card grouping untuk featured section pada desktop (2–3 cards highlight) tetapi tetap maintain whitespace dan alignment. Jangan memaksa multi-column kompleks pada mobile.

### Pustaka Komponen & Alasan
- **shadcn/ui** — dasar komponen accessible & Tailwind-friendly. Komponen copy-into-repo agar kontrol penuh. Sesuai aturan AGENTS.md.  
- **Motion (Framer Motion)** — transisi & micro-interactions.  
- **Magic UI** — reusable animated UI bits (skeletons, shimmer). Gunakan selektif.  
- **21st.dev** — sumber tambahan jika butuh pattern lebih kompleks.  
- **@lottiefiles/dotlottie-react** — untuk ilustrasi vektor kompleks (.lottie).  
- **Jika admin panel butuh data-heavy controls**: pertimbangkan Ant Design untuk komponen tabel / form cepat. Namun default adalah shadcn + Tailwind untuk konsistensi.  

### Do's and Don'ts (pedoman cepat)
1. Do: Pakai **primary** hanya untuk 1 aksi utama per layar (CTA).  
2. Do: Pastikan semua teks body memenuhi kontras 4.5:1 terhadap background. Verifikasi di CI.  
3. Do: Gunakan motion singkat (<= 320ms) untuk feedback; hormati prefers-reduced-motion.  
4. Don't: Jangan pakai neumorphic soft shadows untuk controls interaktif tanpa fallback kontras.  
5. Don't: Jangan lebih dari dua font weights untuk konten utama pada satu layar (mis: 400 + 600; hero boleh 700).  
6. Do: Gunakan Lottie hanya untuk hero/empty-state; jangan gunakan untuk loader kecil.  
7. Don't: Jangan gabungkan sudut sangat tajam (0px) dan sangat membulat (>20px) di satu tampilan — pilih satu dan konsisten.  
8. Do: Selalu tampilkan focus ring custom (tidak menghapus default browser) agar keyboard navigation jelas.

### Ikonografi
- **Library:** Heroicons (outline & solid) — ringan, konsisten dengan Tailwind/shadcn.  
- **Gaya:** Gunakan outline untuk controls dan solid untuk status/filled actions.  
- **Ukuran & aturan:** 16px untuk micro (inline icon), 20px–24px untuk controls utama, 32px untuk hero/illustration accents. Selalu gunakan accessible labels (aria-label) untuk ikon interaktif.

#### Catatan akhir untuk implementor & agents
- Token YAML di atas adalah sumber kebenaran untuk tooling (Tailwind mapping, design tokens export). Pastikan `DESIGN.md` ini dipakai untuk menghasilkan `tailwind.config.ts` token export otomatis di pipeline CI.  
- Segera jalankan kontras check terhadap semua kombinasi token utama sebelum final QA.  
- Jika butuh varian warna brand (mis: versi konservatif untuk CV versi cetak), tambahkan di `colors.*-print` dan dokumentasikan penggunaannya.

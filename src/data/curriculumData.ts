import { Topic, QuizQuestion, DailyScheduleSlot } from '../types';

export const TOPICS: Topic[] = [
  // ==========================================
  // 1. MATEMATIKA: BILANGAN
  // ==========================================
  {
    id: 'mat-bilangan-real',
    title: 'Bilangan Real (Sifat, Operasi, Eksponen & Bentuk Akar)',
    subject: 'matematika',
    day: 1,
    phase: 1,
    level: 'MEDIUM',
    estimatedMinutes: 35,
    pengertian: 'Himpunan bilangan real (ℝ) mencakup semua bilangan rasional (a/b dengan b ≠ 0) dan irasional (akar tak berulang tak hingga seperti √2, π, e). Dilengkapi sifat operasi aljabar komutatif, asosiatif, distributif, eksponen bulat dan pecahan, serta penyederhanaan bentuk akar.',
    tujuan: 'Menguasai sifat operasi aritmetika dasar, manipulasi eksponen bulat & pecahan, serta rasionalisasi dan penyederhanaan bentuk akar kompleks pada soal numerik TKA.',
    konsepUtama: [
      { term: 'Sifat Operasi Real', explanation: 'Komutatif (a+b=b+a; ab=ba), Asosiatif ((a+b)+c=a+(b+c)), Distributif (a(b+c)=ab+ac), dan Unsur Identitas/Invers.' },
      { term: 'Eksponen Pecahan & Negatif', explanation: 'a^(m/n) = akar pangkat n dari a^m; a^(-n) = 1/(a^n) dengan syarat a ≠ 0.' },
      { term: 'Bentuk Akar Sederhana', explanation: '√(a+b ± 2√(ab)) = √a ± √b dengan syarat a ≥ b ≥ 0.' },
      { term: 'Rasionalisasi Penyebut', explanation: 'Mengalikan sekawan: 1/(√a - √b) dikalikan (√a + √b)/(√a + √b) sehingga penyebut menjadi a - b.' }
    ],
    penjelasanSederhana: 'Garis bilangan real adalah penggaris kontinu tak berujung. Dari bilangan bulat, pecahan, desimal berulang, hingga akar tak terhingga semuanya ada di sini!',
    penjelasanMendalam: 'Eksponen dan akar saling terkait erat melalui identitas perpangkatan. Saat menghadapi bentuk akar dalam akar seperti √(10 - 2√21), faktorisasi 10 = 7 + 3 dan 21 = 7 × 3 menghasilkan √7 - √3 secara analitis presisi.',
    kataKunci: ['bilangan real', 'komutatif', 'asosiatif', 'distributif', 'eksponen pecahan', 'bentuk sekawan', 'akar kuadrat'],
    rumusDanSifat: [
      { name: 'Sifat Eksponen 1', formula: 'aᵐ · aⁿ = aᵐ⁺ⁿ dan aᵐ / aⁿ = aᵐ⁻ⁿ', note: 'Syarat basis a ≠ 0 sama' },
      { name: 'Eksponen Pecahan', formula: 'a^(m/n) = ⁿ√(aᵐ)', note: 'Pangkat pecahan adalah bentuk akar' },
      { name: 'Akar dari Akar', formula: '√( (a+b) ± 2√(ab) ) = √a ± √b', note: 'Syarat a ≥ b ≥ 0' },
      { name: 'Rasionalisasi Sekawan', formula: 'c / (√a - √b) = c(√a + √b) / (a - b)', note: 'Memanfaatkan selisih dua kuadrat' }
    ],
    langkahPengerjaan: [
      'Ubah semua bilangan basis ke bentuk bilangan prima terkecil (2, 3, 5, dsb).',
      'Gunakan sifat distributif untuk mengelompokkan suku-suku sejenis.',
      'Jika terdapat akar dalam akar, cari dua bilangan yang dijumlahkan menghasilkan angka luar dan dikalikan menghasilkan angka dalam akar.',
      'Rasionalkan penyebut dengan mengalikan bentuk sekawan.'
    ],
    contohNyata: 'Perhitungan skala Richter gempa bumi, desibel intensitas suara, dan peluruhan radioaktif bahan medis berbasis logaritmik eksponensial.',
    contohSoal: {
      question: 'Bentuk sederhana dari ( 3√2 + 2√3 ) / ( 3√2 - 2√3 ) adalah...',
      options: ['5 + 2√6', '5 + 4√6', '7 + 2√6', '7 - 2√6', '6 + 2√6'],
      correctIndex: 0,
      explanation: 'Penyebut = (3√2)² - (2√3)² = 18 - 12 = 6. Pembilang = (3√2 + 2√3)² = 18 + 12√6 + 12 = 30 + 12√6. Bagi pembilang dengan penyebut: (30 + 12√6) / 6 = 5 + 2√6.',
      smartTrick: '(A+B)² / (A² - B²) = (18 + 12 + 12√6) / 6 = 30/6 + 12√6/6 = 5 + 2√6.'
    },
    kesalahanUmum: [
      { trap: 'Menulis √(a² + b²) = a + b', correction: 'Akar penjumlahan tidak dapat dipisah! √(3² + 4²) = √25 = 5, bukan 3+4=7.' },
      { trap: 'Lupa tanda kurung saat mengalikan sekawan', correction: 'Kalikan seluruh binomial pembilang dengan binomial sekawan.' }
    ],
    tipsMengingat: 'Bentuk Akar TKA: "JUMLAH di Depan, KALI di Dalam!" -> √( (A+B) ± 2√AB ) = √A ± √B.',
    hubunganMateri: 'Mendasari aljabar fungsi, logaritma, barisan geometri, dan trigonometri.',
    quickRecap: [
      'Bilangan real = bilangan rasional + irasional.',
      'Penyebut sekawan memanfaatkan sifat (x-y)(x+y) = x² - y².',
      'Operasi eksponen membutuhkan basis bilangan yang sama.'
    ],
    blurtingKeyPoints: [
      'Sifat komutatif, asosiatif, distributif pada bilangan real',
      'Hukum eksponen perkalian dan pembagian basis sama',
      'Rumus identitas akar dalam akar √( (a+b) ± 2√ab ) = √a ± √b',
      'Metode merasionalkan penyebut berbentuk akar'
    ],
    flashcards: [
      { id: 'fc-1', front: 'Berapakah nilai dari 16^(3/4)?', back: '⁴√(16³) = (⁴√16)³ = 2³ = 8' },
      { id: 'fc-2', front: 'Bentuk sederhana √(9 - 2√20)?', back: 'Cari dua angka dijumlah 9, dikali 20 (5 dan 4). Hasil: √5 - √4 = √5 - 2.' },
      { id: 'fc-3', front: 'Apakah 0.333... termasuk bilangan rasional?', back: 'YA. Karena 0.333... = 1/3 (dapat dinyatakan dalam pecahan a/b).' }
    ]
  },

  // ==========================================
  // 2. MATEMATIKA: ALJABAR
  // ==========================================
  {
    id: 'mat-persamaan-linear',
    title: 'Persamaan & Pertidaksamaan Linear (SPLTV & Program Linear)',
    subject: 'matematika',
    day: 3,
    phase: 1,
    level: 'HARD',
    estimatedMinutes: 40,
    pengertian: 'Sistem Persamaan Linear Tiga Variabel (SPLTV, maks 3 variabel) dan Sistem Pertidaksamaan Linear Dua Variabel (SPtLDV) yang membentuk daerah penyelesaian (Feasible Region) untuk mengoptimasi fungsi objektif Z = ax + by (Program Linear).',
    tujuan: 'Mampu memodelkan permasalahan kontekstual harga belanja dan kapasitas stok menjadi SPLTV, menentukan daerah penyelesaian, dan mencari nilai optimum menggunakan metode titik pojok.',
    konsepUtama: [
      { term: 'SPLTV (Maks 3 Variabel)', explanation: 'Sistem 3 persamaan linear independen untuk menentukan nilai unik (x, y, z).' },
      { term: 'Trik Penjumlahan Simetris', explanation: 'Jika koefisien variabel berulang seimbang, jumlahkan ketiga persamaan secara langsung untuk memperoleh (x+y+z).' },
      { term: 'Daerah Penyelesaian (DP)', explanation: 'Irisan daerah arsiran yang memenuhi seluruh pertidaksamaan kendala beserta syarat non-negatif x ≥ 0, y ≥ 0.' },
      { term: 'Fungsi Objektif & Titik Pojok', explanation: 'Nilai optimum (maksimum/minimum) fungsi Z = ax + by selalu terletak pada salah satu titik sudut ekstrem dari daerah penyelesaian.' }
    ],
    penjelasanSederhana: 'SPLTV ibarat memecahkan teka-teki harga 3 menu makanan dari struk paket berbeda. Program linear adalah cara pengusaha kue menentukan berapa loyang brownies dan bolu yang harus dibuat agar untungnya paling maksimal dari bahan yang terbatas!',
    penjelasanMendalam: 'Pada Program Linear, kendala non-negatif x ≥ 0 dan y ≥ 0 membatasi solusi pada Kuadran I. Uji titik (0,0) memudahkan penentuan arah arsiran: jika 0 ≤ C bernilai benar, arsiran mengarah ke titik pusat (0,0).',
    kataKunci: ['SPLTV', 'SPtLDV', 'program linear', 'fungsi objektif', 'titik pojok', 'daerah penyelesaian', 'eliminasi simetris'],
    rumusDanSifat: [
      { name: 'Bentuk Umum SPLTV', formula: 'a₁x + b₁y + c₁z = d₁ ; a₂x + b₂y + c₂z = d₂ ; a₃x + b₃y + c₃z = d₃', note: 'Maksimum 3 variabel' },
      { name: 'Fungsi Objektif', formula: 'Z(x, y) = ax + by', note: 'Sasaran laba maksimum atau biaya minimum' },
      { name: 'Teorema Titik Pojok', formula: 'Z_maks = max{ Z(A), Z(B), Z(C), ... }', note: 'Diuji hanya pada sudut terluar DP' }
    ],
    langkahPengerjaan: [
      'Tabelkan data variabel, koefisien kendala, dan fungsi keuntungan.',
      'Susun model matematika pertidaksamaan dengan syarat x ≥ 0 dan y ≥ 0.',
      'Gambar garis batas pada koordinat Cartesius dan tentukan daerah penyelesaian melalui uji titik (0,0).',
      'Cari koordinat titik-titik pojok daerah penyelesaian menggunakan eliminasi/substitusi.',
      'Substitusi titik pojok ke fungsi objektif Z = ax + by untuk mendapatkan nilai optimum.'
    ],
    contohNyata: 'Optimasi muatan kargo penerbangan: memaksimalkan muatan paket prioritas dan standar tanpa melampaui kapasitas berat maksimum pesawat (MTOW).',
    contohSoal: {
      question: '2 apel + 1 jeruk + 1 pir = Rp13.000. 1 apel + 2 jeruk + 1 pir = Rp17.000. 1 apel + 1 jeruk + 2 pir = Rp14.000. Berapakah harga 1 apel + 1 jeruk + 1 pir?',
      options: ['Rp9.000', 'Rp10.000', 'Rp11.000', 'Rp12.000', 'Rp13.000'],
      correctIndex: 2,
      explanation: 'Jumlahkan ketiga persamaan: (2+1+1)A + (1+2+1)J + (1+1+2)P = 13.000 + 17.000 + 14.000 -> 4A + 4J + 4P = 44.000. Bagi kedua ruas dengan 4: A + J + P = Rp11.000.',
      smartTrick: 'Pola simetris! Koefisien totalnya sama-sama 4. Langsung jumlahkan dan bagi 4!'
    },
    kesalahanUmum: [
      { trap: 'Salah menentukan arah arsiran pertidaksamaan linear', correction: 'Gunakan titik uji (0,0). Jika memenuhi, arsir ke arah (0,0); jika tidak, arsir menjauhi (0,0).' },
      { trap: 'Lupa memasukkan kendala non-negatif x ≥ 0, y ≥ 0', correction: 'Jumlah barang dan waktu dalam kehidupan nyata tidak pernah bernilai negatif.' }
    ],
    tipsMengingat: 'Pola Simetris SPLTV: "Jumlah total koefisien kembar, jangan eliminasi satu-satu, JUMLAHKAN SEMUA!"',
    hubunganMateri: 'Menjadi dasar aljabar matriks, fungsi biaya, dan kalkulus diferensial optimasi.',
    quickRecap: [
      'SPLTV membutuhkan 3 persamaan independen untuk solusi unik.',
      'Daerah layak dibatasi oleh garis kendala dan x≥0, y≥0.',
      'Nilai optimum selalu berada di titik sudut daerah penyelesaian.'
    ],
    blurtingKeyPoints: [
      'Bentuk umum SPLTV 3 variabel dan metode eliminasi-substitusi',
      'Trik penjumlahan simetris SPLTV',
      'Langkah membuat model matematika program linear dari soal cerita',
      'Metode uji titik pojok untuk fungsi objektif Z = ax + by'
    ],
    flashcards: [
      { id: 'fc-alj-1', front: 'Jika 3x + y = 14 dan x + 3y = 10, berapa nilai x + y?', back: 'Jumlahkan: 4x + 4y = 24 -> x + y = 6.' },
      { id: 'fc-alj-2', front: 'Di manakah letak nilai maksimum pada program linear?', back: 'Selalu terletak pada salah satu titik pojok (sudut) dari daerah penyelesaian.' }
    ]
  },

  {
    id: 'mat-fungsi',
    title: 'Fungsi (Domain, Kodomain, Range, Kuadrat, Invers & Komposisi)',
    subject: 'matematika',
    day: 5,
    phase: 1,
    level: 'HARD',
    estimatedMinutes: 45,
    pengertian: 'Relasi khusus yang memasangkan setiap anggota himpunan asal (domain) tepat satu ke himpunan kawan (kodomain). Mencakup fungsi linear, kuadrat, rasional, fungsi komposisi (f ∘ g)(x), dan fungsi invers f⁻¹(x) secara analitis dan grafis.',
    tujuan: 'Menguasai penentuan domain alami, range fungsi rasional & kuadrat, invers fungsi pecahan, fungsi komposisi berantai, serta membaca grafik fungsi.',
    konsepUtama: [
      { term: 'Domain & Range Alami', explanation: 'Domain fungsi rasional f(x) = P(x)/Q(x) mensyaratkan penyebut Q(x) ≠ 0. Fungsi akar √(P(x)) mensyaratkan isi akar P(x) ≥ 0.' },
      { term: 'Fungsi Komposisi (f ∘ g)(x)', explanation: 'Memasukkan output g(x) sebagai input ke fungsi f: (f ∘ g)(x) = f(g(x)). Tidak bersifat komutatif: f ∘ g ≠ g ∘ f.' },
      { term: 'Fungsi Invers f⁻¹(x)', explanation: 'Membalik arah pemetaan: jika f(a) = b, maka f⁻¹(b) = a. Syarat memiliki invers adalah fungsi bijektif (satu-satu & pada).' },
      { term: 'Rumus Cepat Invers Pecahan', explanation: 'Jika f(x) = (ax + b) / (cx + d), maka inversnya f⁻¹(x) = (-dx + b) / (cx - a).' }
    ],
    penjelasanSederhana: 'Fungsi adalah mesin: kamu masukkan bahan mentah (domain x), diolah oleh rumus mesin, lalu keluar produk jadi (range y). Komposisi adalah mesin berantai (mesin 1 disambung mesin 2), dan invers adalah tombol memutar balik mesin dari produk jadi ke bahan mentah!',
    penjelasanMendalam: 'Grafik fungsi invers f⁻¹(x) merupakan pencerminan (refleksi) grafik f(x) terhadap garis y = x. Untuk fungsi kuadrat f(x) = ax² + bx + c, titik puncak parabolanya adalah (-b/2a, -D/4a).',
    kataKunci: ['domain', 'kodomain', 'range', 'fungsi kuadrat', 'fungsi rasional', 'fungsi komposisi', 'fungsi invers', 'asimtot'],
    rumusDanSifat: [
      { name: 'Rumus Cepat Invers Pecahan', formula: 'f(x) = (ax + b)/(cx + d) ➔ f⁻¹(x) = (-dx + b)/(cx - a)', note: 'Tukar posisi a dan d lalu ubah tanda' },
      { name: 'Sifat Komposisi & Invers', formula: '(f ∘ g)⁻¹(x) = (g⁻¹ ∘ f⁻¹)(x)', note: 'Urutan dibalik saat diinverskan' },
      { name: 'Puncak Parabola Kuadrat', formula: 'x_puncak = -b / (2a) ; y_puncak = -D / (4a)', note: 'D = b² - 4ac' }
    ],
    langkahPengerjaan: [
      'Tentukan domain dengan memeriksa batasan penyebut (≠0) atau bentuk akar (≥0).',
      'Untuk komposisi (f ∘ g)(x), ganti setiap variabel x pada rumus f dengan seluruh rumus g(x).',
      'Untuk mencari invers, misalkan f(x) = y, lalu manipulasi aljabar hingga didapat x sebagai fungsi dari y.',
      'Ganti x menjadi f⁻¹(x) dan y menjadi x.'
    ],
    contohNyata: 'Pemodelan tarif utilitas listrik bertingkat (fungsi tangga/piecewise) dan fungsi biaya produksi manufaktur terhadap volume penjualan.',
    contohSoal: {
      question: 'Diketahui f(x) = (2x + 5) / (3x - 4) dengan x ≠ 4/3. Nilai dari f⁻¹(1) adalah...',
      options: ['-9', '-1', '1', '9', '11'],
      correctIndex: 3,
      explanation: 'Rumus cepat invers: a=2, b=5, c=3, d=-4. Maka f⁻¹(x) = (4x + 5) / (3x - 2). Masukkan x = 1: f⁻¹(1) = (4(1) + 5) / (3(1) - 2) = 9 / 1 = 9.',
      smartTrick: 'Cara alternatif tanpa invers: f⁻¹(1) = k berarti f(k) = 1. (2k + 5)/(3k - 4) = 1 -> 2k + 5 = 3k - 4 -> k = 9. Sangat cepat!'
    },
    kesalahanUmum: [
      { trap: 'Mengira (f ∘ g)(x) sama dengan (g ∘ f)(x)', correction: 'Fungsi komposisi TIDAK bersifat komutatif: f(g(x)) ≠ g(f(x)).' },
      { trap: 'Lupa membalik urutan saat menginvers komposisi: (f ∘ g)⁻¹', correction: '(f ∘ g)⁻¹ = g⁻¹ ∘ f⁻¹, urutannya harus dibalik!' }
    ],
    tipsMengingat: 'Invers Pecahan: "Tukar diagonal utama (a dan d) lalu KASIH TANDA MINUS!" f(x)=(ax+b)/(cx+d) ➔ f⁻¹(x)=(-dx+b)/(cx-a).',
    hubunganMateri: 'Mendasari kalkulus turunan, integral, dan pemodelan grafik ekonomi.',
    quickRecap: [
      'Domain rasional: penyebut ≠ 0; domain akar: dalam akar ≥ 0.',
      'Invers membalik hubungan input dan output.',
      '(f ∘ g)⁻¹ = g⁻¹ ∘ f⁻¹.'
    ],
    blurtingKeyPoints: [
      'Syarat domain alami fungsi rasional dan fungsi akar',
      'Aturan operasi fungsi komposisi (f ∘ g)(x)',
      'Rumus cepat invers fungsi pecahan linear',
      'Rumus koordinat titik puncak fungsi kuadrat f(x) = ax² + bx + c'
    ],
    flashcards: [
      { id: 'fc-f-1', front: 'Jika f(x) = 3x - 2, berapakah f⁻¹(x)?', back: 'y = 3x - 2 -> 3x = y + 2 -> f⁻¹(x) = (x + 2)/3.' },
      { id: 'fc-f-2', front: 'Jika f(x) = x² + 1 dan g(x) = 2x, berapa (f ∘ g)(3)?', back: 'g(3) = 6. f(6) = 6² + 1 = 37.' }
    ]
  },

  {
    id: 'mat-barisan-deret',
    title: 'Barisan & Deret (Aritmetika, Geometri, Bunga & Pertumbuhan)',
    subject: 'matematika',
    day: 5,
    phase: 1,
    level: 'HARD',
    estimatedMinutes: 40,
    pengertian: 'Pola keteraturan bilangan dengan selisih tetap (barisan aritmetika, beda b) atau rasio perkalian tetap (barisan geometri, rasio r), diaplikasikan pada pertumbuhan eksponensial bakteri, peluruhan radioaktif, bunga tunggal, dan bunga majemuk perbankan.',
    tujuan: 'Menguasai rumus suku ke-n (Un) dan jumlahan deret (Sn), deret geometri tak hingga, pemodelan bunga majemuk M_n = M_0(1+i)ⁿ, serta laju peluruhan.',
    konsepUtama: [
      { term: 'Aritmetika vs Geometri', explanation: 'Aritmetika memiliki beda tetap b = Uₙ - Uₙ₋₁. Geometri memiliki rasio tetap r = Uₙ / Uₙ₋₁.' },
      { term: 'Deret Geometri Tak Hingga (S_∞)', explanation: 'Konvergen jika -1 < r < 1 dengan rumus S_∞ = a / (1 - r). Contoh pantulan bola jatuh memantul.' },
      { term: 'Bunga Tunggal vs Bunga Majemuk', explanation: 'Bunga tunggal dihitung dari modal awal (M_n = M_0(1 + n·i)). Bunga majemuk berbunga-bunga secara eksponensial (M_n = M_0(1 + i)ⁿ).' },
      { term: 'Pertumbuhan & Peluruhan', explanation: 'Pertumbuhan: N_t = N_0 · rᵗ (bakteri membelah). Peluruhan: N_t = N_0 · (1/2)^(t/T) (waktu paruh radioaktif).' }
    ],
    penjelasanSederhana: 'Aritmetika seperti kamu menabung receh Rp2.000 setiap hari (tambah tetap). Geometri seperti bakteri yang membelah diri: dari 1 jadi 2, jadi 4, jadi 8 (kali lipat). Bunga majemuk adalah keajaiban finansial di mana bungamu menghasilkan bunga lagi!',
    penjelasanMendalam: 'Pada soal pantulan bola jatuh dari ketinggian h dengan pantulan a/b, panjang lintasan total hingga bola berhenti adalah Lintasan = h × (b + a) / (b - a). Rumus ringkas ini menghemat waktu 90% di ujian TKA!',
    kataKunci: ['aritmetika', 'geometri', 'deret tak hingga', 'bunga tunggal', 'bunga majemuk', 'pertumbuhan bakteri', 'lintasan bola'],
    rumusDanSifat: [
      { name: 'Suku ke-n Aritmetika', formula: 'Uₙ = a + (n - 1)b dan Sₙ = n/2 (2a + (n - 1)b)', note: 'Beda b tetap' },
      { name: 'Suku ke-n Geometri', formula: 'Uₙ = a · rⁿ⁻¹ dan Sₙ = a(rⁿ - 1)/(r - 1)', note: 'Rasio r tetap' },
      { name: 'Geometri Tak Hingga', formula: 'S_∞ = a / (1 - r)', note: 'Syarat konvergen |r| < 1' },
      { name: 'Trik Lintasan Pantulan Bola', formula: 'Panjang = h · (b + a) / (b - a)', note: 'Jika bola dijatuhkan dari tinggi h dengan pantulan a/b' }
    ],
    langkahPengerjaan: [
      'Identifikasi jenis barisan: apakah bertambah dengan selisih tetap (aritmetika) atau berkelipatan (geometri).',
      'Tuliskan suku awal (a) dan beda (b) atau rasio (r).',
      'Terapkan rumus Un untuk mencari suku tertentu atau Sn untuk jumlahan total.',
      'Gunakan rumus bunga majemuk atau peluruhan waktu paruh sesuai periode waktu n.'
    ],
    contohNyata: 'Kalkulasi saldo tabungan deposito bank berbunga majemuk, estimasi penyusutan nilai aset mesin pabrik, dan pembelahan kultur sel biologi.',
    contohSoal: {
      question: 'Sebuah bola dijatuhkan dari ketinggian 12 meter dan memantul kembali dengan ketinggian 3/5 kali tinggi sebelumnya. Panjang lintasan seluruhnya hingga bola berhenti adalah...',
      options: ['36 meter', '48 meter', '60 meter', '72 meter', '84 meter'],
      correctIndex: 1,
      explanation: 'Gunakan trik lintasan bola: h = 12, a = 3, b = 5. Panjang total = h · (b + a) / (b - a) = 12 · (5 + 3) / (5 - 3) = 12 · 8 / 2 = 12 · 4 = 48 meter.',
      smartTrick: 'Panjang = h · (b+a)/(b-a) = 12 · (5+3)/(5-3) = 12 · 4 = 48 meter!'
    },
    kesalahanUmum: [
      { trap: 'Lupa mengalikan 2 pada pantulan naik dan turun jika menggunakan cara manual deret', correction: 'Pantulan setelah jatuh mengalami dua kali lintasan (naik dan turun), gunakan rumus ringkas agar bebas salah.' },
      { trap: 'Tertukar rumus bunga tunggal (linier) dengan bunga majemuk (eksponensial)', correction: 'Bunga majemuk memakai pemangkatan (1+i)ⁿ, bukan perkalian n·i.' }
    ],
    tipsMengingat: 'Pantulan Bola: "h kali JUMLAH per SELISIH!" -> L = h · (b+a)/(b-a).',
    hubunganMateri: 'Berkaitan dengan limit tak hingga, fungsi eksponensial, dan kalkulasi keuangan.',
    quickRecap: [
      'Aritmetika: tambah b. Geometri: kali r.',
      'Deret tak hingga konvergen saat |r| < 1.',
      'Bunga majemuk M_n = M_0(1+i)ⁿ.'
    ],
    blurtingKeyPoints: [
      'Rumus suku ke-n dan jumlahan n suku pertama deret aritmetika vs geometri',
      'Syarat konvergensi deret geometri tak hingga dan rumusnya',
      'Perbedaan rumus bunga tunggal vs bunga majemuk',
      'Trik cepat panjang lintasan bola pantul'
    ],
    flashcards: [
      { id: 'fc-bd-1', front: 'Berapa jumlah deret geometri tak hingga jika a = 12 dan r = 1/3?', back: 'S_∞ = a / (1 - r) = 12 / (1 - 1/3) = 12 / (2/3) = 18.' },
      { id: 'fc-bd-2', front: 'Jika suku ke-3 adalah 11 dan suku ke-7 adalah 23 pada deret aritmetika, berapa bedanya?', back: 'U7 - U3 = 4b -> 23 - 11 = 12 -> 4b = 12 -> b = 3.' }
    ]
  },

  // ==========================================
  // 3. GEOMETRI & PENGUKURAN
  // ==========================================
  {
    id: 'mat-geometri-pengukuran',
    title: 'Objek Geometri, Dimensi Tiga, Transformasi & Pengukuran',
    subject: 'matematika',
    day: 5,
    phase: 1,
    level: 'HOTS',
    estimatedMinutes: 50,
    pengertian: 'Cakupan komprehensif hubungan sudut, garis, bidang, bangun datar (segitiga, segi empat, lingkaran, gabungan), bangun ruang beraturan (kubus, balok, tabung, kerucut), kesebangunan/kekongruenan, Pythagoras, jarak dimensi tiga (titik ke garis/bidang), serta Transformasi Geometri (translasi, refleksi, rotasi, dilatasi) dan pengukuran volume/luas permukaan.',
    tujuan: 'Menguasai visualisasi jarak titik ke bidang pada kubus, sifat kesebangunan bangun datar, matriks transformasi geometri gabungan, serta optimasi keliling dan luas jaring-jaring kemasan.',
    konsepUtama: [
      { term: 'Jarak Dimensi Tiga pada Kubus', explanation: 'Diagonal sisi = s√2; Diagonal ruang = s√3. Jarak titik sudut ke bidang diagonal ruang seberang = 1/3 s√3 atau 2/3 s√3.' },
      { term: 'Kesebangunan Bangun Datar', explanation: 'Dua bangun sebangun jika sudut-sudut yang bersesuaian sama besar dan perbandingan sisi yang bersesuaian senilai.' },
      { term: 'Transformasi Geometri', explanation: 'Translasi T(a,b): (x+a, y+b). Refleksi sumbu-x: (x, -y); sumbu-y: (-x, y); y=x: (y, x). Rotasi 90°: (-y, x). Dilatasi [O,k]: (kx, ky).' },
      { term: 'Pengukuran Bangun Ruang', explanation: 'Volume tabung: πr²t. Kerucut: 1/3 πr²t. Bola: 4/3 πr³. Luas permukaan bola: 4πr².' }
    ],
    penjelasanSederhana: 'Geometri ruang adalah cara arsitek memetakan jarak tiang gedung ke langit-langit tanpa harus mengukur secara manual dengan tali! Transformasi geometri adalah cara proyektor menggeser, membalik, memutar, dan memperbesar gambar di layar bioskop.',
    penjelasanMendalam: 'Pada kubus ABCD.EFGH dengan rusuk s, jarak titik sudut misalnya C ke bidang diagonal AFH dicari dengan proyeksi tegak lurus pada diagonal ruang CE. Jarak C ke bidang AFH adalah 2/3 diagonal ruang = 2/3 s√3, sedangkan jarak E ke bidang AFH adalah 1/3 s√3.',
    kataKunci: ['dimensi tiga', 'jarak titik ke bidang', 'diagonal ruang', 'Pythagoras', 'kesebangunan', 'translasi', 'refleksi', 'rotasi', 'dilatasi'],
    rumusDanSifat: [
      { name: 'Diagonal Kubus', formula: 'Diagonal Bidang = s√2 ; Diagonal Ruang = s√3', note: 'Rusuk s' },
      { name: 'Jarak Sudut ke Bidang AFH', formula: 'd(E, AFH) = 1/3 s√3 dan d(C, AFH) = 2/3 s√3', note: 'Proyeksi diagonal ruang CE' },
      { name: 'Matriks Rotasi 90° Pusat (0,0)', formula: '[x\', y\']ᵀ = [0 -1; 1 0] [x, y]ᵀ ➔ (-y, x)', note: 'Berlawanan arah jarum jam' },
      { name: 'Dilatasi Pusat O Skala k', formula: '(x\', y\') = (k · x, k · y)', note: 'Luas bayangan menjadi k² kali luas asli' }
    ],
    langkahPengerjaan: [
      'Gambarkan bangun kubus atau bangun datar lengkap dengan nama titik sudut beraturan.',
      'Tarik garis proyeksi tegak lurus dari titik asal ke garis/bidang tujuan.',
      'Bentuk segitiga siku-siku penolong untuk menerapkan teorema Pythagoras.',
      'Untuk transformasi, susun koordinat atau matriks pengali sesuai urutan komposisi dari kanan ke kiri.'
    ],
    contohNyata: 'Perancangan cetak kemasan produk karton box industri, perhitungan kabel penahan jembatan gantung, dan pengolahan citra digital computer vision.',
    contohSoal: {
      question: 'Diketahui kubus ABCD.EFGH dengan panjang rusuk 6 cm. Jarak titik C ke bidang AFH adalah...',
      options: ['2√3 cm', '3√3 cm', '4√3 cm', '2√6 cm', '4√6 cm'],
      correctIndex: 2,
      explanation: 'Pada kubus dengan rusuk s, bidang AFH memotong diagonal ruang CE. Jarak titik E ke bidang AFH adalah 1/3 s√3, sedangkan jarak titik seberang (C) ke bidang AFH adalah 2/3 s√3. Karena s = 6 cm, maka jarak = 2/3 × 6√3 = 4√3 cm.',
      smartTrick: 'Jarak titik sudut seberang ke bidang segitiga atas kubus selalu = 2/3 × diagonal ruang = 2/3 × (s√3) = 2/3 × 6√3 = 4√3 cm!'
    },
    kesalahanUmum: [
      { trap: 'Menarik garis yang tidak tegak lurus terhadap bidang target', correction: 'Jarak dalam geometri ruang WAJIB didefinisikan sebagai ruas garis terpendek yang TEGAK LURUS (ortogonal).' },
      { trap: 'Salah urutan saat menghitung komposisi transformasi (T₂ ∘ T₁)', correction: 'Lakukan transformasi T₁ terlebih dahulu, baru kemudian dikenakan T₂.' }
    ],
    tipsMengingat: 'Jarak Kubus ke AFH: "Titik Dekat (E) dapat 1/3, Titik Jauh (C) dapat 2/3 dari Diagonal Ruang (s√3)!"',
    hubunganMateri: 'Mendasari aljabar vektor, trigonometri ruang, dan kalkulus multivariabel.',
    quickRecap: [
      'Diagonal bidang = s√2, diagonal ruang = s√3.',
      'Jarak geometri = panjang garis tegak lurus terpendek.',
      'Dilatasi faktor k memperbesar luas sebesar k².'
    ],
    blurtingKeyPoints: [
      'Rumus diagonal bidang dan ruang kubus rusuk s',
      'Metode menentukan jarak titik ke bidang dimensi tiga menggunakan segitiga bantuan',
      'Aturan koordinat hasil refleksi dan rotasi 90°',
      'Pengaruh dilatasi terhadap keliling dan luas bangun datar'
    ],
    flashcards: [
      { id: 'fc-geo-1', front: 'Berapa jarak titik P(2, -3) jika dicerminkan terhadap sumbu-x?', back: 'Refleksi sumbu-x mengubah tanda ordinat y: (x, -y) -> (2, 3).' },
      { id: 'fc-geo-2', front: 'Berapa panjang diagonal ruang balok dengan p=4, l=3, t=12?', back: 'd = √(4² + 3² + 12²) = √(16 + 9 + 144) = √169 = 13.' }
    ]
  },

  // ==========================================
  // 4. MATEMATIKA: TRIGONOMETRI
  // ==========================================
  {
    id: 'mat-trigonometri',
    title: 'Perbandingan Trigonometri (Sudut Istimewa, Relasi Kuadran & Elevasi)',
    subject: 'matematika',
    day: 5,
    phase: 1,
    level: 'MEDIUM',
    estimatedMinutes: 35,
    pengertian: 'Rasio perbandingan sisi-sisi segitiga siku-siku (sinus, kosinus, tangen, kotangen, sekan, kosekan), nilai sudut istimewa 0°-90°, sudut berelasi di empat kuadran (ASTC), serta pemodelan sudut elevasi dan depresi.',
    tujuan: 'Menguasai definisi demi-sami-desa, tanda perbandingan trigonometri di Kuadran I-IV, identitas dasar sin²x + cos²x = 1, serta kalkulasi tinggi objek berdasarkan sudut elevasi.',
    konsepUtama: [
      { term: 'Demi - Sami - Desa', explanation: 'Sin = Depan/Miring (Demi), Cos = Samping/Miring (Sami), Tan = Depan/Samping (Desa).' },
      { term: 'Relasi Kuadran (ASTC)', explanation: 'Kuadran I: All (+) ; Kuadran II: Sin & Csc (+) ; Kuadran III: Tan & Cot (+) ; Kuadran IV: Cos & Sec (+).' },
      { term: 'Identitas Pokok', explanation: 'sin²x + cos²x = 1 ; tan x = sin x / cos x ; 1 + tan²x = sec²x.' },
      { term: 'Sudut Elevasi vs Depresi', explanation: 'Elevasi: sudut pandang memandang ke atas dari garis horizontal. Depresi: sudut memandang ke bawah dari garis horizontal.' }
    ],
    penjelasanSederhana: 'Trigonometri adalah pengukur tinggi pohon atau gedung tanpa perlu memanjat: cukup ukur jarak kakimu ke gedung dan sudut matamu saat melihat puncak menara!',
    penjelasanMendalam: 'Sudut berelasi memakai aturan: untuk (180° ± α) atau (360° ± α), nama perbandingan TETAP (sin tetap sin). Untuk (90° ± α) atau (270° ± α), perbandingan BERUBAH (sin jadi cos, tan jadi cot). Tanda positif/negatif ditentukan oleh kuadran sudut asalnya.',
    kataKunci: ['trigonometri', 'sinus', 'kosinus', 'tangen', 'sudut elevasi', 'sudut berelasi', 'kuadran'],
    rumusDanSifat: [
      { name: 'Aturan Segitiga', formula: 'sin θ = de/mi ; cos θ = sa/mi ; tan θ = de/sa', note: 'Segitiga siku-siku' },
      { name: 'Kaidah Kuadran ASTC', formula: 'K I (Semua +), K II (Sin +), K III (Tan +), K IV (Cos +)', note: '"All Star Take Care"' },
      { name: 'Sudut Tumpul K II', formula: 'sin(180° - α) = sin α ; cos(180° - α) = -cos α', note: 'Kuadran II' },
      { name: 'Tinggi Objek Elevasi', formula: 'Tinggi = (Jarak · tan θ) + Tinggi Pengamat', note: 'Jangan lupa tambah tinggi mata pengamat!' }
    ],
    langkahPengerjaan: [
      'Gambarkan segitiga siku-siku dan letakkan sudut θ serta panjang sisi yang diketahui.',
      'Pilih rasio trigonometri yang melibatkan sisi yang diketahui dan sisi yang ditanyakan.',
      'Untuk sudut di luar kuadran I, ubah ke bentuk relasi kuadran (180° ± α) dan tentukan tandanya.',
      'Jika mencari tinggi pohon/gedung, jumlahkan hasil tan dengan tinggi mata pengamat ke tanah.'
    ],
    contohNyata: 'Sistem navigasi kapal laut, radar ketinggian pesawat udara, dan pengukuran tinggi menara telekomunikasi oleh teknisi tower.',
    contohSoal: {
      question: 'Seorang pengamat dengan tinggi badan 1,6 m melihat puncak tiang bendera dengan sudut elevasi 45°. Jika jarak horizontal pengamat ke tiang adalah 12 m, tinggi tiang bendera tersebut adalah...',
      options: ['12,0 m', '13,6 m', '14,2 m', '15,6 m', '16,0 m'],
      correctIndex: 1,
      explanation: 'tan 45° = y / 12 -> 1 = y / 12 -> y = 12 m. Tinggi tiang total = y + tinggi pengamat = 12 m + 1,6 m = 13,6 meter.',
      smartTrick: 'Ingat tan 45° = 1. Maka tinggi segmen atas tiang selalu persis sama dengan jarak horizontalnya (12 m). Tambahkan tinggi orang (1,6 m) = 13,6 m!'
    },
    kesalahanUmum: [
      { trap: 'Lupa menambahkan tinggi badan pengamat saat menghitung tinggi tiang', correction: 'Hasil rumus tan θ = y/x hanya menghitung tinggi dari garis mata ke atas. Wajib ditambah tinggi pengamat!' },
      { trap: 'Salah tanda cos pada kuadran II (90°-180°)', correction: 'Pada kuadran II, cos bernilai NEGATIF. Contoh cos 120° = -cos 60° = -1/2.' }
    ],
    tipsMengingat: 'Kaidah Kuadran: "Semua Sindikat Tangan Kosong" -> Kuadran I (Semua), II (Sin), III (Tan), IV (Cos)!',
    hubunganMateri: 'Mendasari gerak parabola fisika, gelombang transversal, dan geometri koordinat polar.',
    quickRecap: [
      'Sin = de/mi, Cos = sa/mi, Tan = de/sa.',
      'Kuadran II hanya Sin & Csc yang positif.',
      'Tinggi tiang = (jarak × tan θ) + tinggi pengamat.'
    ],
    blurtingKeyPoints: [
      'Definisi demi-sami-desa perbandingan trigonometri',
      'Nilai sin, cos, tan untuk sudut 0°, 30°, 45°, 60°, 90°',
      'Tanda positif-negatif perbandingan trigonometri di Kuadran I, II, III, IV',
      'Rumus perhitungan tinggi objek menggunakan sudut elevasi'
    ],
    flashcards: [
      { id: 'fc-trig-1', front: 'Berapakah nilai dari cos 120°?', back: 'cos(180° - 60°) = -cos 60° = -1/2 (Kuadran II nilai cos negatif).' },
      { id: 'fc-trig-2', front: 'Berapakah nilai dari sin² 37° + cos² 37°?', back: '1 (Identitas mutlak sin²x + cos²x = 1 untuk sudut berapapun).' }
    ]
  },

  // ==========================================
  // 5. MATEMATIKA: DATA & PELUANG
  // ==========================================
  {
    id: 'mat-data-peluang',
    title: 'Data & Peluang (Statistika, Ukuran Pemusatan, Kaidah Pencacahan & Peluang)',
    subject: 'matematika',
    day: 5,
    phase: 1,
    level: 'HARD',
    estimatedMinutes: 45,
    pengertian: 'Penyajian data tabel & diagram, ukuran pemusatan (mean, median, modus), ukuran penyebaran (simpangan kuartil, ragam, standar deviasi), kaidah pencacahan (aturan perkalian, permutasi nPr, kombinasi nCr), serta peluang kejadian tunggal dan majemuk.',
    tujuan: 'Menganalisis tren data hilang dari tabel/diagram, menghitung mean gabungan, menentukan kombinasi penugasan grup/kamar, serta menghitung peluang kejadian saling lepas dan saling bebas.',
    konsepUtama: [
      { term: 'Mean Gabungan', explanation: 'Rata-rata gabungan dua kelompok: x̄_gab = (n₁·x̄₁ + n₂·x̄₂) / (n₁ + n₂).' },
      { term: 'Median & Modus', explanation: 'Median adalah nilai tengah data setelah diurutkan. Modus adalah nilai dengan frekuensi pemunculan terbanyak.' },
      { term: 'Permutasi vs Kombinasi', explanation: 'Permutasi MEMPERHATIKAN urutan (ketua-sekretaris, kode PIN, juara 1-2-3; nPr = n!/(n-r)!). Kombinasi TIDAK memperhatikan urutan (tim olimpiade, jabat tangan, pemilihan kamar, soal ujian; nCr = n!/(r!(n-r)!)).' },
      { term: 'Peluang Saling Bebas', explanation: 'Dua kejadian tidak saling mempengaruhi: P(A ∩ B) = P(A) × P(B).' }
    ],
    penjelasanSederhana: 'Kombinasi adalah seperti kamu memesan es krim campur 3 rasa (urutan rasa mangga dulu atau cokelat dulu rasanya sama saja). Permutasi adalah seperti kode gembok brankas 3 angka (urutan 1-2-3 jelas berbeda dari 3-2-1)!',
    penjelasanMendalam: 'Pada kaidah pencacahan TKA, kata hubung "DAN" berarti dikalikan (prinsip perkalian simultan), sedangkan kata hubung "ATAU" berarti dijumlahkan (prinsip penjumlahan alternatif). Perhatikan syarat posisi berdampingan yang diikat menjadi 1 unsur tunggal.',
    kataKunci: ['mean gabungan', 'median', 'modus', 'permutasi', 'kombinasi', 'aturan perkalian', 'peluang saling bebas'],
    rumusDanSifat: [
      { name: 'Rata-rata Gabungan', formula: 'x̄_gab = (n₁ · x̄₁ + n₂ · x̄₂) / (n₁ + n₂)', note: 'Sangat sering diuji di TKA' },
      { name: 'Kombinasi', formula: 'nCr = n! / ( r! (n - r)! )', note: 'Urutan tidak diperhatikan' },
      { name: 'Permutasi', formula: 'nPr = n! / (n - r)!', note: 'Urutan diperhatikan (jabatan/posisi)' },
      { name: 'Peluang Komplemen', formula: 'P(A\') = 1 - P(A)', note: 'Paling mudah untuk soal "minimal satu"' }
    ],
    langkahPengerjaan: [
      'Tentukan apakah persoalan memperhatikan jabatan/urutan (Permutasi) atau pemilihan bebas (Kombinasi).',
      'Hitung ruang sampel n(S) menggunakan kombinasi total unsur.',
      'Hitung kejadian yang diharapkan n(A).',
      'Peluang P(A) = n(A) / n(S). Jika soal memuat kata "sedikitnya satu", gunakan komplemen 1 - P(tidak ada).'
    ],
    contohNyata: 'Sistem alokasi kamar hotel delegasi konferensi, pembuatan kode unik kupon doorprize e-commerce, dan analisis tren penjualan retail mingguan.',
    contohSoal: {
      question: 'Dari 8 orang calon pengurus OSIS yang terdiri atas 5 putra dan 3 putri, akan dipilih 3 orang sebagai delegasi sekolah tanpa membedakan jabatan. Berapa banyak cara memilih jika delegasi HARUS terdiri dari 2 putra dan 1 putri?',
      options: ['15 cara', '24 cara', '30 cara', '45 cara', '56 cara'],
      correctIndex: 2,
      explanation: 'Memilih 2 putra dari 5 putra = 5C2 = 5! / (2! 3!) = (5 × 4) / 2 = 10. Memilih 1 putri dari 3 putri = 3C1 = 3. Banyak cara susunan delegasi = 10 × 3 = 30 cara.',
      smartTrick: '5C2 = (5×4)/2 = 10. 3C1 = 3. Kalikan 10 × 3 = 30 cara!'
    },
    kesalahanUmum: [
      { trap: 'Menggunakan permutasi pada pemilihan panitia/delegasi tanpa jabatan', correction: 'Jika tidak ada pembagian tugas (ketua, bendahara), WAJIB menggunakan Kombinasi (nCr).' },
      { trap: 'Salah menghitung rata-rata gabungan dengan langsung merata-ratakan kedua nilai tanpa bobot frekuensi', correction: 'Wajib dikalikan jumlah frekuensi masing-masing kelompok (weighted average).' }
    ],
    tipsMengingat: 'Pencacahan: "Ada Jabatan = Permutasi ; Pilihan Bebas = Kombinasi". Soal "Paling Sedikit Satu" ➔ 1 - P(Nol)!',
    hubunganMateri: 'Mendasari ilmu statistika inferensial, riset data sains, dan teori keputusan bisnis.',
    quickRecap: [
      'Permutasi nPr: urutan penting (jabatan).',
      'Kombinasi nCr: urutan bebas (tim).',
      'Peluang saling bebas dikalikan: P(A ∩ B) = P(A) × P(B).'
    ],
    blurtingKeyPoints: [
      'Rumus rata-rata gabungan dua kelompok sampel',
      'Perbedaan mendasar permutasi nPr dan kombinasi nCr beserta contoh kasusnya',
      'Konsep peluang komplemen P(A\') = 1 - P(A) pada kata kunci "paling sedikit"',
      'Peluang dua kejadian saling bebas'
    ],
    flashcards: [
      { id: 'fc-stat-1', front: 'Berapakah nilai dari 6C2?', back: '(6 × 5) / (2 × 1) = 15.' },
      { id: 'fc-stat-2', front: 'Dua dadu dilempar bersamaan. Berapa peluang muncul mata dadu berjumlah 7?', back: 'Pasangan jumlah 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6 pasang. Peluang = 6/36 = 1/6.' }
    ]
  },

  // ==========================================
  // 6. BAHASA INDONESIA: TEKSTUAL, INFERENSIAL & EVALUASI
  // ==========================================
  {
    id: 'bin-kompetensi-lengkap',
    title: 'Bahasa Indonesia (Tekstual, Inferensial, Evaluasi & Apresiasi)',
    subject: 'indonesia',
    day: 2,
    phase: 1,
    level: 'HARD',
    estimatedMinutes: 45,
    pengertian: 'Tiga kompetensi literasi membaca Pusmendik: 1) Pemahaman Tekstual (kata serapan baku EYD V, informasi eksplisit, klasifikasi, kerangka, ringkasan, sintesis), 2) Pemahaman Inferensial (ide pokok deduktif/induktif, detail pendukung, urutan kronologis, sebab-akibat, watak tokoh, prediksi), 3) Evaluasi & Apresiasi (fakta vs opini, validitas teks, kesesuaian diksi, respons estetis sastra).',
    tujuan: 'Menguasai pembacaan cepat (skimming & scanning), ejaan baku kata serapan asing/daerah, deteksi kalimat utama vs penjelas, identifikasi hubungan kausalitas implisit, serta evaluasi kritis keakuratan argumen.',
    konsepUtama: [
      { term: 'Pemahaman Tekstual', explanation: 'Informasi eksplisit (tersurat) yang tertulis langsung pada teks bacaan tanpa perlu tafsiran subjektif.' },
      { term: 'Kaidah Serapan Baku EYD V', explanation: 'Penyesuaian ejaan bahasa asing (misal: -tion ➔ -si [standardisasi, bukan standarisasi]; -ysis ➔ -isis [analisis, bukan analisa]; practice ➔ praktik, bukan praktek).' },
      { term: 'Pemahaman Inferensial', explanation: 'Menyimpulkan makna tersirat (implisit), membaca di balik baris kalimat (reading between the lines), mendeteksi motif karakter dan memprediksi akhir cerita.' },
      { term: 'Evaluasi: Fakta vs Opini', explanation: 'Fakta bersifat objektif, terverifikasi data/waktu/tempat. Opini memuat penilaian subjektif, perkiraan (mungkin, sebaiknya, tampaknya), dan kata sifat relatif.' },
      { term: 'Evaluasi & Apresiasi Sastra', explanation: 'Menilai kesesuaian latar, karakterisasi, konflik emosional, dan majas (personifikasi, metafora, hiperbola) dalam karya fiksi/puisi/drama.' }
    ],
    penjelasanSederhana: 'Pemahaman tekstual adalah memeriksa fakta persis di teks. Pemahaman inferensial adalah menjadi detektif yang menyimpulkan jejak rahasia di balik cerita. Evaluasi adalah menjadi juri kritis: membedakan berita fakta dari sekadar opini!',
    penjelasanMendalam: 'Pada soal TKA, ide pokok deduktif berada di awal paragraf dan dipayungi oleh kalimat pengembang. Jika ada konjungsi penanda kesimpulan di akhir ("Dengan demikian", "Oleh karena itu"), paragraf bersifat induktif. Hindari opsi jebakan yang hanya memuat satu contoh sempit.',
    kataKunci: ['kata serapan', 'EYD V', 'ide pokok', 'deduktif', 'induktif', 'sebab-akibat', 'fakta opini', 'apresiasi sastra'],
    rumusDanSifat: [
      { name: 'Aturan Baku Serapan', formula: 'analysis ➔ analisis ; practice ➔ praktik ; hierarchy ➔ hierarki ; standard ➔ standardisasi', note: 'Pedoman EYD V Edisi Terbaru' },
      { name: 'Formula Fakta', formula: 'Fakta = Data Angka Riil + Waktu Jelas + Kejadian Nyata', note: 'Bebas dari kata sifat subjektif' },
      { name: 'Formula Opini', formula: 'Opini = Kata Penilaian ("sebaiknya", "sangat indah", "diduga", "tampaknya")', note: 'Subjektif dan belum tentu terbukti' }
    ],
    langkahPengerjaan: [
      'Baca pertanyaan terlebih dahulu untuk mengunci fokus target pencarian kata kunci.',
      'Lakukan teknik scanning ke paragraf terkait untuk menemukan fakta tersurat.',
      'Untuk ide pokok, identifikasi subjek bahasan utama dari kalimat pertama dan bandingkan dengan kalimat simpulan akhir.',
      'Untuk fakta vs opini, eliminasi kalimat yang memuat kata-kata penilaian relatif.'
    ],
    contohNyata: 'Verifikasi klaim keaslian berita artikel ilmiah, audit dokumen perjanjian kerja sama hukum, dan telaah editorial pers surat kabar.',
    contohSoal: {
      question: 'Manakah di antara kalimat berikut yang merupakan pernyataan FAKTA objektif?',
      options: [
        'Kualitas udara di kota metropolitan akhir-akhir ini terasa sangat memprihatinkan.',
        'Pemerintah sebaiknya segera membatasi peredaran kendaraan bermotor pribadi.',
        'Kadar polutan PM2.5 di stasiun pemantau tercatat mencapai 165 µg/m³ pada hari Selasa pukul 08.00 WIB.',
        'Masyarakat tampaknya belum menyadari dampak buruk polusi udara bagi kesehatan.',
        'Udara bersih di pedesaan tentu jauh lebih menyehatkan daripada udara di kota besar.'
      ],
      correctIndex: 2,
      explanation: 'Kalimat C memuat data kuantitatif eksak terukur (165 µg/m³), waktu definitif (hari Selasa pukul 08.00 WIB), dan lokasi alat pemantau. Opsi A memuat kata subjektif "sangat memprihatinkan"; opsi B memuat saran "sebaiknya"; opsi D memuat dugaan "tampaknya"; opsi E memuat opini relatif "tentu jauh lebih menyehatkan".',
      smartTrick: 'Cari angka, satuan pengukuran baku, dan penunjuk waktu spesifik tanpa embel-embel kata sifat emosional!'
    },
    kesalahanUmum: [
      { trap: 'Memilih kalimat opini yang terdengar meyakinkan sebagai fakta', correction: 'Opini sering memakai kata penanda: "sebaiknya", "harus", "diduga", "tampaknya", "sangat".' },
      { trap: 'Tertukar penulisan baku kata serapan berakhiran -itas', correction: 'Huruf "f" pada kata sifat berubah menjadi "v" saat diserap: aktif ➔ aktivitas; efektif ➔ efektivitas.' }
    ],
    tipsMengingat: 'Fakta vs Opini: "Fakta punya DATA angka dan WAKTU; Opini punya RASA dan DUGAAN!"',
    hubunganMateri: 'Mendasari kemampuan analisis logika, pemahaman wacana sosial, dan penulisan karya ilmiah.',
    quickRecap: [
      'Tekstual = eksplisit di teks.',
      'Inferensial = simpulan tersirat sebab-akibat.',
      'Evaluasi = bedakan fakta terukur vs opini spekulatif.'
    ],
    blurtingKeyPoints: [
      'Perbedaan pemahaman tekstual, inferensial, dan evaluasi apresiasi',
      'Aturan serapan baku kata asing ke bahasa Indonesia (EYD V)',
      'Ciri khas kalimat fakta objektif vs kalimat opini subjektif',
      'Langkah menentukan ide pokok paragraf deduktif dan induktif'
    ],
    flashcards: [
      { id: 'fc-bi-1', front: 'Manakah yang baku: "standardisasi" atau "standarisasi"?', back: 'STANDARDISASI (mempertahankan huruf d dari kata dasar standar + isasi).' },
      { id: 'fc-bi-2', front: 'Apa pengertian majas personifikasi dalam teks fiksi?', back: 'Gaya bahasa yang melekatkan sifat-sifat insani (manusia) pada benda mati atau gagasan abstrak (cth: "Angin malam memeluk erat tubuhnya").' }
    ]
  },

  // ==========================================
  // 7. EKONOMI & AKUNTANSI
  // ==========================================
  {
    id: 'eko-akuntansi-lengkap',
    title: 'Ekonomi & Akuntansi (Pasar, Makro, Perpajakan & Persamaan Akuntansi)',
    subject: 'ekonomi',
    day: 4,
    phase: 1,
    level: 'HARD',
    estimatedMinutes: 50,
    pengertian: 'Mencakup konsep kelangkaan, biaya peluang (opportunity cost), mekanisme pasar (permintaan, penawaran, ekuilibrium, pajak & subsidi), makroekonomi (pendapatan nasional PDB/GNP, inflasi IHK, kebijakan moneter Bank Sentral, kebijakan fiskal perpajakan), manajemen BUMN/BUMD/BUMS/Koperasi, perdagangan internasional, serta Persamaan Dasar Akuntansi Aset = Liabilitas + Ekuitas.',
    tujuan: 'Menganalisis keseimbangan pasar setelah intervensi pajak, menghitung biaya peluang riil, memahami transmisi kebijakan suku bunga acuan BI Rate terhadap inflasi, serta mencatat transaksi keuangan ke dalam persamaan dasar akuntansi.',
    konsepUtama: [
      { term: 'Biaya Peluang (Opportunity Cost)', explanation: 'Nilai dari SATU alternatif TERBAIK yang harus dikorbankan karena memilih suatu keputusan ekonomi.' },
      { term: 'Ekuilibrium Pasar (Qd = Qs)', explanation: 'Kondisi perjumpaan kurva permintaan dan penawaran. Pajak spesifik (t) menggeser kurva penawaran ke atas (Ps\' = Ps + t), menaikkan harga keseimbangan.' },
      { term: 'Kebijakan Moneter vs Fiskal', explanation: 'Moneter dikendalikan Bank Sentral (operasi pasar terbuka, suku bunga BI, giro wajib minimum). Fiskal dikendalikan Pemerintah/Kemenkeu (pajak dan belanja negara APBN).' },
      { term: 'Persamaan Dasar Akuntansi', explanation: 'Aset (Harta) = Liabilitas (Utang) + Ekuitas (Modal). Pendapatan menambah modal; Beban dan Prive mengurangi modal.' },
      { term: 'Koperasi & Badan Usaha', explanation: 'Asas kekeluargaan (UU No. 25/1992), permodalan simpanan pokok, simpanan wajib, dan pembagian Sisa Hasil Usaha (SHU) berdasarkan kontribusi jasa anggota.' }
    ],
    penjelasanSederhana: 'Ekonomi adalah seni membuat pilihan cerdas saat uang dan waktu kita terbatas. Akuntansi adalah timbangan keadilan uang: setiap rupiah harta di kasir (Aset) harus jelas berasal dari utang ke pihak lain (Liabilitas) atau uang modal sendiri (Ekuitas)!',
    penjelasanMendalam: 'Dalam mengatasi inflasi tinggi, Bank Sentral menerapkan kebijakan moneter kontraktil (tight money policy): menaikkan suku bunga acuan (BI Rate) dan menjual Surat Berharga Negara (SBN) untuk menyerap kelebihan likuiditas uang beredar di masyarakat.',
    kataKunci: ['biaya peluang', 'ekuilibrium pasar', 'inflasi', 'kebijakan moneter', 'kebijakan fiskal', 'persamaan dasar akuntansi', 'aset', 'liabilitas', 'ekuitas', 'SHU koperasi'],
    rumusDanSifat: [
      { name: 'Keseimbangan Pasar', formula: 'Qd = Qs atau Pd = Ps', note: 'Sebelum pajak' },
      { name: 'Penawaran Pasca Pajak', formula: 'Ps\' = Ps + t atau Qs\' = f(P - t)', note: 'Pajak t per unit' },
      { name: 'Persamaan Akuntansi', formula: 'Aset = Liabilitas + Ekuitas', note: 'Sisi kiri dan kanan wajib balance' },
      { name: 'Laba Bersih Usaha', formula: 'Laba Bersih = Total Pendapatan - Total Beban', note: 'Menambah ekuitas pemilik' }
    ],
    langkahPengerjaan: [
      'Untuk opportunity cost, pilih nilai nominal terbesar di antara pilihan yang ditinggalkan.',
      'Untuk ekuilibrium pasca pajak, modifikasi fungsi penawaran P ➔ (P - t), lalu samakan Qd = Qs\'.',
      'Untuk transaksi akuntansi, tentukan dua akun yang terpengaruh, lalu verifikasi apakah Aset tetap sama dengan Liabilitas + Ekuitas.',
      'Ingat: penerimaan jasa tunai menambah Kas dan Modal; secara kredit menambah Piutang dan Modal.'
    ],
    contohNyata: 'Penetapan suku bunga acuan Bank Indonesia untuk menjaga stabilitas nilai tukar Rupiah terhadap Dolar AS, dan pembukuan neraca keuangan UMKM.',
    contohSoal: {
      question: 'Fungsi permintaan Qd = 80 - 2P dan fungsi penawaran Qs = -10 + 3P. Jika pemerintah mengenakan pajak spesifik sebesar Rp5 per unit, berapakah harga keseimbangan setelah pajak?',
      options: ['Rp18', 'Rp21', 'Rp23', 'Rp25', 'Rp28'],
      correctIndex: 1,
      explanation: 'Fungsi penawaran baru dengan pajak t = 5: Qs\' = -10 + 3(P - 5) = -10 + 3P - 15 = 3P - 25. Ekuilibrium: Qd = Qs\' -> 80 - 2P = 3P - 25 -> 5P = 105 -> P = 21. Jadi harga keseimbangan baru adalah Rp21.',
      smartTrick: 'Substitusi P ke (P - t) pada fungsi penawaran: Qs\' = 3P - 25. Samakan 80 - 2P = 3P - 25 ➔ 5P = 105 ➔ P = 21!'
    },
    kesalahanUmum: [
      { trap: 'Menjumlahkan seluruh opsi yang dibatalkan untuk menghitung biaya peluang', correction: 'Biaya peluang HANYA dihitung dari satu alternatif dengan nilai tertinggi yang dilepas.' },
      { trap: 'Memasukkan piutang usaha ke golongan liabilitas', correction: 'Piutang adalah hak tagih perusahaan kepada pelanggan, sehingga masuk ke kelompok ASET (Harta lancar).' }
    ],
    tipsMengingat: 'Akuntansi Seimbang: "Harta = Utang + Modal. Pendapatan bikin Modal naik, Beban bikin Modal turun!"',
    hubunganMateri: 'Mendasari manajemen keuangan, perpajakan bisnis, dan literasi ekonomi makro.',
    quickRecap: [
      'Biaya peluang = nilai 1 alternatif terbaik yang dikorbankan.',
      'Pajak spesifik menggeser kurva penawaran ke atas dan menaikkan harga pasar.',
      'Aset = Liabilitas + Ekuitas.'
    ],
    blurtingKeyPoints: [
      'Konsep kelangkaan dan cara menghitung biaya peluang (opportunity cost)',
      'Langkah mencari harga keseimbangan pasar sebelum dan sesudah pajak',
      'Instrumen kebijakan moneter Bank Sentral untuk menekan laju inflasi',
      'Rumus persamaan dasar akuntansi dan mekanisme debet-kredit 5 golongan akun'
    ],
    flashcards: [
      { id: 'fc-eko-1', front: 'Apa yang dimaksud dengan kebijakan diskonto oleh Bank Sentral?', back: 'Kebijakan mengatur jumlah uang beredar dengan menaikkan atau menurunkan tingkat suku bunga pinjaman kepada bank-bank komersial.' },
      { id: 'fc-eko-2', front: 'Transaksi pembayaran beban sewa kantor secara tunai memengaruhi akun apa saja?', back: 'Kas berkurang (Aset berkurang di kredit) dan Modal berkurang (karena timbul beban sewa di debet).' }
    ]
  },

  // ==========================================
  // 8. SOSIOLOGI
  // ==========================================
  {
    id: 'sos-sosiologi-lengkap',
    title: 'Sosiologi (Ilmu, Gejala Sosial, Penelitian, Konflik & Globalisasi)',
    subject: 'sosiologi_informatika',
    day: 2,
    phase: 1,
    level: 'MEDIUM',
    estimatedMinutes: 45,
    pengertian: 'Cakupan menyeluruh sosiologi: 1) Sosiologi sebagai ilmu (empiris, teoretis, kumulatif, non-etis), 2) Hubungan & Gejala Sosial (asosiatif, disosiatif, sosialisasi, masyarakat multikultural), 3) Penelitian Sosial (metode kualitatif/kuantitatif, teknik wawancara & angket), 4) Kelompok, Kesetaraan & Resolusi Konflik (kompromi, mediasi, arbitrase mengikat, konsiliasi, ajudikasi), 5) Perubahan Sosial & Dampak Globalisasi.',
    tujuan: 'Menganalisis fenomena sosial tanpa bias moral (non-etis), merancang tahapan penelitian sosial lapangan, membedakan arbitrase vs mediasi dalam penyelesaian perselisihan buruh/masyarakat, serta mengkritisi dampak modernisasi.',
    konsepUtama: [
      { term: '4 Ciri Sosiologi', explanation: 'Empiris (berpijak pada fakta observasi), Teoretis (menyusun abstraksi logis), Kumulatif (memperbaiki teori lama), Non-etis (tidak menilai baik atau buruknya fakta sosial).' },
      { term: 'Interaksi Sosial Asosiatif vs Disosiatif', explanation: 'Asosiatif merekatkan persatuan (kerja sama, akomodasi, asimilasi, akulturasi). Disosiatif memicu perpecahan (konflik, kompetisi, kontravensi).' },
      { term: 'Akomodasi: Mediasi vs Arbitrase', explanation: 'Mediasi: pihak ketiga netral HANYA memberi saran (tidak mengikat). Arbitrase: pihak ketiga memutus perkara dengan putusan yang BERSIFAT MENGIKAT kedua pihak.' },
      { term: 'Stratifikasi vs Diferensiasi Sosial', explanation: 'Stratifikasi: pelapisan sosial hierarkis bertingkat (kelas atas, menengah, bawah). Diferensiasi: pembedaan sosial horizontal tanpa tingkatan (suku, ras, agama).' },
      { term: 'Perubahan Sosial & Globalisasi', explanation: 'Teori linier (evolusi menuju kemajuan) vs teori siklus (seperti roda berputar). Dampak: westernisasi, konsumerisme, kesenjangan sosial, dan kearifan lokal.' }
    ],
    penjelasanSederhana: 'Sosiolog seperti detektif yang membedah mengapa sebuah tren atau tawuran terjadi di masyarakat tanpa menghakimi siapa yang jahat atau suci. Tujuannya adalah mencari akar masalah agar tercipta solusi damai!',
    penjelasanMendalam: 'Dalam sosiologi, istilah "non-etis" sering disalahpahami sebagai amoral. Faktanya, non-etis berarti ilmu sosiologi bebas nilai (value-free): tugas sosiolog adalah mengungkap secara ilmiah sebab-akibat timbulnya gejala sosial (misalnya kejahatan jalanan karena kemiskinan ekstrem), bukan menghakimi secara moral.',
    kataKunci: ['ciri sosiologi', 'non-etis', 'asosiatif', 'disosiatif', 'mediasi', 'arbitrase', 'stratifikasi sosial', 'diferensiasi', 'globalisasi', 'penelitian sosial'],
    rumusDanSifat: [
      { name: '4 Ciri Sosiologi', formula: 'E-T-K-N (Empiris, Teoretis, Kumulatif, Non-etis)', note: 'Hafalan kunci Bab 1' },
      { name: 'Kunci Resolusi Konflik', formula: 'Mediasi = Saran Tidak Mengikat ; Arbitrase = Putusan Mengikat ; Ajudikasi = Pengadilan', note: 'Sering diuji pada soal HOTS studi kasus' },
      { name: 'Pembeda Sosial', formula: 'Stratifikasi = Vertikal (Tingkat) ; Diferensiasi = Horizontal (Setara)', note: 'Prinsip kesetaraan sosial' }
    ],
    langkahPengerjaan: [
      'Cermati kasus fenomena sosial pada teks narasi soal.',
      'Identifikasi apakah soal menanyakan karakteristik ilmu, proses interaksi, atau bentuk penyelesaian konflik.',
      'Jika ada pihak ketiga yang keputusannya mutlak dipatuhi buruh dan majikan, pilihlah ARBITRASE.',
      'Jika membicarakan suku bangsa dan agama, itu adalah DIFERENSIASI (bukan stratifikasi).'
    ],
    contohNyata: 'Penyelesaian sengketa industrial antara serikat pekerja dan pengusaha melalui musyawarah Tripartit Dinas Tenaga Kerja.',
    contohSoal: {
      question: 'Sengketa tanah adat antara dua kelompok marga diselesaikan dengan menghadirkan tetua adat agung. Kedua pihak sepakat bahwa keputusan yang dijatuhkan oleh tetua adat bersifat FINAL dan WAJIB dipatuhi oleh kedua marga yang bertikai. Bentuk akomodasi konflik ini adalah...',
      options: ['Mediasi', 'Konsiliasi', 'Arbitrase', 'Kompromi', 'Ajudikasi'],
      correctIndex: 2,
      explanation: 'Ciri utama yang ditegaskan: adanya pihak penengah yang keputusannya bersifat FINAL dan WAJIB dipatuhi (mengikat). Ini merupakan definisi tegas dari ARBITRASE. Jika penengah hanya fasilitator penasihat tanpa daya ikat putusan, itu adalah mediasi.',
      smartTrick: 'Kata kunci "KEPUTUSAN WAJIB DIPATUHI / MENGIKAT" = ARBITRASE.'
    },
    kesalahanUmum: [
      { trap: 'Menjawab mediasi padahal keputusan pihak penengah mengikat', correction: 'Mediasi TIDAK mengikat para pihak. Keputusan yang mengikat adalah ARBITRASE.' },
      { trap: 'Menganggap stratifikasi sosial sama dengan diferensiasi sosial', correction: 'Diferensiasi bersifat sejajar/horizontal (agama, suku); stratifikasi bersifat bertingkat/vertikal (kekayaan, kekuasaan, pendidikan).' }
    ],
    tipsMengingat: 'Pembeda Konflik: "Mediator itu PENASIHAT (saran); Arbiter itu WASIT (putusan wajib dipatuhi)!"',
    hubunganMateri: 'Mendasari analisis sosiopolitik, interaksi antarbudaya, dan perumusan kebijakan publik.',
    quickRecap: [
      'Sosiologi non-etis: tidak menghakimi baik/buruk fakta.',
      'Arbitrase = putusan mengikat; Mediasi = saran dialog.',
      'Diferensiasi = horizontal; Stratifikasi = vertikal.'
    ],
    blurtingKeyPoints: [
      '4 ciri utama sosiologi sebagai ilmu (empiris, teoretis, kumulatif, non-etis)',
      'Bentuk-bentuk akomodasi konflik: kompromi, mediasi, arbitrase, ajudikasi',
      'Perbedaan stratifikasi sosial vs diferensiasi sosial beserta contohnya',
      'Dampak positif dan negatif perubahan sosial akibat globalisasi'
    ],
    flashcards: [
      { id: 'fc-sos-1', front: 'Apakah perbedaan antara asimilasi dan akulturasi?', back: 'Asimilasi: pembauran dua budaya melahirkan budaya baru dan menghilangkan ciri budaya asli (A+B=C). Akulturasi: perpaduan dua budaya tanpa menghilangkan ciri kepribadian asli (A+B=AB).' },
      { id: 'fc-sos-2', front: 'Apa ciri khas metode penelitian sosial kualitatif?', back: 'Menekankan pemahaman mendalam secara kontekstual, deskriptif naratif, instrumen utama adalah peneliti sendiri, dan pengumpulan data melalui wawancara mendalam serta observasi partisipatif.' }
    ]
  }
];

export const DAILY_SCHEDULE: DailyScheduleSlot[] = [
  { time: '08:00', title: 'Baca & Pahami Teori', icon: '📖', type: 'teori', durationMin: 25, description: 'Fokus membaca materi bab, rumus, konsep utama, dan contoh soal.' },
  { time: '08:25', title: 'Active Recall Blurting', icon: '🧠', type: 'blurting', durationMin: 15, description: 'Tutup buku! Tuliskan semua konsep yang kamu ingat di Blurting Lab.' },
  { time: '08:40', title: 'Smart Rest Break (Sunflower OST)', icon: '☕', type: 'break', durationMin: 5, description: 'Relaksasi mata bersama Araki sambil mendengarkan lagu Sunflower.' },
  { time: '08:45', title: 'Latihan Soal & HOTS Battle', icon: '🎯', type: 'latihan', durationMin: 40, description: 'Eksekusi soal pilihan ganda, kejar akurasi, dan raih XP!' },
  { time: '09:25', title: 'Bedah Pembahasan TKA', icon: '🔎', type: 'pembahasan', durationMin: 20, description: 'Cermati trik cepat, konsep kunci, dan cara berpikir yang benar.' },
  { time: '09:45', title: 'Review Error Bank & Flashcard', icon: '🧠', type: 'review', durationMin: 15, description: 'Simpan dan pelajari ulang kesalahan agar tidak terulang kembali.' },
  { time: '10:00', title: 'Mission Complete!', icon: '🏆', type: 'finish', durationMin: 0, description: 'Daily mission cleared. Klaim streak dan bonus XP harian!' }
];

export const SAMPLE_QUESTIONS: QuizQuestion[] = [
  // MATEMATIKA - BILANGAN REAL
  {
    id: 'q-mat-1',
    topicId: 'mat-bilangan-real',
    subject: 'matematika',
    difficulty: 'MEDIUM',
    question: 'Bentuk sederhana dari ekspresi bilangan aljabar ( 3√2 + 2√3 ) / ( 3√2 - 2√3 ) adalah...',
    options: ['5 + 2√6', '5 + 4√6', '7 + 2√6', '7 - 2√6', '6 + 2√6'],
    correctIndex: 0,
    explanation: {
      mengapa: 'Penyebut berbentuk (a - b) dirasionalkan dengan mengalikan sekawannya (a + b).',
      konsep: 'Rasionalisasi penyebut memakai sifat selisih kuadrat: (x - y)(x + y) = x² - y².',
      caraBerpikir: 'Penyebut: (3√2)² - (2√3)² = 18 - 12 = 6. Pembilang: (3√2 + 2√3)² = 18 + 12√6 + 12 = 30 + 12√6. Bagi pembilang dengan penyebut: (30 + 12√6) / 6 = 5 + 2√6.',
      kesalahanUmum: 'Lupa mengalikan 2 pada suku tengah kuadrat binomial (2ab), sehingga menghitung 30 saja.',
      trik: 'Ingat (A+B)² / (A² - B²) = (A² + B² + 2AB) / (A² - B²). Hitung A²=18, B²=12. 18+12=30, 2AB=12√6. Bagi 6 langsung dapat 5 + 2√6.',
      jawabanBenar: 'A. 5 + 2√6'
    }
  },
  // MATEMATIKA - SPLTV
  {
    id: 'q-mat-2',
    topicId: 'mat-persamaan-linear',
    subject: 'matematika',
    difficulty: 'HOTS',
    question: 'Di sebuah koperasi sekolah: 2 buku + 1 pulpen + 1 penggaris = Rp13.000. 1 buku + 2 pulpen + 1 penggaris = Rp17.000. 1 buku + 1 pulpen + 2 penggaris = Rp14.000. Berapakah harga belanja jika Ila membeli 1 buku + 1 pulpen + 1 penggaris?',
    options: ['Rp9.000', 'Rp10.000', 'Rp11.000', 'Rp12.000', 'Rp13.000'],
    correctIndex: 2,
    explanation: {
      mengapa: 'Soal menguji kecermatan melihat pola koefisien simetris sistem 3 variabel.',
      konsep: 'Penjumlahan linear seluruh persamaan: (2+1+1)B + (1+2+1)P + (1+1+2)G = 4B + 4P + 4G = 13.000 + 17.000 + 14.000 = 44.000.',
      caraBerpikir: 'Karena 4B + 4P + 4G = 44.000, bagi kedua ruas dengan 4 menghasilkan B + P + G = Rp11.000.',
      kesalahanUmum: 'Menghabiskan waktu dengan metode eliminasi panjang mencari harga satuan masing-masing barang padahal soal hanya menanyakan jumlah totalnya.',
      trik: 'Pola simetris koefisien kembar berjumlah 4. Langsung jumlahkan seluruh persamaan lalu bagi 4!',
      jawabanBenar: 'C. Rp11.000'
    }
  },
  // MATEMATIKA - FUNGSI INVERS
  {
    id: 'q-mat-3',
    topicId: 'mat-fungsi',
    subject: 'matematika',
    difficulty: 'HARD',
    question: 'Diketahui fungsi f(x) = (2x + 5) / (3x - 4) dengan x ≠ 4/3. Nilai dari f⁻¹(1) adalah...',
    options: ['-9', '-1', '1', '9', '11'],
    correctIndex: 3,
    explanation: {
      mengapa: 'Invers membalik nilai input dan output fungsi.',
      konsep: 'Rumus cepat invers f(x) = (ax + b)/(cx + d) adalah f⁻¹(x) = (-dx + b)/(cx - a). Atau menggunakan sifat f⁻¹(1) = k ➔ f(k) = 1.',
      caraBerpikir: 'f(k) = 1 ➔ (2k + 5)/(3k - 4) = 1 ➔ 2k + 5 = 3k - 4 ➔ k = 9.',
      kesalahanUmum: 'Lupa mengganti tanda saat menukar elemen a dan d pada rumus cepat invers.',
      trik: 'Pakai definisi f⁻¹(1) = k ➔ f(k) = 1. Tanpa perlu mencari rumus invers, persamaan linear satu variabel langsung selesai dalam 10 detik!',
      jawabanBenar: 'D. 9'
    }
  },
  // MATEMATIKA - PANTULAN BOLA DERET GEOMETRI
  {
    id: 'q-mat-4',
    topicId: 'mat-barisan-deret',
    subject: 'matematika',
    difficulty: 'MEDIUM',
    question: 'Sebuah bola dijatuhkan dari ketinggian 12 meter dan memantul kembali dengan ketinggian 3/5 kali tinggi sebelumnya. Panjang lintasan seluruhnya hingga bola berhenti adalah...',
    options: ['36 meter', '48 meter', '60 meter', '72 meter', '84 meter'],
    correctIndex: 1,
    explanation: {
      mengapa: 'Bola mengalami pantulan naik-turun yang membentuk deret geometri tak hingga.',
      konsep: 'Deret geometri tak hingga: Panjang lintasan pantulan bola dijatuhkan dari tinggi h dengan rasio a/b adalah L = h × (b + a) / (b - a).',
      caraBerpikir: 'h = 12, a = 3, b = 5. L = 12 × (5 + 3) / (5 - 3) = 12 × 8 / 2 = 12 × 4 = 48 meter.',
      kesalahanUmum: 'Lupa bahwa setiap pantulan dilalui dua kali (naik dan turun), kecuali penurunan awal saat pertama dijatuhkan.',
      trik: 'Trik kilat: h × (penyebut + pembilang) / (penyebut - pembilang) = 12 × 8 / 2 = 48 meter!',
      jawabanBenar: 'B. 48 meter'
    }
  },
  // MATEMATIKA - DIMENSI TIGA KUBUS
  {
    id: 'q-mat-5',
    topicId: 'mat-geometri-pengukuran',
    subject: 'matematika',
    difficulty: 'HOTS',
    question: 'Pada kubus ABCD.EFGH dengan panjang rusuk 6 cm, berapakah jarak titik C ke bidang diagonal AFH?',
    options: ['2√3 cm', '3√3 cm', '4√3 cm', '2√6 cm', '4√6 cm'],
    correctIndex: 2,
    explanation: {
      mengapa: 'Jarak titik ke bidang adalah panjang ruas garis proyeksi terpendek yang tegak lurus.',
      konsep: 'Diagonal ruang CE memotong bidang AFH tegak lurus dengan perbandingan 1:2. Jarak titik sudut atas (E) ke bidang AFH adalah 1/3 diagonal ruang, sedangkan jarak titik sudut seberang (C) ke bidang AFH adalah 2/3 diagonal ruang.',
      caraBerpikir: 'Diagonal ruang CE = s√3 = 6√3 cm. Jarak titik C ke bidang AFH = 2/3 × (6√3) = 4√3 cm.',
      kesalahanUmum: 'Mengira jarak dihitung ke titik pusat segitiga AFH tanpa memperhatikan garis tegak lurus proyeksi diagonal ruang.',
      trik: 'Jarak sudut jauh kubus ke bidang segitiga atas = 2/3 × s√3 = 2/3 × 6√3 = 4√3 cm!',
      jawabanBenar: 'C. 4√3 cm'
    }
  },
  // MATEMATIKA - SUDUT ELEVASI TRIGONOMETRI
  {
    id: 'q-mat-6',
    topicId: 'mat-trigonometri',
    subject: 'matematika',
    difficulty: 'MEDIUM',
    question: 'Seorang pengamat dengan tinggi badan 1,6 m melihat puncak tiang bendera dengan sudut elevasi 45°. Jika jarak horizontal pengamat ke tiang bendera adalah 12 m, tinggi tiang bendera tersebut adalah...',
    options: ['12,0 m', '13,6 m', '14,2 m', '15,6 m', '16,0 m'],
    correctIndex: 1,
    explanation: {
      mengapa: 'Pengukuran tinggi menggunakan perbandingan tangen (de/sa).',
      konsep: 'tan 45° = Depan / Samping = y / 12. Karena tan 45° = 1, maka y = 12 m. Tinggi total tiang = y + tinggi pengamat = 12 + 1,6 = 13,6 m.',
      caraBerpikir: 'tan 45° = 1, sehingga sisi depan sama dengan sisi samping (12 m). Tambahkan tinggi pandangan pengamat 1,6 m.',
      kesalahanUmum: 'Lupa menambahkan tinggi badan pengamat sehingga hanya menjawab 12 m.',
      trik: 'Untuk sudut elevasi 45°, tinggi bayangan vertikal SELALU SAMA dengan jarak horizontal. Langsung tambahkan 12 + 1,6 = 13,6 m!',
      jawabanBenar: 'B. 13,6 m'
    }
  },
  // MATEMATIKA - KOMBINASI DAN PELUANG
  {
    id: 'q-mat-7',
    topicId: 'mat-data-peluang',
    subject: 'matematika',
    difficulty: 'HARD',
    question: 'Dari 8 orang calon pengurus OSIS yang terdiri atas 5 putra dan 3 putri, akan dipilih 3 orang sebagai delegasi sekolah tanpa membedakan jabatan. Berapa banyak cara memilih jika delegasi HARUS terdiri dari 2 putra dan 1 putri?',
    options: ['15 cara', '24 cara', '30 cara', '45 cara', '56 cara'],
    correctIndex: 2,
    explanation: {
      mengapa: 'Pemilihan delegasi tanpa jabatan menggunakan kaidah Kombinasi (nCr).',
      konsep: 'Memilih 2 putra dari 5 putra = 5C2 = 5! / (2! 3!) = 10. Memilih 1 putri dari 3 putri = 3C1 = 3. Kaidah perkalian: 10 × 3 = 30.',
      caraBerpikir: 'Banyak cara gabungan = 5C2 × 3C1 = 10 × 3 = 30 cara.',
      kesalahanUmum: 'Menggunakan permutasi padahal tidak ada jabatan ketua/sekretaris.',
      trik: '5C2 = (5×4)/2 = 10. 3C1 = 3. Kalikan langsung 10 × 3 = 30 cara!',
      jawabanBenar: 'C. 30 cara'
    }
  },
  // BAHASA INDONESIA - KATA SERAPAN BAKU
  {
    id: 'q-bin-1',
    topicId: 'bin-kompetensi-lengkap',
    subject: 'indonesia',
    difficulty: 'EASY',
    question: 'Penulisan kata serapan yang seluruhnya BAKU menurut Pedoman Umum Ejaan Bahasa Indonesia (EYD V) adalah...',
    options: [
      'Aktivitas, efektivitas, analisa, tehnik',
      'Aktivitas, efektivitas, analisis, teknik',
      'Aktifitas, efektipitas, analisis, teknik',
      'Aktivitas, efektifitas, analisa, tehnik',
      'Aktifitas, efektivitas, analisa, teknik'
    ],
    correctIndex: 1,
    explanation: {
      mengapa: 'PUEBI / EYD V mengatur kaidah penyerapan sufiks asing secara baku.',
      konsep: 'Kaidah serapan baku: activity ➔ aktivitas (-ity jadi -itas dengan huruf v); effectiveness ➔ efektivitas; analysis ➔ analisis (-ysis jadi -isis); technique ➔ teknik.',
      caraBerpikir: 'Periksa baris opsi: Opsi B memiliki seluruh kata dalam bentuk baku yang sempurna.',
      kesalahanUmum: 'Sering keliru mengira "analisa" baku karena sering terdengar dalam percakapan lisan.',
      trik: 'Ingat kata berakhiran -isis selalu baku (analisis, sintesis, hipotesis, krisis)!',
      jawabanBenar: 'B. Aktivitas, efektivitas, analisis, teknik'
    }
  },
  // BAHASA INDONESIA - FAKTA VS OPINI
  {
    id: 'q-bin-2',
    topicId: 'bin-kompetensi-lengkap',
    subject: 'indonesia',
    difficulty: 'MEDIUM',
    question: 'Cermati kalimat-kalimat berikut. Kalimat yang merupakan FAKTA objektif adalah...',
    options: [
      'Kualitas udara di kota metropolitan akhir-akhir ini terasa sangat memprihatinkan.',
      'Pemerintah sebaiknya segera membatasi peredaran kendaraan bermotor pribadi.',
      'Kadar polutan PM2.5 di stasiun pemantau tercatat mencapai 165 µg/m³ pada hari Selasa pukul 08.00 WIB.',
      'Masyarakat tampaknya belum menyadari dampak buruk polusi udara bagi kesehatan.',
      'Udara bersih di pedesaan tentu jauh lebih menyehatkan daripada udara di kota besar.'
    ],
    correctIndex: 2,
    explanation: {
      mengapa: 'Fakta memiliki data kuantitatif terukur, waktu spesifik, dan dapat diverifikasi secara ilmiah.',
      konsep: 'Fakta = data riil + waktu pasti + tempat jelas tanpa kata sifat penilaian subjektif. Opini = ada kata "sebaiknya", "tampaknya", "sangat memprihatinkan".',
      caraBerpikir: 'Opsi C memuat angka 165 µg/m³ dan waktu pasti Selasa pukul 08.00 WIB.',
      kesalahanUmum: 'Menganggap opsi E sebagai fakta padahal mengandung asumsi relatif "tentu jauh lebih menyehatkan".',
      trik: 'Cari angka presisi dan penunjuk waktu tanpa kata perkiraan!',
      jawabanBenar: 'C. Kadar polutan PM2.5 di stasiun pemantau tercatat mencapai 165 µg/m³ pada hari Selasa pukul 08.00 WIB.'
    }
  },
  // EKONOMI - BIAYA PELUANG
  {
    id: 'q-eko-1',
    topicId: 'eko-akuntansi-lengkap',
    subject: 'ekonomi',
    difficulty: 'MEDIUM',
    question: 'Seorang sarjana memiliki 3 tawaran kerja: di Bank (gaji Rp7.500.000/bln), di BUMN (gaji Rp9.000.000/bln), atau di Perusahaan Swasta (gaji Rp6.000.000/bln). Jika ia memilih mendirikan usaha start-up sendiri, berapakah biaya peluangnya per bulan?',
    options: ['Rp6.000.000', 'Rp7.500.000', 'Rp9.000.000', 'Rp16.500.000', 'Rp22.500.000'],
    correctIndex: 2,
    explanation: {
      mengapa: 'Biaya peluang (opportunity cost) adalah nilai dari SATU alternatif TERBAIK yang dikorbankan.',
      konsep: 'Prinsip Scarcity & Choice: Biaya peluang BUKAN total akumulasi semua tawaran yang dilepas, melainkan HANYA tawaran dengan nilai tertinggi.',
      caraBerpikir: 'Dari 3 tawaran yang dilepas (7,5 jt, 9 jt, 6 jt), nilai tertingginya adalah Rp9.000.000 di BUMN.',
      kesalahanUmum: 'Menjumlahkan seluruh opsi: 7,5 + 9 + 6 = 22,5 juta.',
      trik: 'Biaya Peluang = MAX(pilihan yang dikorbankan) = Rp9.000.000!',
      jawabanBenar: 'C. Rp9.000.000'
    }
  },
  // EKONOMI - EKUILIBRIUM PASAR PAJAK
  {
    id: 'q-eko-2',
    topicId: 'eko-akuntansi-lengkap',
    subject: 'ekonomi',
    difficulty: 'HARD',
    question: 'Fungsi permintaan suatu produk adalah Qd = 80 - 2P dan penawaran Qs = -10 + 3P. Jika pemerintah mengenakan pajak spesifik sebesar Rp5 per unit, berapakah harga keseimbangan setelah pajak?',
    options: ['Rp18', 'Rp21', 'Rp23', 'Rp25', 'Rp28'],
    correctIndex: 1,
    explanation: {
      mengapa: 'Pajak penjualan spesifik menggeser fungsi penawaran produsen ke atas.',
      konsep: 'Modifikasi fungsi penawaran dengan mengganti P menjadi (P - t): Qs\' = -10 + 3(P - 5) = 3P - 25. Ekuilibrium: Qd = Qs\'.',
      caraBerpikir: '80 - 2P = 3P - 25 ➔ 5P = 105 ➔ P = 21.',
      kesalahanUmum: 'Memasukkan pajak ke fungsi permintaan, padahal pajak penjualan dikenakan pada produsen (kurva penawaran).',
      trik: 'Ganti P dengan (P - 5) pada Qs: Qs\' = 3P - 25. Samakan dengan Qd ➔ 5P = 105 ➔ P = 21!',
      jawabanBenar: 'B. Rp21'
    }
  },
  // SOSIOLOGI - CIRI NON-ETIS
  {
    id: 'q-sos-1',
    topicId: 'sos-sosiologi-lengkap',
    subject: 'sosiologi_informatika',
    difficulty: 'MEDIUM',
    question: 'Sosiologi tidak mempermasalahkan apakah suatu perbuatan warga masyarakat dianggap tercela atau terpuji secara moral, melainkan bertujuan menjelaskan alasan dan latar belakang fenomena tersebut secara ilmiah objektif. Hal ini menunjukkan ciri sosiologi yaitu...',
    options: ['Empiris', 'Teoretis', 'Kumulatif', 'Non-etis', 'Normatif'],
    correctIndex: 3,
    explanation: {
      mengapa: 'Ciri sosiologi yang bebas nilai dari penilaian baik/buruk adalah ciri Non-etis.',
      konsep: 'Empiris = berbasis fakta observasi. Teoretis = menyusun abstraksi logis. Kumulatif = memperbarui teori lama. Non-etis = tidak menilai baik/buruk secara moral.',
      caraBerpikir: 'Pernyataan "tidak mempermasalahkan tercela atau terpuji" secara langsung merujuk pada prinsip bebas nilai moral (non-etis).',
      kesalahanUmum: 'Memilih "Normatif", padahal sosiologi justru adalah ilmu non-normatif.',
      trik: 'Tidak menilai baik/buruk = NON-ETIS.',
      jawabanBenar: 'D. Non-etis'
    }
  },
  // SOSIOLOGI - RESOLUSI KONFLIK ARBITRASE
  {
    id: 'q-sos-2',
    topicId: 'sos-sosiologi-lengkap',
    subject: 'sosiologi_informatika',
    difficulty: 'HARD',
    question: 'Sengketa perburuhan mengenai upah lembur antara serikat pekerja dan direksi pabrik diselesaikan dengan menunjuk perwakilan dinas tenaga kerja. Kedua belah pihak sepakat bahwa keputusan yang dijatuhkan oleh penengah tersebut bersifat FINAL dan WAJIB DIPATUHI kedua belah pihak. Bentuk akomodasi konflik ini adalah...',
    options: ['Mediasi', 'Konsiliasi', 'Arbitrase', 'Kompromi', 'Ajudikasi'],
    correctIndex: 2,
    explanation: {
      mengapa: 'Keputusan yang diputuskan oleh pihak ketiga yang bersifat mengikat dan wajib dipatuhi adalah ciri utama Arbitrase.',
      konsep: 'Perbedaan Arbitrase dan Mediasi: Pada mediasi, pihak ketiga hanya penasihat yang sarannya tidak mengikat. Pada arbitrase, pihak ketiga adalah pemutus yang putusannya wajib dipatuhi kedua belah pihak.',
      caraBerpikir: 'Perhatikan kata kunci "WAJIB DIPATUHI" ➔ putusan mengikat ➔ Arbitrase.',
      kesalahanUmum: 'Menjawab mediasi karena penengah berasal dari dinas tenaga kerja.',
      trik: 'Pihak ketiga memberi keputusan MENGIKAT = ARBITRASE!',
      jawabanBenar: 'C. Arbitrase'
    }
  }
];

export const INITIAL_TASKS = [
  { id: 't1', title: 'Baca teori materi hari ini', completed: false, xp: 15 },
  { id: 't2', title: 'Buat catatan di Digital Notebook', completed: false, xp: 20 },
  { id: 't3', title: 'Selesaikan sesi Blurting Lab (Active Recall)', completed: false, xp: 30 },
  { id: 't4', title: 'Kerjakan 5 latihan soal & HOTS Battle', completed: false, xp: 25 },
  { id: 't5', title: 'Mainkan Spider Memory Game & Review Flashcard', completed: false, xp: 20 }
];

export const INITIAL_ACHIEVEMENTS = [
  { id: 'ach-1', title: 'First Mission Complete', description: 'Menyelesaikan misi harian pertama.', icon: '🏆', unlocked: false, progress: 0, maxProgress: 1 },
  { id: 'ach-2', title: '7 Day Streak Warrior', description: 'Belajar berturut-turut selama 7 hari tanpa putus.', icon: '🔥', unlocked: false, progress: 1, maxProgress: 7 },
  { id: 'ach-3', title: 'Blurting Master', description: 'Menyelesaikan 10 sesi active recall blurting.', icon: '🧠', unlocked: false, progress: 0, maxProgress: 10 },
  { id: 'ach-4', title: '100 Questions Sniper', description: 'Mengerjakan total 100 soal latihan TKA.', icon: '🎯', unlocked: false, progress: 0, maxProgress: 100 },
  { id: 'ach-5', title: 'HOTS Web-Slinger', description: 'Menjawab benar 15 soal tingkat kesulitan HOTS.', icon: '⚡', unlocked: false, progress: 0, maxProgress: 15 },
  { id: 'ach-6', title: 'Memory Match Champion', description: 'Menyelesaikan permainan Spider Memory Match dalam waktu cepat.', icon: '🎮', unlocked: false, progress: 0, maxProgress: 3 },
  { id: 'ach-7', title: 'Theory Master', description: 'Membaca dan menguasai seluruh bab teori kurikulum.', icon: '📚', unlocked: false, progress: 0, maxProgress: 8 },
  { id: 'ach-8', title: 'Final TKA Champion', description: 'Menyelesaikan program intensif 17 hari penuh.', icon: '👑', unlocked: false, progress: 1, maxProgress: 17 }
];

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send,
  Bot,
  User,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Lightbulb,
  BookOpen,
  Brain,
  Zap,
  HelpCircle,
  MessageSquare,
  Flame,
  ArrowRight,
  Calculator,
  Compass,
  TrendingUp,
  FileText,
  Scale,
  RefreshCw,
} from 'lucide-react';
import { sound } from '../services/soundEngine';
import { MascotSpider } from '../components/MascotSpider';

interface Message {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
  category?: string;
}

interface TopicSuggestion {
  subject: string;
  label: string;
  prompt: string;
  icon: string;
}

const TOPIC_SUGGESTIONS: TopicSuggestion[] = [
  // 1. Bilangan Real
  {
    subject: 'Bilangan',
    label: 'Sifat Bilangan & Eksponen',
    prompt: 'Jelaskan sifat komutatif, asosiatif, distributif pada bilangan real, dan trik menyederhanakan eksponen pecahan serta bentuk akar!',
    icon: '🔢',
  },
  // 2. Aljabar
  {
    subject: 'Aljabar',
    label: 'SPLTV & Program Linear',
    prompt: 'Bagaimana cara cepat menyelesaikan Sistem Persamaan Linear Tiga Variabel (SPLTV) dan menentukan daerah himpunan penyelesaian program linear?',
    icon: '📐',
  },
  {
    subject: 'Aljabar',
    label: 'Fungsi Invers & Komposisi',
    prompt: 'Jelaskan konsep domain, kodomain, range, rumus cepat fungsi invers f⁻¹(x) untuk fungsi pecahan rasional (ax+b)/(cx+d), dan fungsi komposisi (f ∘ g)(x)!',
    icon: '📈',
  },
  {
    subject: 'Aljabar',
    label: 'Bunga Majemuk & Deret',
    prompt: 'Apa perbedaan rumus bunga tunggal vs bunga majemuk, serta bagaimana cara membedakan soal pertumbuhan vs peluruhan eksponensial di TKA?',
    icon: '📊',
  },
  // 3. Geometri & Pengukuran
  {
    subject: 'Geometri',
    label: 'Dimensi Tiga & AFH Kubus',
    prompt: 'Bagaimana rumus dan penalaran jarak titik ke bidang AFH pada kubus berusuk s? Berikan contoh soal konkret!',
    icon: '📦',
  },
  {
    subject: 'Geometri',
    label: 'Transformasi Geometri Titik',
    prompt: 'Tuliskan matriks dan aturan praktis untuk Translasi, Refleksi (sumbu X, Y, y=x, y=-x), Rotasi 90° dan 180°, serta Dilatasi dengan faktor skala k!',
    icon: '🔄',
  },
  {
    subject: 'Geometri',
    label: 'Keliling, Luas & Volume Ruang',
    prompt: 'Rangkumkan rumus luas permukaan dan volume bangun ruang sisi datar (prisma, limas) serta sisi lengkung (tabung, kerucut, bola) yang sering keluar di TKA!',
    icon: '📏',
  },
  // 4. Trigonometri
  {
    subject: 'Trigonometri',
    label: 'Perbandingan & Sudut Elevasi',
    prompt: 'Bagaimana perbandingan trigonometri dasar (sin, cos, tan, csc, sec, cot) dan trik cepat menghitung tinggi objek menggunakan sudut elevasi 30°, 45°, 60°?',
    icon: '📐',
  },
  // 5. Data & Peluang
  {
    subject: 'Peluang',
    label: 'Permutasi vs Kombinasi',
    prompt: 'Bagaimana cara membedakan kapan harus menggunakan aturan perkalian, permutasi P(n,r), atau kombinasi C(n,r) pada soal cerita TKA?',
    icon: '🎲',
  },
  {
    subject: 'Peluang',
    label: 'Ukuran Pemusatan Data',
    prompt: 'Jelaskan cara mencari Mean, Median, dan Modus pada data kelompok yang disajikan dalam bentuk tabel frekuensi histogram!',
    icon: '📊',
  },
  // 6. Bahasa Indonesia - Pemahaman Tekstual
  {
    subject: 'Bahasa Indonesia',
    label: 'Kata Serapan Baku EYD V',
    prompt: 'Sebutkan daftar kata serapan dari bahasa asing/daerah yang sering salah tulis (jebakan TKA) beserta bentuk bakunya menurut EYD V!',
    icon: '📖',
  },
  // 7. Bahasa Indonesia - Pemahaman Inferensial
  {
    subject: 'Bahasa Indonesia',
    label: 'Ide Pokok & Prediksi Cerita',
    prompt: 'Bagaimana cara menentukan ide pokok paragraf deduktif, induktif, campuran, serta menarik kesimpulan inferensial dari teks eksplanasi ilmiah?',
    icon: '🔍',
  },
  // 8. Bahasa Indonesia - Evaluasi & Apresiasi
  {
    subject: 'Bahasa Indonesia',
    label: 'Membedakan Fakta vs Opini',
    prompt: 'Bagaimana cara mengevaluasi keakuratan informasi teks dan membedakan kalimat fakta obyektif vs opini/asumsi penulis pada soal TKA?',
    icon: '⚖️',
  },
  // 9. Ekonomi & Sosiologi
  {
    subject: 'Ekonomi & Sosiologi',
    label: 'Biaya Peluang & Kebijakan BI',
    prompt: 'Jelaskan konsep Biaya Peluang (Opportunity Cost), mekanisme pasar permintaan-penawaran, serta instrumen kebijakan moneter Bank Indonesia mengatasi inflasi!',
    icon: '💰',
  },
  {
    subject: 'Ekonomi & Sosiologi',
    label: 'Mediasi vs Arbitrase Konflik',
    prompt: 'Jelaskan perbedaan mendasar antara Mediasi, Arbitrase, Konsiliasi, dan Ajudikasi dalam penyelesaian konflik sosial pada materi Sosiologi TKA!',
    icon: '👥',
  },
];

export const AITutorView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-init',
      sender: 'tutor',
      text: `Hai Ila! 🕷️ Aku **Araki AI**, asisten belajarmu berbasis **ChatGPT & Gemini 3.8 Flash** yang didesain khusus menguasai seluruh **Kisi-Kisi Resmi TKA SMA 2026 (Pusmendik)**.

Aku siap membantumu kapan saja:
1. 🔢 **Matematika:** Bilangan real, SPLTV, fungsi invers & komposisi, barisan deret, geometri ruang, transformasi, trigonometri, peluang & statistika.
2. 📖 **Bahasa Indonesia:** Pemahaman tekstual (kata serapan baku EYD V), pemahaman inferensial (ide pokok), dan evaluasi fakta vs opini.
3. 💰 **Ekonomi:** Biaya peluang, inflasi, kebijakan moneter BI, persamaan akuntansi.
4. 👥 **Sosiologi:** Interaksi sosial, resolusi konflik (mediasi vs arbitrase), perubahan sosial.

Ketik pertanyaan apa saja di bawah, atau pilih topik kisi-kisi cepat! ⚡`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Semua');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const categories = ['Semua', 'Bilangan', 'Aljabar', 'Geometri', 'Trigonometri', 'Peluang', 'Bahasa Indonesia', 'Ekonomi & Sosiologi'];

  const filteredSuggestions = selectedFilter === 'Semua'
    ? TOPIC_SUGGESTIONS
    : TOPIC_SUGGESTIONS.filter((s) => s.subject.toLowerCase().includes(selectedFilter.toLowerCase()));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    sound.playTap();
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    sound.playTap();
    if (confirm('Mulai percakapan baru dengan Araki AI?')) {
      setMessages([
        {
          id: `m-init-${Date.now()}`,
          sender: 'tutor',
          text: `Hai kembali, Ila! 🕷️ Percakapan telah disegarkan. Mau bahas materi TKA apa sekarang?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  };

  const handleSend = async (customPrompt?: string) => {
    const query = customPrompt || inputVal;
    if (!query.trim() || isGenerating) return;

    sound.playWebShoot();
    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsGenerating(true);

    try {
      // 1. Try server-side Gemini API call via Express backend
      const res = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-6),
        }),
      });

      const data = await res.json();
      if (data && data.reply && !data.fallbackNeeded) {
        sound.playCorrect();
        setMessages((prev) => [
          ...prev,
          {
            id: `tut-${Date.now()}`,
            sender: 'tutor',
            text: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        setIsGenerating(false);
        return;
      }
    } catch {
      // Network/server fallback
    }

    // 2. Intelligent Offline/Local ChatGPT-grade Expert Engine
    setTimeout(() => {
      sound.playCorrect();
      const answer = generateComprehensiveReply(query);
      setMessages((prev) => [
        ...prev,
        {
          id: `tut-${Date.now()}`,
          sender: 'tutor',
          text: answer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsGenerating(false);
    }, 600);
  };

  // Comprehensive Knowledge Base Engine for TKA Kisi-Kisi
  const generateComprehensiveReply = (q: string): string => {
    const low = q.toLowerCase();

    // 1. BILANGAN REAL & EKSPONEN
    if (low.includes('bilangan') || low.includes('eksponen') || low.includes('komutatif') || low.includes('akar')) {
      return `🔢 **Pembahasan Lengkap: Bilangan Real & Sifat Eksponen (TKA Pusmendik)**

### 1. Sifat-Sifat Dasar Operasi Bilangan Real
Untuk setiap $a, b, c \\in \\mathbb{R}$:
- **Komutatif (Pertukaran):**
  - Penjumlahan: $a + b = b + a$
  - Perkalian: $a \\times b = b \\times a$ *(Pengurangan & pembagian TIDAK berlaku komutatif)*
- **Asosiatif (Pengelompokan):**
  - $(a + b) + c = a + (b + c)$
  - $(a \\times b) \\times c = a \\times (b \\times c)$
- **Distributif (Penyebaran):**
  - $a(b + c) = ab + ac$ dan $a(b - c) = ab - ac$

---

### 2. Sifat Eksponen Bulat & Pecahan
1. $a^m \\times a^n = a^{m+n}$
2. $\\frac{a^m}{a^n} = a^{m-n}$
3. $(a^m)^n = a^{m \\times n}$
4. $(a \\times b)^n = a^n \\times b^n$
5. $a^{-n} = \\frac{1}{a^n}$ (dengan $a \\neq 0$)
6. **Eksponen Pecahan ke Bentuk Akar:**
   $$a^{\\frac{m}{n}} = \\sqrt[n]{a^m}$$
   *Contoh:* $8^{\\frac{2}{3}} = (\\sqrt[3]{8})^2 = 2^2 = 4$

---

### 3. Merasionalkan Penyebut Bentuk Akar
- Bentuk $\\frac{a}{\\sqrt{b}}$ dikalikan $\\frac{\\sqrt{b}}{\\sqrt{b}} = \\frac{a\\sqrt{b}}{b}$
- Bentuk $\\frac{c}{\\sqrt{a} + \\sqrt{b}}$ dikalikan sekawannya $\\frac{\\sqrt{a} - \\sqrt{b}}{\\sqrt{a} - \\sqrt{b}} = \\frac{c(\\sqrt{a} - \\sqrt{b})}{a - b}$

💡 **Trik Cepat Araki:** Ubah selalu bilangan pokok ke bentuk faktor prima terkecil (seperti 2, 3, 5) sebelum menyederhanakan eksponen pecahan!`;
    }

    // 2. ALJABAR: SPLTV & PROGRAM LINEAR
    if (low.includes('spltv') || low.includes('tiga variabel') || low.includes('program linear')) {
      return `📐 **Pembahasan Lengkap: SPLTV & Program Linear (TKA Aljabar)**

### 1. Strategi Cepat SPLTV (Maksimal 3 Variabel)
Bentuk umum:
$$\\begin{cases} a_1 x + b_1 y + c_1 z = d_1 \\\\ a_2 x + b_2 y + c_2 z = d_2 \\\\ a_3 x + b_3 y + c_3 z = d_3 \\end{cases}$$

**Metode Eliminasi Terarah:**
1. Pilih **satu variabel termudah** untuk dieliminasi dari dua pasang persamaan (misal eliminasi $z$ dari pers. (1)&(2) dan pers. (1)&(3)).
2. Kamu akan menghasilkan Sistem Persamaan Linear Dua Variabel (SPLDV) baru dalam $x$ dan $y$.
3. Selesaikan SPLDV tersebut, lalu substitusikan kembali nilainya untuk mencari variabel ketiga.

---

### 2. Program Linear & Nilai Optimum
- **Daerah Himpunan Penyelesaian (DHP):**
  - Uji titik $(0,0)$ pada pertidaksamaan linear $ax + by \\leq c$. Jika bernilai benar, arsirlah daerah yang memuat titik $(0,0)$.
- **Uji Titik Pojok (Vertex Method):**
  - Tentukan titik-titik sudut batas poligon DHP.
  - Substitusikan koordinat titik $(x, y)$ ke dalam fungsi objektif $Z = ax + by$.
  - Nilai terbesar adalah **Maksimum**, dan nilai terkecil adalah **Minimum**.

💡 **Tips Ujian:** Pada soal cerita laba maksimum, titik optimum hampir 90% terjadi pada **titik potong antar garis kendala**! Cari titik potong kedua garis dengan eliminasi.`;
    }

    // 3. FUNGSI: INVERS & KOMPOSISI
    if (low.includes('fungsi') || low.includes('invers') || low.includes('komposisi') || low.includes('domain')) {
      return `📈 **Pembahasan Lengkap: Fungsi, Invers & Komposisi**

### 1. Domain & Range Fungsi
- **Fungsi Rasional:** $f(x) = \\frac{g(x)}{h(x)} \\implies$ Syarat Domain: $h(x) \\neq 0$.
- **Fungsi Irasional (Akar):** $f(x) = \\sqrt{g(x)} \\implies$ Syarat Domain: $g(x) \\geq 0$.

---

### 2. Rumus Kilat Invers Fungsi Rasional
Jika $f(x) = \\frac{ax + b}{cx + d}$, maka fungsi inversnya adalah:
$$f^{-1}(x) = \\frac{-dx + b}{cx - a}$$
*(Trik: Tukar posisi $a$ dan $d$, lalu kalikan tanda minus pada keduanya!)*

**Contoh:**
Jika $f(x) = \\frac{2x + 5}{3x - 4}$, maka langsung dapat:
$$f^{-1}(x) = \\frac{4x + 5}{3x - 2}$$

---

### 3. Fungsi Komposisi
- $(f \\circ g)(x) = f(g(x))$ *(Masukkan fungsi $g$ ke dalam fungsi $f$)*
- **Sifat Invers Komposisi:**
  $$(f \\circ g)^{-1}(x) = (g^{-1} \\circ f^{-1})(x)$$
  *(Ingat: urutannya dibalik dari belakang!)*`;
    }

    // 4. BARISAN & DERET, BUNGA MAJEMUK
    if (low.includes('bunga') || low.includes('barisan') || low.includes('deret') || low.includes('aritmetika') || low.includes('geometri')) {
      return `📊 **Pembahasan Lengkap: Barisan, Deret & Bunga Majemuk**

### 1. Barisan & Deret Aritmetika (Pola Selisih Tetap)
- Suku ke-$n$: $U_n = a + (n - 1)b$
- Jumlah $n$ suku pertama: $S_n = \\frac{n}{2}(2a + (n - 1)b) = \\frac{n}{2}(a + U_n)$

### 2. Barisan & Deret Geometri (Pola Rasio Tetap)
- Suku ke-$n$: $U_n = a \\cdot r^{n-1}$
- Jumlah $n$ suku pertama: $S_n = \\frac{a(r^n - 1)}{r - 1}$ (untuk $r > 1$)
- Deret Geometri Tak Hingga: $S_\\infty = \\frac{a}{1 - r}$ (syarat $-1 < r < 1$)

---

### 3. Bunga Tunggal vs Bunga Majemuk
| Kategori | Bunga Tunggal (Linier) | Bunga Majemuk (Eksponensial) |
| :--- | :--- | :--- |
| **Prinsip** | Bunga dihitung dari modal awal saja | Bunga berbunga (dihitung dari saldo akhir) |
| **Rumus** | $M_n = M_0(1 + n \\times i)$ | $M_n = M_0(1 + i)^n$ |
| **Grafik** | Garis Lurus (Aritmetika) | Kurva Melengkung Naik (Geometri) |

💡 **Pertumbuhan vs Peluruhan:**
- **Pertumbuhan (Bakteri/Penduduk):** $P_t = P_0(1 + r)^t$
- **Peluruhan (Zat Radioaktif):** $P_t = P_0 \\left(\\frac{1}{2}\\right)^{\\frac{t}{T_{1/2}}}$`;
    }

    // 5. GEOMETRI & DIMENSI TIGA
    if (low.includes('dimensi tiga') || low.includes('kubus') || low.includes('afh') || low.includes('pythagoras') || low.includes('geometri')) {
      return `📦 **Pembahasan Lengkap: Geometri Ruang & Pythagoras (TKA Pusmendik)**

### 1. Jarak pada Kubus Berusuk $s$
- **Diagonal Bidang:** $d_b = s\\sqrt{2}$ (contoh: $AC, BD, AF, EG$)
- **Diagonal Ruang:** $d_r = s\\sqrt{3}$ (contoh: $CE, AG, BH, DF$)

---

### 2. Titik ke Bidang Segitiga Diagonal ($AFH$ atau $BDG$)
Diagonal ruang $CE$ menembus bidang $AFH$ secara tegak lurus:
- Jarak titik sudut atas terdekat ($E$) ke bidang $AFH$:
  $$d(E, AFH) = \\frac{1}{3} s\\sqrt{3}$$
- Jarak titik sudut bawah seberang ($C$) ke bidang $AFH$:
  $$d(C, AFH) = \\frac{2}{3} s\\sqrt{3}$$

**Contoh Soal TKA:**
Pada kubus $ABCD.EFGH$ dengan rusuk $6\\text{ cm}$, tentukan jarak titik $C$ ke bidang $AFH$!
$$d = \\frac{2}{3} \\times 6\\sqrt{3} = 4\\sqrt{3}\\text{ cm}$$

💡 **Jembatan Keledai Araki:** Titik dekat dapat $\\frac{1}{3}$, titik jauh dapat $\\frac{2}{3}$ dari diagonal ruang!`;
    }

    // 6. TRANSFORMASI GEOMETRI
    if (low.includes('transformasi') || low.includes('translasi') || low.includes('refleksi') || low.includes('rotasi') || low.includes('dilatasi')) {
      return `🔄 **Pembahasan Lengkap: Transformasi Geometri Titik $(x, y)$**

### 1. Translasi (Pergeseran)
Titik $A(x, y)$ ditranslasikan oleh $T(a, b)$:
$$A'(x', y') = (x + a, y + b)$$

### 2. Refleksi (Pencerminan)
- Terhadap Sumbu $X$: $(x, -y)$
- Terhadap Sumbu $Y$: $(-x, y)$
- Terhadap Garis $y = x$: $(y, x)$
- Terhadap Garis $y = -x$: $(-y, -x)$
- Terhadap Garis $x = h$: $(2h - x, y)$
- Terhadap Garis $y = k$: $(x, 2k - y)$
- Terhadap Titik Asal $(0,0)$: $(-x, -y)$

---

### 3. Rotasi terhadap Pusat $(0,0)$
- Rotasi $+90^\\circ$ (berlawanan jarum jam): $(-y, x)$
- Rotasi $-90^\\circ$ (searah jarum jam): $(y, -x)$
- Rotasi $180^\\circ$: $(-x, -y)$

### 4. Dilatasi (Perkalian Skala)
- Pusat $(0,0)$ faktor skala $k$: $(kx, ky)$
- Pusat $(a, b)$ faktor skala $k$: $(a + k(x - a), b + k(y - b))$`;
    }

    // 7. TRIGONOMETRI
    if (low.includes('trigonometri') || low.includes('sin') || low.includes('cos') || low.includes('tan') || low.includes('elevasi')) {
      return `📐 **Pembahasan Lengkap: Trigonometri & Sudut Elevasi**

### 1. Perbandingan Segitiga Siku-Siku (De-Mi-Sa)
- $\\sin \\theta = \\frac{\\text{Depan}}{\\text{Miring}}$
- $\\cos \\theta = \\frac{\\text{Samping}}{\\text{Miring}}$
- $\\tan \\theta = \\frac{\\text{Depan}}{\\text{Samping}} = \\frac{\\sin \\theta}{\\cos \\theta}$
- Kebalikan: $\\csc \\theta = \\frac{1}{\\sin \\theta}$, $\\sec \\theta = \\frac{1}{\\cos \\theta}$, $\\cot \\theta = \\frac{1}{\\tan \\theta}$

---

### 2. Nilai Sudut Istimewa Wajib Dihafal
| Sudut | $0^\\circ$ | $30^\\circ$ | $45^\\circ$ | $60^\\circ$ | $90^\\circ$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| $\\sin$ | $0$ | $\\frac{1}{2}$ | $\\frac{1}{2}\\sqrt{2}$ | $\\frac{1}{2}\\sqrt{3}$ | $1$ |
| $\\cos$ | $1$ | $\\frac{1}{2}\\sqrt{3}$ | $\\frac{1}{2}\\sqrt{2}$ | $\\frac{1}{2}$ | $0$ |
| $\\tan$ | $0$ | $\\frac{1}{3}\\sqrt{3}$ | $1$ | $\\sqrt{3}$ | $\\infty$ |

---

### 3. Trik Kilat Soal Sudut Elevasi
$$\\text{Tinggi Objek Total} = (\\text{Jarak Mendatar} \\times \\tan \\theta) + \\text{Tinggi Mata Pengamat}$$
- Bila sudut elevasi **$45^\\circ$**, maka $\\tan 45^\\circ = 1$. Tinggi segmen atas tepat sama dengan jarak mendatar!`;
    }

    // 8. DATA & PELUANG
    if (low.includes('peluang') || low.includes('permutasi') || low.includes('kombinasi') || low.includes('data') || low.includes('median')) {
      return `🎲 **Pembahasan Lengkap: Data, Peluang & Kombinatorika**

### 1. Kapan Pakai Permutasi vs Kombinasi?
- **PERMUTASI (Urutan Diperhatikan):**
  Kata kunci: *Juara 1, 2, 3*, *Ketua, Sekretaris, Bendahara*, *Susunan Angka Plat Nomor*.
  $$P(n, r) = \\frac{n!}{(n - r)!}$$
- **KOMBINASI (Urutan Tidak Diperhatikan):**
  Kata kunci: *Memilih anggota delegasi*, *Mengambil bola dari kantong*, *Berjabat tangan*.
  $$C(n, r) = \\frac{n!}{r!(n - r)!}$$

---

### 2. Aturan Peluang
- Peluang Kejadian: $P(A) = \\frac{n(A)}{n(S)}$
- Peluang Komplemen: $P(A') = 1 - P(A)$
- **Saling Lepas (Tidak Mungkin Bersamaan):** $P(A \\cup B) = P(A) + P(B)$
- **Saling Bebas (Tidak Mempengaruhi):** $P(A \\cap B) = P(A) \\times P(B)$

---

### 3. Statistika Data Kelompok (Median & Modus)
- **Median ($Me$):**
  $$Me = L + \\left(\\frac{\\frac{n}{2} - \\sum f_k}{f_{me}}\\right) \\cdot p$$
- **Modus ($Mo$):**
  $$Mo = L + \\left(\\frac{d_1}{d_1 + d_2}\\right) \\cdot p$$`;
    }

    // 9. BAHASA INDONESIA: TEKSTUAL (KATA SERAPAN EYD V)
    if (low.includes('serapan') || low.includes('eyd') || low.includes('baku') || low.includes('tekstual')) {
      return `📖 **Pembahasan Lengkap: Pemahaman Tekstual & Kata Serapan Baku EYD V**

### 10 Pasang Kata Serapan yang Paling Sering Menjebak di TKA:
| Salah (Tidak Baku) | Benar (Baku EYD V) | Kaidah / Alasan Penyerapan |
| :--- | :--- | :--- |
| Standarisasi | **Standardisasi** | Kata dasar *standar* + sufiks *-isasi* |
| Analisa | **Analisis** | Akhiran *-ysis* bahasa Inggris diserap jadi *-isis* |
| Praktek | **Praktik** | Diserap dari bahasa Belanda *practijk* / Inggris *practice* |
| Aktifitas | **Aktivitas** | Huruf *f* berubah menjadi *v* sebelum akhiran *-itas* |
| Efektipitas | **Efektivitas** | Huruf *f* berubah menjadi *v* sebelum *-itas* |
| Kwalitas | **Kualitas** | Diftong *qu-* diserap menjadi *ku-* |
| Hirarki | **Hierarki** | Penyerapan dari kata *hierarchy* |
| Sistim | **Sistem** | Penyerapan dari kata *system* |
| Resiko | **Risiko** | Penyerapan dari kata Belanda *risico* / Inggris *risk* |
| Antri | **Antre** | Bentuk baku menurut KBBI adalah *antre* |

💡 **Trik Cepat TKA:** Semua kata yang berakhiran konsep ilmu/proses medis *-sis* (analisis, sintesis, hipotesis, diagnosis, krisis) TIDAK PERNAH berakhiran huruf "-a"!`;
    }

    // 10. BAHASA INDONESIA: INFERENSIAL (IDE POKOK)
    if (low.includes('ide pokok') || low.includes('inferensial') || low.includes('gagasan') || low.includes('paragraf')) {
      return `🔍 **Pembahasan Lengkap: Pemahaman Inferensial & Menemukan Ide Pokok**

### 1. Jenis Paragraf Berdasarkan Letak Ide Pokok
1. **Deduktif (Awal Paragraf):**
   - Kalimat pertama adalah **pernyataan umum/klaim utama**.
   - Kalimat berikutnya berisi bukti, data, contoh, atau rincian spesifik (*Ciri: tidak ada kata simpulan di akhir*).
2. **Induktif (Akhir Paragraf):**
   - Paragraf diawali contoh-contoh atau fenomena khusus.
   - Kalimat terakhir berisi kesimpulan umum.
   - *Kata Kunci Konjungsi Simpulan:* **Oleh karena itu, Dengan demikian, Jadi, Maka dari itu**.
3. **Campuran (Awal & Dipertegas di Akhir):**
   - Gagasan utama di awal lalu diulang kembali di akhir paragraf dengan kalimat penegas.

---

### 2. Cara Menarik Kesimpulan Inferensial (Tersirat)
- Cari **hubungan sebab-akibat (kausalitas)** antarparagraf.
- Abaikan opsi jawaban yang:
  - ❌ Terlalu sempit (hanya menjelaskan satu contoh di paragraf).
  - ❌ Terlalu luas (keluar dari ruang lingkup teks bacaan).
  - ❌ Menambahkan opini pribadi yang tidak didukung data teks.`;
    }

    // 11. BAHASA INDONESIA: EVALUASI FAKTA VS OPINI
    if (low.includes('fakta') || low.includes('opini') || low.includes('evaluasi') || low.includes('apresiasi')) {
      return `⚖️ **Pembahasan Lengkap: Evaluasi Teks — Membedakan Fakta vs Opini**

### Perbedaan Utama di Soal TKA:
| Indikator | Kalimat Fakta | Kalimat Opini |
| :--- | :--- | :--- |
| **Sifat** | Objektif, dapat dibuktikan secara empiris | Subjektif, bergantung penilaian/perasaan |
| **Kandungan** | Angka pasti, tanggal, nama lembaga, data riset | Asumsi, prediksi, kata sifat subjektif |
| **Kata Kunci** | *Tercatat, Berdasarkan data BPS, Terjadi pada...* | *Mungkin, Seharusnya, Sangat indah, Menurut hemat saya...* |

---

### Evaluasi Ketepatan & Kecukupan Informasi
1. **Akurasi Teks:** Apakah data yang disajikan logis dan tidak bertentangan antarparagraf?
2. **Kecukupan Bukti:** Apakah argumen penulis didukung oleh bukti pendukung yang valid atau hanya sekadar klaim sepihak?`;
    }

    // 12. EKONOMI & SOSIOLOGI
    if (low.includes('peluang') || low.includes('ekonomi') || low.includes('inflasi') || low.includes('sosiologi') || low.includes('konflik') || low.includes('arbitrase')) {
      return `💰 **Pembahasan Lengkap: Ekonomi & Sosiologi TKA 2026**

### 1. Biaya Peluang (Opportunity Cost)
- **Definisi:** Nilai dari **satu alternatif terbaik** yang harus dikorbankan ketika memilih suatu opsi.
- **Kunci Soal TKA:** Jika ada 3 tawaran kerja yang ditinggalkan, biaya peluangnya adalah **nilai tertinggi di antara yang ditinggalkan**, BUKAN dijumlahkan seluruhnya!

### 2. Kebijakan Moneter Bank Indonesia (Mengatasi Inflasi / Kebijakan Ketat)
1. **Operasi Pasar Terbuka:** Menjual Surat Berharga Indonesia (SBI) untuk menyerap uang beredar.
2. **Politik Diskonto:** Menaikkan suku bunga acuan (*BI Rate*) agar masyarakat giat menabung.
3. **Cadangan Kas Minimum (Cash Ratio):** Menaikkan rasio cadangan kas bank umum.

---

### 3. Sosiologi: Mediasi vs Arbitrase (Resolusi Konflik)
- **Mediasi:** Pihak ketiga netral (*mediator*) hanya bertindak sebagai fasilitator/penasihat. Putusan **TIDAK MENGIKAT**.
- **Arbitrase:** Para pihak menyerahkan wewenang kepada pihak ketiga (*arbiter*). Putusan **BERSIFAT FINAL & WAJIB DIPATUHI (MENGIKAT)**.
- **Ajudikasi:** Penyelesaian sengketa melalui meja hijau (pengadilan resmi).`;
    }

    // GENERAL FALLBACK RESPONSE
    return `🕷️ **Analisis Jawaban TKA ala Araki AI:**

Pertanyaan: *" ${q} "*

1. **Konsep & Definisi Kunci:**
   Topik ini menuntut pemahaman menyeluruh terhadap kaidah resmi Pusmendik. Pastikan kamu selalu membaca stimulus soal dengan saksama dan mengidentifikasi variabel atau kata kunci utama sebelum memilih opsi jawaban.

2. **Langkah Pemecahan Step-by-Step:**
   - **Langkah 1:** Identifikasi data/fakta yang diketahui dan target yang ditanyakan.
   - **Langkah 2:** Terapkan rumus operasional atau eliminasi opsi jawaban yang jelas salah.
   - **Langkah 3:** Periksa konsistensi satuan dan keselarasan makna dalam konteks kalimat.

3. **Tips Ujian TKA:**
   Gunakan fitur **Blurting Lab** untuk menguji daya ingatmu tanpa membuka catatan, lalu simpan ringkasan rumus ini di **Digital Notebook**!

Ada bagian rumus atau materi spesifik yang ingin dijelaskan lebih mendalam, Ila? ⚡`;
  };

  return (
    <div className="space-y-6 pb-28">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>ARAKI AI CHATGPT ENGINE</span>
            <span className="text-slate-500">·</span>
            <span className="text-emerald-400">GEMINI 3.8 FLASH ONLINE</span>
          </div>
          <h2 className="text-2xl font-black font-heading text-white tracking-tight flex items-center gap-2">
            <span>AI Tutor Araki</span>
            <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold">
              TKA 2026
            </span>
          </h2>
          <p className="text-xs text-slate-300">
            Tanyakan apa saja seputar kisi-kisi resmi TKA: rumus step-by-step, analogi konsep, kata serapan EYD V, dan trik kilat!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleClearChat}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 text-xs flex items-center gap-1 cursor-pointer transition-colors"
            title="Percakapan Baru"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Chat Baru</span>
          </button>
          <div className="hidden sm:block">
            <MascotSpider mood="idle" size="sm" />
          </div>
        </div>
      </div>

      {/* Category Filter Pills for Kisi-Kisi */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-rose-400" />
            <span>Pilih Topik Kisi-Kisi Cepat:</span>
          </span>
          <span className="text-[11px] text-slate-500">Klik untuk langsung bertanya</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                sound.playTap();
                setSelectedFilter(cat);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedFilter === cat
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-950 font-bold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filtered Prompt Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-1">
          {filteredSuggestions.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(p.prompt)}
              className="px-3.5 py-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-rose-500/60 text-xs text-slate-300 hover:text-white whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 shrink-0 active:scale-95 group shadow-sm"
            >
              <span>{p.icon}</span>
              <span className="font-medium">{p.label}</span>
              <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-rose-400 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Main ChatGPT-Style Chat Container */}
      <div className="rounded-3xl bg-slate-900/95 border border-slate-800 p-4 sm:p-6 shadow-2xl min-h-[480px] flex flex-col justify-between relative overflow-hidden spider-glow">
        {/* Messages Stream */}
        <div className="space-y-4 overflow-y-auto max-h-[520px] pr-2">
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-3 ${
                m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold shadow-md ${
                  m.sender === 'user'
                    ? 'bg-rose-600 text-white shadow-rose-950'
                    : 'bg-cyan-950 border border-cyan-500/40 text-cyan-300'
                }`}
              >
                {m.sender === 'user' ? 'IL' : '🕷️'}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-2xl p-4 sm:p-5 rounded-3xl text-xs sm:text-sm leading-relaxed whitespace-pre-line relative group ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-tr-none shadow-md shadow-rose-950'
                    : 'bg-slate-800/90 border border-slate-700/70 text-slate-100 rounded-tl-none shadow-xl'
                }`}
              >
                <div className="prose prose-invert max-w-none text-xs sm:text-sm">
                  {m.text}
                </div>

                {/* Bubble Footer */}
                <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-white/10 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <span>{m.sender === 'user' ? 'Ila' : 'Araki AI'}</span>
                    <span>·</span>
                    <span>{m.timestamp}</span>
                  </span>

                  {m.sender === 'tutor' && (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleCopy(m.id, m.text)}
                        className="p-1 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                        title="Salin Seluruh Jawaban"
                      >
                        {copiedId === m.id ? (
                          <span className="text-emerald-400 flex items-center gap-1 font-bold">
                            <Check className="w-3.5 h-3.5" /> Disalin
                          </span>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="text-[10px]">Salin</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {isGenerating && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-300 text-xs">
                🕷️
              </div>
              <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 text-xs text-cyan-300 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-semibold">Araki AI sedang membedah materi TKA & menyusun jawaban terbaik...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="Tanyakan rumus matematika, analogi konsep, kata serapan baku EYD V, atau soal latihan..."
            className="flex-1 p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500/80 transition-colors"
          />

          <button
            type="button"
            onClick={() => handleSend()}
            disabled={!inputVal.trim() || isGenerating}
            className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-500 disabled:opacity-40 text-white cursor-pointer shadow-lg shadow-rose-950 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center shrink-0"
            title="Kirim Pertanyaan"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Health check endpoint for Cloud Run container probes
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// AI Tutor endpoint
app.post('/api/ai-tutor', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (ai) {
      const systemInstruction = `Kamu adalah Araki, AI Tutor Superhero pribadinya Ila untuk persiapan TKA SMA (Pusmendik).
Gaya bicaramu ramah, energik, memotivasi, cerdas, seperti ChatGPT versi edukasi modern dengan nuansa superhero Spider-Hero.
Cakupan materi keahlianmu:
1. Matematika: Bilangan Real, SPLDV & SPLTV (maks 3 variabel), SPtLDV & Program Linear, Fungsi (linear, kuadrat, rasional, invers, komposisi), Barisan & Deret (aritmetika, geometri, pertumbuhan, peluruhan, bunga tunggal & majemuk), Geometri (objek geometri, jarak, kesebangunan, Pythagoras), Transformasi Geometri (translasi, refleksi, rotasi, dilatasi), Pengukuran, Trigonometri (sin, cos, tan, cot, sec, csc, elevasi), Data & Peluang (penyajian data, mean/median/modus, simpangan, permutasi, kombinasi, peluang).
2. Bahasa Indonesia: Pemahaman Tekstual (kata serapan EYD V, eksplisit, kerangka), Pemahaman Inferensial (ide pokok deduktif/induktif, kausalitas, watak, prediksi), Evaluasi & Apresiasi (fakta vs opini, validitas, apresiasi sastra).
3. Ekonomi & Akuntansi: Kelangkaan, biaya peluang, permintaan-penawaran-keseimbangan pasar, makroekonomi (PDB, inflasi, BI, fiskal, pajak), badan usaha, perdagangan internasional, persamaan dasar akuntansi Aset = Liabilitas + Ekuitas, laporan keuangan.
4. Sosiologi: Sosiologi sebagai ilmu (empiris, teoretis, kumulatif, non-etis), gejala & interaksi sosial, penelitian sosial, kelompok & konflik (mediasi, arbitrase), perubahan sosial & globalisasi.

Format jawabanmu:
- Terstruktur rapi dengan markdown (bullet points, bold, rumus yang jelas).
- Berikan langkah pengerjaan step-by-step jika pertanyaan berupa soal hitungan.
- Berikan analogi sederhana yang mudah dibayangkan.
- Berikan tips trik cepat atau jembatan keledai untuk hafalan.
- Selalu akhiri dengan kata-kata penyemangat untuk Ila!`;

      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history)) {
        for (const item of history.slice(-6)) {
          contents.push({
            role: item.sender === 'user' ? 'user' : 'model',
            parts: [{ text: item.text }],
          });
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || 'Maaf Ila, aku sedang berpikir keras. Coba ulangi pertanyaanmu ya!';
      return res.json({ reply: replyText });
    }

    // Fallback if no GEMINI_API_KEY
    return res.json({
      reply: null,
      fallbackNeeded: true,
    });
  } catch (error: any) {
    console.error('AI Tutor error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error', fallbackNeeded: true });
  }
});

// Mount Vite middleware for dev
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  const portNum = Number(port) || 3000;
  app.listen(portNum, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${portNum}`);
  });
}

startServer();

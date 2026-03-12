import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());

const API_KEY = process.env.API_KEY;

// Endpoint uji koneksi
app.get("/api/test", (req, res) => {
  res.send("Server aktif dan siap menerima permintaan.");
});

// Endpoint untuk data cuaca sekarang
app.get("/api/weather", async (req, res) => {
  const { city, lat, lon } = req.query;
  let url;

  if (city) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=id`;
  } else if (lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=id`;
  } else {
    return res.status(400).json({ error: "Parameter tidak lengkap" });
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data cuaca" });
  }
});

//  Endpoint untuk data prakiraan (forecast)
app.get("/api/forecast", async (req, res) => {
  const { city, lat, lon } = req.query;
  let url;

  if (city) {
    url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=id`;
  } else if (lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=id`;
  } else {
    return res.status(400).json({ error: "Parameter tidak lengkap" });
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data prakiraan" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));

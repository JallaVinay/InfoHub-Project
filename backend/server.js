import express from 'express'
import quotes from './quotesArray.js'
import weatherCodes from './weatherCodes.js'
import cors from "cors"

const app  = express()
app.use(cors())
const PORT = process.env.PORT|| 5000

app.listen(PORT,()=>{
    console.log("listenigg at ",PORT)
})

app.get("/quote",(req,res)=>{
    const i = Math.floor(Math.random() * quotes.length)
    res.json({quote:quotes[i]})
})




app.get('/currency', async (req, res) => {
  try {
    const amount = Number(req.query.amount)
    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' })
    }

    const resp = await fetch('https://api.frankfurter.app/latest?from=INR&to=USD,EUR')
    if (!resp.ok) return res.status(502).json({ error: 'Rate provider error' })
    const data = await resp.json()

    const usdRate = data?.rates?.USD
    const eurRate = data?.rates?.EUR
    if (!usdRate || !eurRate) return res.status(500).json({ error: 'Rates unavailable' })

    const usd = Number((amount * usdRate).toFixed(4))
    const eur = Number((amount * eurRate).toFixed(4))

    res.json({ usd, eur })
  } catch {
    res.status(500).json({ error: 'Conversion failed' })
  }
})
 


app.get("/weather", async (req, res) => {
  try {
    const city = String(req.query.city || "").trim()
    if (!city) return res.status(400).json({ error: "City required" })

    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en`)
    const geo = await geoRes.json()
    if (!geo.results?.length) return res.status(404).json({ error: "City not found" })

    const g = geo.results[0]
    const { latitude, longitude, name, country_code } = g

    const wRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
    )
    const w = await wRes.json()

    const cur = w.current
    const code = cur.weather_code
    const description = weatherCodes[code] || "Unknown"

    res.json({
      city: name,
      country: country_code,
      coords: { lat: latitude, lon: longitude },
      temperatureC: cur.temperature_2m,
      humidityPct: cur.relative_humidity_2m,
      windSpeedMs: cur.wind_speed_10m,
      weatherCode: code,
      description,
      time: cur.time
    })
  } catch (e) {
    res.status(500).json({ error: "Weather API error" })
  }
})

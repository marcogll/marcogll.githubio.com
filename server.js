import express from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const quotes = JSON.parse(readFileSync(join(__dirname, 'src/info/quotes.json'), 'utf-8'));

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

app.get('/api/time', (req, res) => {
  const timezone = process.env.TIMEZONE || 'UTC';
  const now = new Date();

  const options = {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  const dateTimeStr = formatter.format(now);
  const [datePart, timePart] = dateTimeStr.split(', ');

  res.json({
    utc_iso: now.toISOString(),
    unixtime: Math.floor(now.getTime() / 1000),
    datetime_human: `${datePart}, ${timePart}`,
    timezone: timezone
  });
});

app.get('/api/quote', (req, res) => {
  const phrases = quotes.phrases;
  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  res.json({ phrase: randomPhrase });
});

app.post('/api/contact', async (req, res) => {
  const webhookUrl = process.env.CONTACT_WEBHOOK;
  
  if (!webhookUrl) {
    return res.status(500).json({ error: 'Webhook not configured' });
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send' });
  }
});

app.use((req, res) => {
  res.sendFile(join(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
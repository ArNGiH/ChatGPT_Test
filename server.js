// server.js
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch'; // For making API requests

// Load environment variables from the .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Route for serving the index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Backend route to handle OpenAI API request
app.post('/getSolution', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_KEY}` // Use API key from .env
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{
          role: 'user',
          content: `Write a Python code for this question: ${message}`
        }]
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error('Error fetching solution:', error);
    res.status(500).send('Server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

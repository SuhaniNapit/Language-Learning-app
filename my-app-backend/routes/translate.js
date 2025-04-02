const express = require('express');
const router = express.Router();
const axios = require('axios');

// Translation endpoint
router.post('/translate', async (req, res) => {
    const { text, targetLanguage } = req.body;
    const apiKey = process.env.TRANSLATION_API_KEY; // Use environment variable for security

    try {
        const response = await axios.post(`https://translation.googleapis.com/language/translate/v2`, {
            q: text,
            target: targetLanguage,
            key: apiKey, // Include the API key in the request
        });

        // Send the translation result back to the client
        res.json(response.data.data.translations[0].translatedText);
    } catch (error) {
        console.error('Error translating text:', error);
        res.status(500).json({ error: 'Translation failed' });
    }
});

module.exports = router;

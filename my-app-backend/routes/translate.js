const express = require('express');
const router = express.Router();
const axios = require('axios');


router.post('/translate', async (req, res) => {
    const { text, targetLanguage } = req.body;
    const apiKey = process.env.TRANSLATION_API_KEY; 

    try {
        const response = await axios.post(`https://translation.googleapis.com/language/translate/v2`, {
            q: text,
            target: targetLanguage,
            key: apiKey, 
        });

       
        res.json(response.data.data.translations[0].translatedText);
    } catch (error) {
        console.error('Error translating text:', error);
        res.status(500).json({ error: 'Translation failed' });
    }
});

module.exports = router;

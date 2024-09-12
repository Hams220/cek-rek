const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();

// Set view engine to EJS
app.set('view engine', 'ejs');

// Middleware untuk parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

// Route untuk menampilkan halaman form
app.get('/', (req, res) => {
    res.render('index', { accountData: null, error: null });
});

// Route untuk handle form submit
app.post('/getEwalletAccount', async (req, res) => {
    const { bankCode, accountNumber } = req.body;
    const url = `https://api-rekening.lfourr.com/getEwalletAccount?bankCode=${bankCode}&accountNumber=${accountNumber}`;

    try {
        const response = await axios.get(url);
        res.render('index', { accountData: response.data, error: null });
    } catch (error) {
        res.render('index', { accountData: null, error: error.response ? error.response.data : error.message });
    }
});

// Jalankan server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

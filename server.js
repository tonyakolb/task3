const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

function isNaturalNumber(num) {
    const n = Number(num);
    return Number.isFinite(n) && Number.isInteger(n) && n > 0;
}

function gcd(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function lcm(a, b) {
    return Math.abs(a * b) / gcd(a, b);
}

app.get('/antoninakolb_gmail_com', (req, res) => {
    const x = req.query.x;
    const y = req.query.y;
    
    if (x === undefined || y === undefined) {
        return res.send('NaN');
    }
    
    if (!isNaturalNumber(x) || !isNaturalNumber(y)) {
        return res.send('NaN');
    }
    
    const numX = Number(x);
    const numY = Number(y);
    const result = lcm(numX, numY);
    
    res.send(result.toString());
});

app.get('/', (req, res) => {
    res.type('text').send('Сервер работает. Используйте: /antoninakolb_gmail_com?x=число&y=число\nПример: /antoninakolb_gmail_com?x=12&y=18');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
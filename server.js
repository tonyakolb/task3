const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

function isNaturalNumber(num) {
    if (num === '' || num === null || num === undefined) return false;
    const n = Number(num);
    return !isNaN(n) && isFinite(n) && Number.isInteger(n) && n > 0;
}

function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function lcm(a, b) {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / gcd(a, b);
}

app.get('/antoninakolb_gmail_com', (req, res) => {
    const x = req.query.x;
    const y = req.query.y;
    
    if (x === undefined || y === undefined || x === '' || y === '') {
        return res.type('text/plain; charset=utf-8').send('NaN');
    }
    
    if (!isNaturalNumber(x) || !isNaturalNumber(y)) {
        return res.type('text/plain; charset=utf-8').send('NaN');
    }
    
    const numX = Number(x);
    const numY = Number(y);
    
    if (numX <= 0 || numY <= 0 || !Number.isInteger(numX) || !Number.isInteger(numY)) {
        return res.type('text/plain; charset=utf-8').send('NaN');
    }
    
    const result = lcm(numX, numY);
    
    if (!Number.isInteger(result)) {
        return res.type('text/plain; charset=utf-8').send('NaN');
    }
    
    res.type('text/plain; charset=utf-8').send(result.toString());
});

app.get('/', (req, res) => {
    res.type('text/plain; charset=utf-8')
       .send('Use GET /antoninakolb_gmail_com?x=number&y=number');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
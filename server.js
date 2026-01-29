const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

function parseNatural(str) {
    if (str === undefined || str === null || String(str).trim() === '') {
        return null;
    }
    
    const s = String(str).trim();
    if (!/^\d+$/.test(s)) {
        return null;
    }
    
    try {
        const n = BigInt(s);
        return n > 0n ? n : null;
    } catch {
        return null;
    }
}

function gcd(a, b) {
    let x = a;
    let y = b;
    
    while (y !== 0n) {
        const temp = y;
        y = x % y;
        x = temp;
    }
    return x;
}

function lcm(a, b) {
    try {
        if (a === 0n || b === 0n) {
            return null;
        }
        
        const g = gcd(a, b);
        const product = a * b;
        
        const result = product / g;
        
        return result.toString();
    } catch (error) {
        return null;
    }
}

app.get('/antoninakolb_gmail_com', (req, res) => {
    const x = parseNatural(req.query.x);
    const y = parseNatural(req.query.y);
    
    if (x === null || y === null) {
        return res.send('NaN');
    }
    
    const result = lcm(x, y);
    
    if (result === null) {
        return res.send('NaN');
    }
    
    res.send(result);
});

app.get('/', (req, res) => {
    res.send('OK');
});

app.listen(port);
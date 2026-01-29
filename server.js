const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

function safeParseBigInt(str) {
    try {
        if (typeof str !== 'string' && typeof str !== 'number') {
            return { success: false, value: null };
        }
        
        const trimmed = String(str).trim();
        if (trimmed === '') {
            return { success: false, value: null };
        }
        
        if (!/^\d+$/.test(trimmed)) {
            return { success: false, value: null };
        }
        
        const bigIntValue = BigInt(trimmed);
        
        if (bigIntValue <= 0n) {
            return { success: false, value: null };
        }
        
        return { success: true, value: bigIntValue };
    } catch (error) {
        return { success: false, value: null };
    }
}

function gcdBigInt(a, b) {
    let x = a > b ? a : b;
    let y = a > b ? b : a;
    
    while (y !== 0n) {
        const temp = y;
        y = x % y;
        x = temp;
    }
    return x;
}

function lcmBigInt(a, b) {
    try {
        const product = a * b;
        
        if (product > BigInt(Number.MAX_SAFE_INTEGER)) {
            const gcdValue = gcdBigInt(a, b);
            const lcmValue = product / gcdValue;
            
            if (lcmValue.toString().length > 1000000) {
                return { success: false, value: null };
            }
            
            return { success: true, value: lcmValue.toString() };
        } else {
            const numA = Number(a);
            const numB = Number(b);
            const gcdValue = gcdBigInt(a, b);
            const lcmValue = (numA * numB) / Number(gcdValue);
            
            if (!Number.isFinite(lcmValue) || !Number.isInteger(lcmValue)) {
                return { success: false, value: null };
            }
            
            return { success: true, value: lcmValue.toString() };
        }
    } catch (error) {
        return { success: false, value: null };
    }
}

app.get('/antoninakolb_gmail_com', (req, res) => {
    const x = req.query.x;
    const y = req.query.y;
    
    if (x === undefined || y === undefined) {
        return res.type('text/plain; charset=utf-8').send('NaN');
    }
    
    const xParsed = safeParseBigInt(x);
    const yParsed = safeParseBigInt(y);
    
    if (!xParsed.success || !yParsed.success) {
        return res.type('text/plain; charset=utf-8').send('NaN');
    }
    
    const lcmResult = lcmBigInt(xParsed.value, yParsed.value);
    
    if (!lcmResult.success) {
        return res.type('text/plain; charset=utf-8').send('NaN');
    }
    
    res.type('text/plain; charset=utf-8').send(lcmResult.value);
});

app.get('/', (req, res) => {
    res.type('text/plain; charset=utf-8')
       .send('Use GET /antoninakolb_gmail_com?x=number&y=number');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
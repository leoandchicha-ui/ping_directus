const https = require('https');

const DIRECTUS_URL = 'https://smysl-bakery-directus.onrender.com/admin';

function ping() {
  const startTime = Date.now();
  
  https.get(DIRECTUS_URL, (res) => {
    const responseTime = Date.now() - startTime;
    
    console.log(`[${new Date().toISOString()}] Ping successful`);
    console.log(`Status: ${res.statusCode}`);
    console.log(`Response time: ${responseTime}ms`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('Response:', data);
      process.exit(0);
    });
    
  }).on('error', (err) => {
    console.error(`[${new Date().toISOString()}] Ping failed:`, err.message);
    process.exit(1);
  });
}

ping();

const https = require('https');

const DIRECTUS_URL = 'https://smysl-bakery-directus.onrender.com/admin/';

function ping() {
  const startTime = Date.now();

  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.DIRECTUS_STATIC_TOKEN}`,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      'Accept': '*/*'
    },
    timeout: 30000 // 30 seconds
  };

  const req = https.request(DIRECTUS_URL, options, (res) => {
    const responseTime = Date.now() - startTime;

    console.log(`[${new Date().toISOString()}] Ping successful`);
    console.log(`Status: ${res.statusCode}`);
    console.log(`Response time: ${responseTime}ms`);

    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log('Response length:', data.length);
      process.exit(0);
    });
  });

  req.on('timeout', () => {
    console.error(`[${new Date().toISOString()}] Ping failed: timeout`);
    req.destroy();
    process.exit(1);
  });

  req.on('error', (err) => {
    console.error(`[${new Date().toISOString()}] Ping failed:`, err.message);
    process.exit(1);
  });

  req.end();
}

ping();

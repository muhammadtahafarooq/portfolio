fetch('http://localhost:3000/').then(r => {
  console.log('Status:', r.status);
  console.log('Headers:', Object.fromEntries(r.headers.entries()));
  return r.text();
}).then(html => {
  // Look for error indicators
  if (html.includes('__next_error__')) console.log('Has __next_error__');
  if (html.includes('not-found')) console.log('Has not-found');
  
  // Extract all RSC payloads
  const matches = [...html.matchAll(/self\.__next_f\.push\(\[1,"(.+?)"\]\)/gs)];
  for (const m of matches) {
    const decoded = m[1].replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    if (decoded.includes('Error') || decoded.includes('error')) {
      console.log('=== ERROR IN RSC ===');
      console.log(decoded.substring(0, 800));
    }
  }
  
  // Check last part
  const lastPayload = matches[matches.length - 1];
  if (lastPayload) {
    const decoded = lastPayload[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
    console.log('=== LAST PAYLOAD ===');
    console.log(decoded.substring(0, 300));
  }
}).catch(e => console.log('Fetch error:', e.message));

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const envPath = path.join(__dirname, '.env');
const env = fs.readFileSync(envPath, 'utf8').split(/\r?\n/).reduce((acc, line) => {
  const [k, ...rest] = line.split('=');
  if (k && rest.length > 0) acc[k.trim()] = rest.join('=').trim();
  return acc;
}, {});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

(async () => {
  try {
    const { data, error } = await supabase.from('settings').select('*').limit(1);
    console.log('select error:', error);
    console.log('select data:', data);
  } catch (err) {
    console.error('exception', err);
  }
})();

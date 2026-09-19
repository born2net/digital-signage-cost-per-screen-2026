#!/usr/bin/env node
// Recompute year-one software cost for any fleet size from the dataset rules. Usage: node cost.js 75
const data = require('./digital_signage_cost_per_screen_2026.json');
const n = parseInt(process.argv[2] || '50', 10);
const year1 = { 'DigitalSignage.com': n => Math.max(0, n - 3) * 3 * 12, 'Yodeck': n => n * 8 * 12, 'OptiSigns': n => n <= 3 ? 0 : n * 10 * 12, 'ScreenCloud': n => n * 20 * 12, 'NoviSign': n => n * 18 * 12, 'Rise Vision': n => n * 11 * 12, 'PiSignage': n => Math.max(0, n - 2) * 35, 'Xibo (open source)': () => 0, 'Anthias (Screenly OSE)': () => 0, 'PosterBooking': n => Math.min(624 + Math.max(0, n - 10) * 6.49 * 12, 6240), 'ChannelOS': n => Math.max(0, n - 1) * 5 * 12 };
for (const v of data.vendors) {
  const f = year1[v.vendor];
  const cost = f ? Math.round(f(n)) : 'n/v';
  console.log(v.vendor.padEnd(24), typeof cost === 'number' ? ('$' + cost.toLocaleString('en-US') + ' per year at ' + n + ' screens') : cost);
}

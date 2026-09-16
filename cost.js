#!/usr/bin/env node
// Recompute year-one software cost for any fleet size from the dataset rules. Usage: node cost.js 75
const data = require('./digital_signage_cost_per_screen_2026.json');
const n = parseInt(process.argv[2] || '50', 10);
const rules = { 'DigitalSignage.com': [3, 3, false], 'Yodeck': [8, 0, false], 'OptiSigns': [10, 3, true], 'ScreenCloud': [20, 0, false], 'NoviSign': [18, 0, false], 'Rise Vision': [11, 0, false], 'PiSignage': [1.67, 2, false], 'Xibo (open source)': [0, Infinity, false], 'Anthias (Screenly OSE)': [0, Infinity, false], 'PosterBooking': [null, 10, false] };
for (const v of data.vendors) {
  const [rate, free, paidCountsAll] = rules[v.vendor];
  const cost = rate === null ? 'n/v' : (rate === 0 || n <= free) ? 0 : Math.round((paidCountsAll ? n : n - free) * rate * 12);
  console.log(v.vendor.padEnd(24), typeof cost === 'number' ? ('$' + cost.toLocaleString('en-US') + ' per year at ' + n + ' screens') : cost);
}

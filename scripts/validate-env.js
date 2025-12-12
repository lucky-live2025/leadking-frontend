#!/usr/bin/env node
// Frontend Environment Variable Validator

const required = [
  'NEXT_PUBLIC_API_URL',
  'NEXT_PUBLIC_CONTRACT_ADDRESS',
  'NEXT_PUBLIC_FRONTEND_URL'
];

const missing = required.filter(key => !process.env[key]);

if (missing.length > 0) {
  console.error('❌ Missing required environment variables:');
  missing.forEach(key => console.error(`  - ${key}`));
  process.exit(1);
}

console.log('✅ All required environment variables are set');
required.forEach(key => {
  console.log(`  ✓ ${key}: ${process.env[key] ? 'Set' : 'Missing'}`);
});


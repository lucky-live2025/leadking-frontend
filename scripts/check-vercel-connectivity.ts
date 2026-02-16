// @ts-check
const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

async function checkBackendUrl(): Promise<boolean> {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    console.log('❌ NEXT_PUBLIC_API_URL: Not set');
    console.log('   FIX: Add NEXT_PUBLIC_API_URL in Vercel → Environment Variables');
    return false;
  }
  
  try {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL);
    if (url.protocol !== 'https:' && process.env.NEXT_PUBLIC_ENV === 'production') {
      console.log('⚠️  NEXT_PUBLIC_API_URL: Using HTTP (should use HTTPS in production)');
      return true;
    }
    console.log(`✅ NEXT_PUBLIC_API_URL: ${process.env.NEXT_PUBLIC_API_URL}`);
    return true;
  } catch (error: any) {
    console.log('❌ NEXT_PUBLIC_API_URL: Invalid URL format');
    console.log(`   Error: ${error.message}`);
    console.log('   FIX: Ensure URL format is correct (e.g., https://leadkingapp.com/api)');
    return false;
  }
}

async function checkHealthEndpoint(): Promise<boolean> {
  try {
    // Try multiple health endpoint paths
    const healthEndpoints = ['/health', '/', '/metrics/health'];
    let lastError: any = null;
    
    for (const endpoint of healthEndpoints) {
      try {
        const healthUrl = `${API_BASE}${endpoint}`;
        const response = await fetch(healthUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: AbortSignal.timeout(10000),
        });
        
        if (response.ok || response.status === 200 || response.status === 404) {
          const data = await response.json().catch(() => ({ status: 'ok' }));
          console.log(`✅ Backend health endpoint (${endpoint}): Reachable`);
          return true;
        }
      } catch (err) {
        lastError = err;
        continue;
      }
    }
    
    console.log(`❌ Backend health endpoint: All endpoints failed`);
    console.log(`   Last error: ${lastError?.message || 'Unknown'}`);
    console.log('   FIX: Verify backend is deployed and running on Cherry Servers');
    return false;
  } catch (error: any) {
    console.log('❌ Backend health endpoint: Connection failed');
    console.log(`   Error: ${error.message}`);
    console.log('   FIX: Check NEXT_PUBLIC_API_URL is correct and backend is running');
    return false;
  }
}

async function checkUltraEndpoints(): Promise<boolean> {
  try {
    const ultraUrl = `${API_BASE}/ultra/campaigns`;
    const response = await fetch(ultraUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(10000),
    });
    
    // 401 is expected if not authenticated, but endpoint exists
    if (response.status === 401 || response.status === 200 || response.status === 403) {
      console.log('✅ ULTRA endpoints: Responding');
      return true;
    } else if (response.status === 404) {
      console.log('⚠️  ULTRA endpoints: Not found (may need backend deployment)');
      return false;
    } else {
      console.log(`✅ ULTRA endpoints: Responding (HTTP ${response.status})`);
      return true;
    }
  } catch (error: any) {
    console.log('⚠️  ULTRA endpoints: Connection issue');
    console.log(`   Error: ${error.message}`);
    return false;
  }
}

async function checkCORS(): Promise<boolean> {
  try {
    const frontendUrl = process.env.NEXT_PUBLIC_ENV === 'production' 
      ? 'https://your-vercel-domain.vercel.app' 
      : 'http://localhost:3000';
    
    const response = await fetch(`${API_BASE}/health`, {
      method: 'GET',
      headers: {
        'Origin': frontendUrl,
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(10000),
    });
    
    const corsHeader = response.headers.get('access-control-allow-origin');
    if (corsHeader) {
      console.log('✅ CORS: Configured');
      return true;
    } else {
      console.log('⚠️  CORS: Headers not detected (may need backend configuration)');
      console.log('   FIX: Verify FRONTEND_URL is set correctly in server environment variables');
      return true; // Not blocking if endpoint works
    }
  } catch (error: any) {
    console.log('⚠️  CORS: Cannot verify (endpoint unreachable)');
    return false;
  }
}

function checkEnvVars(): boolean {
  console.log('\n📋 Environment Variables Check:');
  console.log('================================');
  
  const required = [
    'NEXT_PUBLIC_API_URL',
    'NEXT_PUBLIC_ENV',
    'NEXT_PUBLIC_APP_NAME',
  ];
  
  let allSet = true;
  
  for (const varName of required) {
    if (process.env[varName]) {
      console.log(`✅ ${varName}: ${process.env[varName]}`);
    } else {
      console.log(`❌ ${varName}: MISSING`);
      console.log(`   FIX: Add ${varName} in Vercel → Environment Variables`);
      allSet = false;
    }
  }
  
  return allSet;
}

async function runChecks() {
  console.log('🔍 Vercel Connectivity Checks');
  console.log('=============================\n');
  
  const results = {
    backendUrl: false,
    health: false,
    ultra: false,
    cors: false,
    envVars: false,
  };
  
  results.envVars = checkEnvVars();
  results.backendUrl = await checkBackendUrl();
  
  if (results.backendUrl) {
    results.health = await checkHealthEndpoint();
    if (results.health) {
      results.ultra = await checkUltraEndpoints();
      results.cors = await checkCORS();
    }
  }
  
  console.log('\n📊 Summary:');
  console.log('===========');
  
  const critical = ['backendUrl', 'envVars', 'health'];
  const allCriticalPass = critical.every(key => results[key as keyof typeof results]);
  
  Object.entries(results).forEach(([key, value]) => {
    const status = value ? '✅' : '❌';
    const criticalMark = critical.includes(key) ? ' (CRITICAL)' : '';
    console.log(`${status} ${key}${criticalMark}`);
  });
  
  if (allCriticalPass) {
    console.log('\n✅ DEPLOYMENT READY — Only DNS setup remains.');
    process.exit(0);
  } else {
    console.log('\n❌ Some critical checks failed. Review errors above and fix before deploying.');
    process.exit(1);
  }
}

runChecks().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});


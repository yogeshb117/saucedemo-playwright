import { writeFileSync } from 'fs';

async function globalSetup() {
  process.env.EXECUTION_TIME = Date.now().toString();
}

export default globalSetup;

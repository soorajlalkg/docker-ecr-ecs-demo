import { checkDBHealth } from './db.service';

export class HealthService {
  static async getHealth() {
    const dbHealthy = await checkDBHealth();

    return {
      status: dbHealthy ? 'UP' : 'DEGRADED',
      database: dbHealthy ? 'UP' : 'DOWN',
      timestamp: new Date().toISOString(),
    };
  }
}

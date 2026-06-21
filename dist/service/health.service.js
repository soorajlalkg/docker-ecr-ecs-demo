"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthService = void 0;
const db_service_1 = require("./db.service");
class HealthService {
    static async getHealth() {
        const dbHealthy = await (0, db_service_1.checkDBHealth)();
        return {
            status: dbHealthy ? 'UP' : 'DEGRADED',
            database: dbHealthy ? 'UP' : 'DOWN',
            timestamp: new Date().toISOString(),
        };
    }
}
exports.HealthService = HealthService;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const health_service_1 = require("../service/health.service");
class HealthController {
    static async getHealth(req, res) {
        const response = await health_service_1.HealthService.getHealth();
        res.status(200).json(response);
    }
}
exports.HealthController = HealthController;

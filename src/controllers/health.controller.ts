import { Request, Response } from 'express';
import { HealthService } from '../service/health.service';

export class HealthController {
  static async getHealth(req: Request, res: Response): Promise<void> {
    const response = await HealthService.getHealth();

    res.status(200).json(response);
  }
}

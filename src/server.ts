import dotenv from 'dotenv';

dotenv.config();

import app from './app';
import { connectDB } from './service/db.service';

const PORT = Number(process.env.PORT || 3000);

async function bootstrap() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Application startup failed:', error);
    process.exit(1);
  }
}

bootstrap();

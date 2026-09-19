import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config();

const config = defineConfig({
  dialect: 'postgresql',
  schema: './src/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

export default config;

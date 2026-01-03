// prisma.config.ts
import { defineConfig, env } from '@prisma/config';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // This tells the CLI where to push the schema
    url: env('DATABASE_URL'), 
  }
});
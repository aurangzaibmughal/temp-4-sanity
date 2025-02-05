import { createClient } from '@sanity/client';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const client = createClient({
  projectId: process.env.SANITY_STUDIO_SANITY_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_SANITY_DATASET,
  token: "sk0dzFf6UG7Y0qlTdBvtS6iZfVXPWDqivu6yH7fwTyyveesX62uBEr2b0bheaihzYxtwm1aPQ8bSKFyzO9TqSvz3dBysEsFi21nCvvWTbTQlrf9zRCWlNPO50VVLwdEAVLtKmnGIiSclK4Ax8nrTWS5p8kQGzZqAHG2JEx5U32H0DuElfzdR",
  apiVersion: '2025-01-15',
  useCdn: false,
});


async function testSanityConnection() {
    try {
      const datasets = await client.datasets.list();
      console.log('Sanity Connection Successful:', datasets);
    } catch (error) {
      console.error('Sanity Connection Failed:', error);
    }
  }
  
  testSanityConnection();
  
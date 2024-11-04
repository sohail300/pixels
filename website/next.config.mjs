/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
    webpack: (config) => {
        config.resolve.alias['@db'] = path.resolve(__dirname, '../db');
        config.resolve.alias['@common'] = path.resolve(__dirname, '../common');
        return config;
    },
};

export default nextConfig;
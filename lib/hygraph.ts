import { Graffle } from 'graffle'

/**
 * Advanced TypeScript pattern for environment variable validation
 */
const getEnvVar = (name: string): string => {
    const value = process.env[name];
    if (!value) {
        if (process.env.NODE_ENV === 'production') {
            throw new Error(`Missing environment variable: ${name}`);
        }
        console.warn(`⚠️ Warning: Missing environment variable ${name}`);
        return '';
    }
    return value;
};

const HYGRAPH_ENDPOINT = getEnvVar('HYGRAPH_ENDPOINT');

/**
 * Configure Graffle client for Hygraph
 * Using advanced TS patterns for client configuration
 */
export const hygraph = Graffle
    .create()
    .transport({ url: HYGRAPH_ENDPOINT });

/**
 * Typed Queries Container
 * In a real application, these would be generated using Graffle's generator
 */
export const HygraphQueries = {
    // Placeholder for future typed queries
} as const;

export type HygraphQueries = typeof HygraphQueries;
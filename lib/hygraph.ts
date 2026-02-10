import { Graffle } from 'graffle'

/**
 * Advanced TypeScript pattern for environment variable validation
 */
const getEnvVar = (name: string): string => {
    const value = process.env[name];
    if (!value) {
        // Do not throw during build to prevent Vercel build failure.
        // The application will handle missing data gracefully.
        console.warn(`⚠️ Warning: Missing environment variable ${name}`);
        return '';
    }
    return value;
};

const HYGRAPH_ENDPOINT = getEnvVar('HYGRAPH_ENDPOINT') || getEnvVar('NEXT_PUBLIC_HYGRAPH_ENDPOINT');
const HYGRAPH_TOKEN = process.env.HYGRAPH_PROD_AUTH_TOKEN || process.env.NEXT_PUBLIC_HYGRAPH_TOKEN;

/**
 * Configure Graffle client for Hygraph
 * Using advanced TS patterns for client configuration
 */
export const hygraph = Graffle
    .create()
    .transport({
        url: HYGRAPH_ENDPOINT,
        headers: HYGRAPH_TOKEN ? { Authorization: `Bearer ${HYGRAPH_TOKEN}` } : {}
    });

/**
 * Typed Queries Container
 * In a real application, these would be generated using Graffle's generator
 */
export const HygraphQueries = {
    getMenuList: `
    query getMenuList {
      menuCategories {
        name
        items {
          id
          name
          name_ko
          price
          image {
            url
          }
          table_setting {
            name
          }
          attribute {
            name
          }
        }
      }
    }
  `
} as const;

export type HygraphQueries = typeof HygraphQueries;
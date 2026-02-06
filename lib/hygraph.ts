import { GraphQLClient } from 'graphql-request';

const HYGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;
const HYGRAPH_TOKEN = process.env.HYGRAPH_PROD_AUTH_TOKEN;

if (!HYGRAPH_ENDPOINT) {
    console.warn('⚠️ HYGRAPH_ENDPOINT is not defined in .env.local');
}

export const hygraphClient = new GraphQLClient(HYGRAPH_ENDPOINT || '', {
    headers: HYGRAPH_TOKEN
        ? {
            Authorization: `Bearer ${HYGRAPH_TOKEN}`,
        }
        : {},
});

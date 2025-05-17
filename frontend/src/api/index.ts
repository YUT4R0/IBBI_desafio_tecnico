const domain = import.meta.env.VITE_DOMAIN;
const port = import.meta.env.VITE_DOMAIN;

const baseURL = `http://${domain}:${port}/api/v1`;

export { baseURL, domain, port };

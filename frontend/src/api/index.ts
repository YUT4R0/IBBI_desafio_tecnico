const domain = import.meta.env.VITE_DOMAIN;
const port = import.meta.env.VITE_PORT;

const baseURL = `http://${domain}:${port}`;

export { baseURL, domain, port };

export const config = {
  NODE_ENV: import.meta.env.VITE_NODE_ENV,
  PORT: import.meta.env.VITE_PORT,
  BASE_URL: import.meta.env.VITE_BASE_URL,
  API_USERS: import.meta.env.VITE_APP_API_USERS,
  API_NOTES: import.meta.env.VITE_APP_API_NOTES,
};

export const baseProps = config.NODE_ENV === 'production' ? { basename: config.BASE_URL } : {};

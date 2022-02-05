/**
 * Export the API URL based on the environment variable.
 * If 'NODE.ENV' is 'development', then the API URL is 'http://localhost:5000'.
 * If 'NODE.ENV' is 'production', then the API URL is 'https://api.reminderse.com'.
 * If 'NODE.ENV' is 'test', then the API URL is 'https://reminderse-testing.herokuapp.com'.
 */
export const API_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : process.env.NODE_ENV === "production" ? "https://api.reminderse.com" : "https://reminderse-testing.herokuapp.com";

export const CONFIG = {
    AUTH: {
        GOOGLE_CLIENT_ID: '698773466958-s0aa126m3nbb0165d6qlego15pkhedcj.apps.googleusercontent.com',
        TOKEN_KEY: 'auth_token',
        USER_KEY: 'auth_user'
    },
    API: {
        BASE_URL: 'http://127.0.0.1:8000',
        AUTH_ENDPOINTS: {
            GOOGLE: '/api/auth/google',
            LOGIN: '/api/auth/login', 
            LOGOUT: '/api/auth/logout'
        }
    }
};

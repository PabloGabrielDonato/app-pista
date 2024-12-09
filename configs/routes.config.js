import {BACKEND_URL} from './app.config';

export const apiEndpoint = {
    auth: {
        register:`${BACKEND_URL}/api/auth/register`,
        login: `${BACKEND_URL}/api/auth/login`,
        logout: `${BACKEND_URL}/api/auth/logout`,
    },
    locations:{
        index: `${BACKEND_URL}/api/locations`,
    },
    bookings:{
        create: `${BACKEND_URL}/api/bookings`,
    }
}

export const route = {
    home: 'Home',
    bookingForm: 'BookingForm',
    reservas: 'Reservas',
    perfil: 'Perfil',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
}

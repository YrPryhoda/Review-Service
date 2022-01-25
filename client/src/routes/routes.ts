export const routes = {
    login: '/login',
    register: '/register',
    registerFinish: '/register/finish/:id',
    home: '/',
    profile: '/profile',
    placeDetails: '/places/:placeId',
    accountConfirm: '/auth/confirm/:userId/:signupConfirmId',
    createPlace: '/places/create',
    places: '/places',
    notFound: '*'
};

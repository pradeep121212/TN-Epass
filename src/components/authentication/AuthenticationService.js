import Axios from "axios";
import { API_URL } from '../../constants'
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
export const ADMIN_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedAdmin';
export const GUEST_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedGuest';

const createJwtAuthToken = (token) => {
    return 'Bearer ' + token;
}

class AuthenticationService {
    registerSuccessfulLoginGuest(username, token) {

        sessionStorage.setItem(GUEST_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(createJwtAuthToken(token));

    }
    registerSuccessfulLoginUser(username, token) {

        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(createJwtAuthToken(token));

    }
    registerSuccessfulLoginAdmin(username, token) {

        sessionStorage.setItem(ADMIN_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(createJwtAuthToken(token));

    }

    executeJwtAuthenticationService(username, password) {
        return Axios.post(API_URL + "/authenticate", { username, password });
    }

    // refreshJwtAuthenticationService() {
    //     return Axios.post(API_URL + "/refresh",);
    // }

    initialGuestLogin() {
        this.executeJwtAuthenticationService("guest", "guest")
            .then((res) => {
                this.registerSuccessfulLoginGuest("guest", res.data.token);
            });
    }




    logoutAdmin() {
        sessionStorage.removeItem(ADMIN_NAME_SESSION_ATTRIBUTE_NAME);

    }
    logoutGuest() {
        sessionStorage.removeItem(GUEST_NAME_SESSION_ATTRIBUTE_NAME);

    }
    logoutUser() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);

    }


    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user === null) return false
        return true
    }

    isAdminLoggedIn() {
        let user = sessionStorage.getItem(ADMIN_NAME_SESSION_ATTRIBUTE_NAME);
        if (user === null) return false
        return true
    }
    isGuestLoggedIn() {
        let user = sessionStorage.getItem(GUEST_NAME_SESSION_ATTRIBUTE_NAME);
        if (user === null) return false
        return true
    }
    getLoggedInMobileNo() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        return user;
    }
    setupAxiosInterceptors(token) {

        Axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn)
                    config.headers.authorization = token;
                return config;
            }
        );
    }




}
export default new AuthenticationService();
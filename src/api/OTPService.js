import Axios from "axios";

class OTPService {

    generateOTP(number) {
        return Axios.get(`http://localhost:8080/generateOtp/${number}`);
    }

    validateOTP(number, otp) {

        return Axios.get(`http://localhost:8080/validateOtp/${number}?otpnum=${otp}`);
    }




}

export default new OTPService();
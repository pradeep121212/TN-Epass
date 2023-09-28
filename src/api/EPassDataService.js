import Axios from "axios";
import { API_URL, JPA_API_URL } from '../constants'

class EPassDataService {

    fetchAllPasses() {
        return Axios.get(`${JPA_API_URL}/passes`);
    }

    fetchAllPassesByMobileNo(mobileNo) {
        return Axios.get(`${JPA_API_URL}/passes/mobile/${mobileNo}`);
    }

    findPassById(id) {

        return Axios.get(`${JPA_API_URL}/passes/${id}`);
    }

    updateStatus(id, status) {

        return Axios.put(`${JPA_API_URL}/passes/${id}`, { status });
    }
    savePass(pass) {
        console.log(pass);

        const headers = {
            'Content-Type': 'application/json',
        }

        return Axios.post(`${JPA_API_URL}/passes`, pass, { headers: headers });
    }

    postImage(formData) {
        return Axios.post(`${API_URL}/upload`, formData);

    }

    viewImage(id) {
        return Axios.get(`${API_URL}/download/${id}`);

    }



}

export default new EPassDataService();
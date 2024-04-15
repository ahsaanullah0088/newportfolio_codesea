import axios from "axios"

// for singnup
export let SignUpReq = 
    async(formData) => {
        try {
            let response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/signup`,formData);
            return response.data;
        } catch (error) {
            return error;
        }
    }

    // for login
    export let logReq = 
        async(formData) => {
            try {
                let response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/login`,formData);
                return response.data;
            } catch (error) {
                return error
            }
        }

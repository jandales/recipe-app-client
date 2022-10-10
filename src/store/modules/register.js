import axios from '../../axios'

const actions = {

    async register({commit},payload) {
        return await axios.post('/api/register/store', payload);  
    },
 
}

export default {
     actions,
}
import { createStore } from 'vuex'

import recipes from './modules/recipes';
import register from './modules/register';
import user from './modules/user';
import auth from './modules/auth';

export default createStore ({  
    modules : {
        recipes, 
        register,
        user,     
        auth
    }
 })

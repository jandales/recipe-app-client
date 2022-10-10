import store from '../store/index';
import useLocalStorege from '../helpers/localStorage'

const { removeItem } = useLocalStorege();

export default async(to, from, next) => {

    let isAuthenticated = false;

    try {

        await store.dispatch('auth');

        isAuthenticated = store.getters.isAuthenticated; 

    } catch (error) {

        if (error.response.status === 401){

            isAuthenticated = false;

        }
    }    

    if (!isAuthenticated) {
        
        removeItem('etto_recipe_app_user')

        return next({name: 'login'});
    }

    next();
    
}
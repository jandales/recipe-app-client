import store from '../store/index';

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


    
    if(isAuthenticated) return next({name : 'home'})

    localStorage.removeItem('etto_recipe_app_user')
    next();
    
}

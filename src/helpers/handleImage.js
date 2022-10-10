import { getCurrentInstance } from 'vue';

export default function handleuserImage(user) {   
    const app = getCurrentInstance()
    const {$baseUrl , $defaultAvatar } = app.appContext.config.globalProperties;
    if (!user.image) return $defaultAvatar;
    if (user.provider)  return user.image;     
    return $baseUrl + user.image;  
}
import * as axios from "axios";

const instance = axios.create({
    withCredentials: true, //  исп. куки, показать что я авторизован
    baseURL: `http://localhost:8080/vk/`,
})


export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users`) // запрос на сервер
            .then(response => {    // теперь нам get запрос возвращает из response только data
                return response.data
            })
    },

    follow(userId) {
        return instance.post(`follow/${userId}`)
    },

    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
    },

    getProfile(userId) {
        console.warn("Obsolete method. Please use profileAPI object ")
        return profileAPI.getProfile(userId) // делегирование на другой метод
    },
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId); // запрос на сервер
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId); // запрос на сервер
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status}); // запрос на сервер
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile );
    }
}



export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe, captcha = null ) {    // post'им данные о авторизации
        return instance.post(`login`, {email, password})
    },
    logout() {    // удавляем данные о авторизации (разлогиниваемся)
        return instance.delete(`login`)
    },
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    }
}
import { API_URL, RESOURCE, APP_VERSION } from '@lib/config';

export const login = (email,password) => {
    return new Promise((resolve,reject) => {
        let form = 'email='+encodeURIComponent(email)
            +'&password='+password
            +'&appversion='+APP_VERSION
            +'&res='+RESOURCE;
        fetch(API_URL+'/login',{
            method: 'post',
            body: form,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
        })
        .then(res => res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}

export const forgotPassword = (email) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/reset-password-mail',{
            method: 'POST',
            body: JSON.stringify({
                email,
                appversion:APP_VERSION,
                res:RESOURCE,
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'fl_auth_version': '4'
            },
        })
        .then(res => res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}

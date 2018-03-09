import { API_URL, RESOURCE, APP_VERSION } from './config';

module.exports = (email,password) => {
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

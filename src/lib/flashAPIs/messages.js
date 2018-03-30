import { API_URL, RESOURCE, APP_VERSION } from '@src/config';

export const getMessages = (auth_version=4, sessionToken='',
    date_from='',offset=0, size=5) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/get-messages',{
            method: 'POST',
            body: JSON.stringify({
                date_from,
                offset,
                size,
                appversion:APP_VERSION,
                res:RESOURCE,
            }),
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res =>res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}

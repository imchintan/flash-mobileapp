import { APP_URL, API_URL, RESOURCE, APP_VERSION } from '@src/config';

/**
 * Get Oracle Profile Access List
 * @param  {Number} auth_version        API authentication version
 * @param  {String} sessionToken        User authorization token
 * @return {Promise}
 */
export const getOracleProfileAccessList = (auth_version, sessionToken) => {
    return new Promise((resolve,reject) => {
        let params = 'appversion='+APP_VERSION+'&res='+RESOURCE;
        fetch(`${API_URL}/get-oracle-profile-access-list?${params}`,{
            method: 'GET',
            body: null,
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            }
        })
        .then(res => res.json())
        .then(json =>resolve(json))
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}

/**
 * Get Oracle Events
 * @param  {Number} auth_version        API authentication version
 * @param  {String} sessionToken        User authorization token
 * @return {Promise}
 */
export const getOracleEvents = (auth_version, sessionToken) => {
    return new Promise((resolve,reject) => {
        let params = 'appversion='+APP_VERSION+'&res='+RESOURCE;
        fetch(`${API_URL}/get-oracle-events?${params}`,{
            method: 'GET',
            body: null,
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            }
        })
        .then(res => res.json())
        .then(json =>resolve(json))
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}

/**
 * Get Oracle Event Details
 * @param  {Number} auth_version        API authentication version
 * @param  {String} sessionToken        User authorization token
 * @param  {Number} id                  Event ID
 * @return {Promise}
 */
export const getOracleEvent = (auth_version, sessionToken, id) => {
    return new Promise((resolve,reject) => {
        let params = 'id='+id+'&appversion='+APP_VERSION+'&res='+RESOURCE;
        fetch(`${API_URL}/get-oracle-event?${params}`,{
            method: 'GET',
            body: null,
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            }
        })
        .then(res => res.json())
        .then(json =>resolve(json))
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}

/**
 * Add Oracle Event
 * @param  {Number} auth_version            API authentication version
 * @param  {String} sessionToken            User authorization token
 * @param  {Object} data                    Event data
 *   ⮑ @param  {String} event_name         Event name
 *      @param  {String} p1                 1st player / team name
 *      @param  {String} p2                 2nd player / team name
 *      @param  {Number} fee_type           Fee type (1 - Percentage / 0 - Flat)
 *      @param  {Number} fees               Event Fees
 *      @param  {Number} expires_on_ts      Event expires on (timestamp)
 *      @param  {Number} ends_on_ts         Event ends on (timestamp)
 *      @param  {Object} event_pic_url      Event logo / image (optional)
 *      @param  {Number} min                Event minimum limit in FLASH (optional)
 *      @param  {Number} max                Event maximum limit in FLASH (optional)
 *      @param  {String} description        Extra notes (optional)
 * @return {Promise}
 */
export const addOracleEvent = (auth_version, sessionToken, data) => {
    return new Promise((resolve,reject) => {
        let body = new FormData();

        Object.keys(data).forEach(k=>{
            if(k !== 'event_pic_url')
                body.append(k, data[k]);
        });
        if(data.event_pic_url){
            body.append('event_pic',{uri: data.event_pic_url, name: 'event_pic_url', filename :'event_pic_url.png', type: 'image/png'});
        }
        body.append('appversion', APP_VERSION);
        body.append('res', RESOURCE);
        // fetch(`${API_URL}/add-oracle-event`,{
        fetch(`${APP_URL}event/create`,{
            method: 'POST',
            body: body,
            headers: {
               'Content-Type': 'multipart/form-data',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            }
        })
        .then(res => res.json())
        .then(json =>resolve(json))
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}

/**
 * Update Oracle Event
 * @param  {Number} auth_version            API authentication version
 * @param  {String} sessionToken            User authorization token
 * @param  {Number} id                      Event ID
 * @param  {Object} data                    Event data
 *   ⮑ @param  {Number} expires_on_ts      Event expires on (timestamp)
 *      @param  {Number} ends_on_ts         Event ends on (timestamp)
 *      @param  {String} description        Extra notes (optional)
 * @return {Promise}
 */
export const updateOracleEvent = (auth_version, sessionToken, id, data) => {
    return new Promise((resolve,reject) => {
        fetch(`${API_URL}/update-oracle-event`,{
            method: 'POST',
            body: JSON.stringify({
                id,
                ...data,
                appversion:APP_VERSION,
                res:RESOURCE,
            }),
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            }
        })
        .then(res => res.json())
        .then(json =>resolve(json))
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}

/**
 * Get My Oracle Events
 * @param  {Number} auth_version        API authentication version
 * @param  {String} sessionToken        User authorization token
 * @return {Promise}
 */
export const getMyOracleEvents = (auth_version, sessionToken) => {
    return new Promise((resolve,reject) => {
        let params = 'appversion='+APP_VERSION+'&res='+RESOURCE;
        fetch(`${API_URL}/get-my-oracle-events?${params}`,{
            method: 'GET',
            body: null,
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            }
        })
        .then(res => res.json())
        .then(json =>resolve(json))
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}

/**
 * Get My Active Oracle Events
 * @param  {Number} auth_version        API authentication version
 * @param  {String} sessionToken        User authorization token
 * @return {Promise}
 */
export const getMyActiveOracleEvents = (auth_version, sessionToken) => {
    return new Promise((resolve,reject) => {
        let params = 'appversion='+APP_VERSION+'&res='+RESOURCE;
        fetch(`${API_URL}/get-my-active-oracle-events?${params}`,{
            method: 'GET',
            body: null,
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            }
        })
        .then(res => res.json())
        .then(json =>resolve(json))
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}

/**
 * Declare Oracle Event Result
 * @param  {Number} auth_version        API authentication version
 * @param  {String} sessionToken        User authorization token
 * @param  {Number} id                  Event ID
 * @param  {Object} data                Event result data
 *   ⮑ @param  {Number} result         Event result type (1- declared, 2-tie, 3-cancelled)
 *      @param  {String} winner         Event winner name, if result = 1
 *      @param  {String} cancel_reason  Event cancel reason , if result = 3
 * @return {Promise}
 */
export const declareOracleEventResult = (auth_version, sessionToken, id, data) => {
    return new Promise((resolve,reject) => {
        fetch(`${API_URL}/declare-oracle-event-result`,{
            method: 'POST',
            body: JSON.stringify({
                id,
                ...data,
                appversion:APP_VERSION,
                res:RESOURCE,
            }),
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            }
        })
        .then(res => res.json())
        .then(json =>resolve(json))
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}

/**
 * Add Oracle Wager
 * @param  {Number} auth_version            API authentication version
 * @param  {String} sessionToken            User authorization token
 * @param  {Number} event_id                Event ID
 * @param  {Number} p                       On which Player (1/2)
 * @param  {Number} amount                  wager amount
 * @param  {String} txn_hex               Wallet signed transaction hex
 * @param  {String} txn_id                  Wallet signed transaction ID
 * @return {Promise}
 */
export const addOracleWager = (auth_version, sessionToken, event_id,
    p, amount, txn_hex, txn_id) => {
    return new Promise((resolve,reject) => {
        fetch(`${API_URL}/add-oracle-wager`,{
            method: 'POST',
            body: JSON.stringify({
                event_id,
                p,
                amount,
                txn_hex,
                txn_id,
                appversion:APP_VERSION,
                res:RESOURCE,
            }),
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            }
        })
        .then(res => res.json())
        .then(json =>resolve(json))
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}

/**
 * Setup Oracle Profile
 * @param  {Number} auth_version            API authentication version
 * @param  {String} sessionToken            User authorization token
 * @param  {Object} data                    Profile data
 *   ⮑ @param  {String} email              Email address
 *      @param  {String} company_name       Profile company name
 * @return {Promise}
 */
export const setupOracleProfile = (auth_version, sessionToken, data) => {
    return new Promise((resolve,reject) => {
        fetch(`${API_URL}/setup-oracle-profile`,{
            method: 'POST',
            body: JSON.stringify({
                ...data,
                appversion:APP_VERSION,
                res:RESOURCE,
            }),
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            }
        })
        .then(res => res.json())
        .then(json =>resolve(json))
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}

/**
 * Update Oracle Profile
 * @param  {Number} auth_version            API authentication version
 * @param  {String} sessionToken            User authorization token
 * @param  {Object} data                    Profile data
 *   ⮑  @param  {String} company_name      Profile company name
 * @return {Promise}
 */
export const updateOracleProfile = (auth_version, sessionToken, data) => {
    return new Promise((resolve,reject) => {
        fetch(`${API_URL}/update-oracle-profile`,{
            method: 'POST',
            body: JSON.stringify({
                ...data,
                appversion:APP_VERSION,
                res:RESOURCE,
            }),
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            }
        })
        .then(res => res.json())
        .then(json =>resolve(json))
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}

/**
 * Get Oracle Profile
 * @param  {Number} auth_version            API authentication version
 * @param  {String} sessionToken            User authorization token
 * @return {Promise}
 */
export const getOracleProfile = (auth_version, sessionToken) => {
    return new Promise((resolve,reject) => {
        let params = 'appversion='+APP_VERSION+'&res='+RESOURCE;
        fetch(`${API_URL}/get-oracle-profile?${params}`,{
            method: 'GET',
            body: null,
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            }
        })
        .then(res => res.json())
        .then(json =>resolve(json))
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}

/**
 * Disable Oracle Profile
 * @param  {Number} auth_version            API authentication version
 * @param  {String} sessionToken            User authorization token
 * @return {Promise}
 */
export const disableOracleProfile = (auth_version, sessionToken) => {
    return new Promise((resolve,reject) => {
        return resolve({rc:1});
        // let params = 'appversion='+APP_VERSION+'&res='+RESOURCE;
        // fetch(`${API_URL}/disable-oracle-profile?${params}`,{
        //     method: 'GET',
        //     body: null,
        //     headers: {
        //        'Content-Type': 'application/json; charset=utf-8',
        //        'authorization': sessionToken,
        //        'fl_auth_version': auth_version
        //     }
        // })
        // .then(res => res.json())
        // .then(json =>resolve(json))
        // .catch(e =>{
        //     console.log(e);
        //     reject('Something went wrong!')
        // });
    });
}

/**
 * Enable Oracle Profile
 * @param  {Number} auth_version            API authentication version
 * @param  {String} sessionToken            User authorization token
 * @return {Promise}
 */
export const enableOracleProfile = (auth_version, sessionToken) => {
    return new Promise((resolve,reject) => {
        return resolve({rc:1});
        // let params = 'appversion='+APP_VERSION+'&res='+RESOURCE;
        // fetch(`${API_URL}/enable-oracle-profile?${params}`,{
        //     method: 'GET',
        //     body: null,
        //     headers: {
        //        'Content-Type': 'application/json; charset=utf-8',
        //        'authorization': sessionToken,
        //        'fl_auth_version': auth_version
        //     }
        // })
        // .then(res => res.json())
        // .then(json =>resolve(json))
        // .catch(e =>{
        //     console.log(e);
        //     reject('Something went wrong!')
        // });
    });
}

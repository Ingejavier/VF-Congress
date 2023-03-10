import * as Promise from 'bluebird';
// XMLHttpRequest wrapper using callbacks

export let myRequest = obj => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(obj.method || "GET", obj.url);
        if (obj.headers) {
            Object.keys(obj.headers).forEach(key => {
                xhr.setRequestHeader(key, obj.headers[key]);
            });
        }
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(obj.body);
    });
};

export function isMobileDevice  () { return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1); };

export function windowsize  () { 
    let w_ = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let h_ = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    return {w:w_ , h:h_};
};

export let info = {}


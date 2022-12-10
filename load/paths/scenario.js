import http from 'k6/http';
import {check} from 'k6';

export const scenario = (url) => {
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let index = http.get(`${url}`, params)
    check(index, {
        "index page check": (resp) => resp.status === 200
    });

    let paths = http.get(`${url}/paths`, params)
    check(paths, {
        "get stations check": (resp) => resp.status === 200
    });

    let source = Math.floor(Math.random() * 10 + 1);
    let target = Math.floor(Math.random() * 10 + 1);
    let findPath = http.get(`${url}/paths/?source=${source}&target=${target}`)
    check(findPath, {
        "find path check": (resp) => resp.status === 200
    });
}

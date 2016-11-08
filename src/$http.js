'use strict';

import fetch from 'isomorphic-fetch'
import { message } from 'antd'

const $http = {
    get(url, params) {
        let query = url;
        if (params && params !== '') {
            query += '?';
            for (let i in params) {
                if (params[i].isArray) {
                    params[i].forEach(function (value) {
                        query += `${i}=${value}&`;
                    })
                } else {
                    query += i + '=' + params[i] + '&';
                }
            }
            query = query.substr(0, query.length - 1);
        }

        return fetch(query, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(response => response.json());
    },
    post(url, params) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params),
            credentials: 'include'
        }).then(response => response.json(),
                () => {
                    message.error('无法连接网络', 2);
                });
    },
    delete(url) {
        return fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(response => response.json(),
                () => {
                    message.error('无法连接网络', 2);
                });
    },
    postFile(url, formdata) {
        return fetch(url, {
            method: 'POST',
            body: formdata,
            credentials: 'include'
        }).then(response => response.json(),
            () => {
                message.error('无法连接网络', 2);
            })
    }
};

export default $http;

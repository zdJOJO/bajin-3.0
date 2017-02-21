/**
 * Created by Administrator on 2017/02/21 0021.
 */
import cookie from 'react-cookie'

import {
    POST_CIPHERTEXT
} from './actionTypes';

import {port} from '.././public/'
let token = cookie.load('token');


//密文
const postCiphertext =(text)=>{
    return{
        type: POST_CIPHERTEXT,
        text
    }
}

//根据订单号 获取密文 GET
const getOrderCiphertext = obj =>{
    let url = port + '/card/bank/scmv/pay/'+obj.cardno+'/'+obj.scmvOrderId+'?token='+token;
    return dispatch =>{
        return fetch(url)
            .then( res =>{
                console.log(res)
                return res.text()
            })
            .then( text =>{
                console.log(text)
                dispatch(postCiphertext(text));
                obj.dom.submit();
            })
            .catch( e =>{
                console.log(e)
            })
    }
}

//生成订单 POST
const generateOrder = obj =>{
    let url = '';
    let data = {};
    if(obj.type === 'scmvOrder'){
        url = port + '/card/scmvOrder/create?token=' + token + '&tp=' + parseInt(new Date().getTime()/1000)
    }
    if(obj.type === 'scmvOrder'){
        data = {
            sum: obj.sum,
            price: obj.price,
            scmvOrderMapModels: obj.scmvOrderMapModels
        }
    }
    return dispatch =>{
        return fetch(url , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then( res =>{
            return res.json()
        }).then( json =>{
            console.log('json is:')
            console.log(json)
            dispatch(getOrderCiphertext({
                cardno: '3994',
                scmvOrderId: json.data.id,
                dom: obj.dom
            }))
        }).catch( e =>{
            console.log(e)
        })
    }
}





/*
*type:
* scmvOrder: 课程模块订单
*
* */
export const disPatchFetchOrder =(obj)=>{
    return dispatch =>{
        switch (obj.type){
            case 'scmvOrder':
                console.log(obj)
                return dispatch(generateOrder(obj))
        }
    }
}
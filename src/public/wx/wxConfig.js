/**
 * Created by Administrator on 2017/02/20 0020.
 */

import {port ,appid} from '../index';
import {hex_md5} from '../md5';

//获取页面URL
export const getUrl = url =>{
    console.log(url)
}

//随机字符生成算法 (用于 生成 nonceStr)
const randomString = len => {
    len = len || 32;
    var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}


const wxReady = ()=>{
    window.wx.ready( type =>{
        switch (type){
            case 'share' :
                break;
            case 'position' :
                break;
            case 'wxPay':
                let appid = '';
                let nonceStr  = '';
                let packageStr = '';
                let timeStamp = '';
                let stringA = "appId=" + appid + "&nonceStr=" + nonceStr + "&package=" + packageStr + "&signType=MD5&timeStamp=" + timeStamp ;
                let stringSignTemp = stringA + "&key=29798840529798840529798840529798";
                let sign = hex_md5(stringSignTemp).toUpperCase();

                window.wx.chooseWXPay({
                    timestamp: timeStamp , // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
                    package: packageStr, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                    signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: sign, // 支付签名
                    success: function (res) {
                        // 支付成功后的回调函数
                    }
                });
        }
    })
}

const wxConfig = (jsapi_ticket)=>{
    const nonceStr = randomString(32);
    const timestamp = String( parseInt((new Date().getTime() / 1000)) );
    const urlStr = '';
    const string1 = 'jsapi_ticket=' + jsapi_ticket + '&noncestr=' + nonceStr + '&timestamp=' + timestamp + '&url=' + urlStr;
    const signature = hex_md5(string1);

    window.wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx886a1d1acb7084a5', // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名，见附录1
        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',  // 分享到朋友圈
            'onMenuShareAppMessage', //分享给朋友
            'chooseWXPay',  //微信支付
            'openLocation',
            'getLocation'    //获取地理位置
        ]
        // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wxReady()
}


export const wx_jssdk_api = ()=>{
    //向 后台获取 jsapi_ticket
    let port = 'http://www.winthen.com/';
    let url = port + '/card/weixin/token/get';
    fetch( url )
        .then( res =>{
            return res.json()
        })
        .then( json =>{
            console.log(json)
            wxConfig(json.wxticket);
        })
        .catch( e =>{
            console.log(e)
        })
}

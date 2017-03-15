/**
 * Created by Administrator on 2017/02/20 0020.
 */

import {port} from '../index';
import {hex_sha1} from '../sha1';

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


export const wxConfig = (wxParamObj)=>{
    let get_jsapi_ticket_url = port + '/card/weixin/token/get';
    fetch( get_jsapi_ticket_url )
        .then( res=>{
            return res.json()
        })
        .then( result =>{
            let urlStr = wxParamObj.url;
            let nonceStr = randomString(16);
            let timestamp =  String( parseInt((new Date().getTime() / 1000)) );
            let jsapi_ticket = result.wxticket;
            let string1 = 'jsapi_ticket=' + jsapi_ticket + '&noncestr=' + nonceStr + '&timestamp=' + timestamp + '&url=' + urlStr;
            let signature = hex_sha1(string1);

            window.wx.config({
                debug: true,
                appId: 'wx886a1d1acb7084a5',
                timestamp: timestamp,
                nonceStr: nonceStr,
                signature: signature,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',  // 分享到朋友圈
                    'onMenuShareAppMessage', //分享给朋友
                    'chooseWXPay'    //微信支付
                ]
                // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });


            window.wx.ready(function () {
                let shareUrl = '';
                switch (wxParamObj.typeStr){
                    case 'share' :
                        // wxParamObj.type :  1-首页  2-详情
                        window.wx.onMenuShareTimeline({
                            title: '', // 分享标题
                            link: shareUrl, // 分享链接
                            imgUrl: '', // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });

                        window.wx.onMenuShareAppMessage({
                            title: '', // 分享标题
                            desc: '', // 分享描述
                            link: shareUrl, // 分享链接
                            imgUrl: '', // 分享图标
                            type: '', // 分享类型,music、video或link，不填默认为link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                        break;
                    case 'position' :
                        break;
                    case 'wxPay':
                        window.wx.chooseWXPay({
                            timestamp: wxParamObj.timeStamp , // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                            nonceStr: wxParamObj.nonceStr, // 支付签名随机串，不长于 32 位
                            package: wxParamObj.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                            signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                            paySign: wxParamObj.paySign, // 支付签名
                            success: function (res) {
                                // 支付成功后的回调函数
                                history.back(-1)
                            }
                        });
                }
            });
        })
        .catch(e =>{
            console.log(e)
        });
};
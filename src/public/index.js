/**
 * Created by Administrator on 2017/01/09 0009.
 */

import { hashHistory } from 'react-router';
import cookie from 'react-cookie'
/*
* 当
* hashHistory.push({
         pathname: '/login',
         query: {isNeedBack: 1}
     })
* isNeedBack:
* 1 -  登录需要 返回上一页
* */

//dev位boolean类型
// true--正式环境， false--测试环境
const dev = false;

// 接口
export const port = dev ? 'http://www.winthen.com' : "http://test.winthen.com" ;

//cookie
export const token = cookie.load('token');

/*
*
* 注意在使用react-router时候，若是使用了browserHistory，需要配置nginx
*
* */
// 路由根目录。
export const rootPath =()=>{
    return dev ? '/test' : '/bcard';
}


//
export const appid = '';


//通用函数 时间戳转换成 固定格式
     // isAll：true  输出完整格式 年月日时分秒
    // isAll：false  输出完整格式 年月日
export const timestampFormat = (timestamp,isAll)=> {
    const y = new Date(timestamp*1000).getFullYear();
    const m = new Date(timestamp*1000).getMonth()+1>9?(new Date(timestamp*1000).getMonth()+1):'0'+(new Date(timestamp*1000).getMonth()+1);
    const d = new Date(timestamp*1000).getDate()>9?new Date(timestamp*1000).getDate():'0'+new Date(timestamp*1000).getDate();
    const h = new Date(timestamp*1000).getHours()>9?new Date(timestamp*1000).getHours():'0'+new Date(timestamp*1000).getHours();
    const f = new Date(timestamp*1000).getMinutes()>9?new Date(timestamp*1000).getMinutes():'0'+new Date(timestamp*1000).getMinutes();
    // const s = new Date(timestamp*1000).getSeconds()>9?new Date(timestamp*1000).getSeconds():'0'+new Date(timestamp*1000).getSeconds();
    if(isAll){
        if((h === '00' || h === '23')&&( f === '00' || f === '59')){
            return (y+'.'+m+'.'+d);
        }else {
            return (y+'.'+m+'.'+d+' '+h+':'+f);
        }
    }else {
        return (y+'.'+m+'.'+d);
    }
};



//判断  token 是否 过期
export const isTokenExpired = (code, callback) =>{
    if(code==='666'){
        cookie.remove('token');
        hashHistory.push({
            pathname: '/login',
            query: {isNeedBack: 1}
        })
    }else {
        callback();
    }
}






/*  ******* ActionSheet 和 Dialog  定义  *******
constructor(props){
    super(props)
    const {showDialog, showPayPopup} = this.props;
    this.state = {
        myDialog: {
            style1: {
                title: '提示' ,
                content: '请选择课程',
                buttons: [
                    {
                        label: '知道了',
                        onClick: ()=>{showDialog(false)}
                    }
                ]
            },
            style2: {
                title: '提示',
                buttons: [
                    {
                        type: 'default',
                        label: '取消',
                        onClick: ()=>{showDialog(false)}
                    },
                    {
                        type: 'primary',
                        label:  '',
                        onClick: ()=>{showDialog(false)}
                    }
                ]
            }
        },
        myActionSheet: {
            menus: [{
                label: '银行卡支付',
                onClick: this.handleSubmitOrderInfo.bind(this)
            }, {
                label: '微信支付',
                onClick: ()=> { console.log('微信支付')  }
            }],
            actions: [
                {
                    label: '取消',
                    onClick: ()=>{showPayPopup(false)}
                }
            ]
        }
    }
}

*/

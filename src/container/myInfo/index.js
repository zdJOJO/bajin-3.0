/**
 * Created by Administrator on 2017/01/05 0005.
 */
import React,{Component} from 'react';

import Menu from '../../router/menu';

class MyInfo extends Component{
    render(){
        return(
            <div className="panel panel-default">
                这个是我的信息 <br />
                <a href="#/myCourse">我的课程</a> <br />
                <a href="#/myBankCard">我的银行卡</a>
                <Menu />
            </div>
        )
    }
}

export default MyInfo;
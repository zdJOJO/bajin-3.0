/**
 * Created by Administrator on 2017/01/05 0005.
 */
import React,{Component} from 'react';

import Menu from '../../router/menu'
import Myswiper from '../swiper/index'

const array = ['A','B','C','D','E','F','G'];
class Home extends Component{
    render(){
        return(
            <div className="panel panel-default">
                这个是首页
                <Myswiper array={array} />
                <Menu />
            </div>
        )
    }
}

export default Home;
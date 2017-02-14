/**
 * Created by Administrator on 2017/01/05 0005.
 */
import React,{Component} from 'react';

import HeaderBar from '../../components/headerNav/headBar';
import HeaderNav from '../../components/headerNav/index';
import Menu from '../../router/menu';

import './index.css'

const menuList = [
    {
        menuName: '精选',
        path: '/course'
    },
    {
        menuName: '24课堂',
        path: '/course/two4Class'
    }
]


class CourseBox extends Component{
    render(){
        return(
            <div className="panel panel-default">
                <div className="headerBox">
                    <HeaderBar content="课程"/>
                    <HeaderNav menuList={menuList}/>
                </div>
                { this.props.children }
                <Menu />
            </div>
        )
    }
}

export default CourseBox;
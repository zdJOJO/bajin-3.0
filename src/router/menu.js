/**
 * Created by Administrator on 2017/01/05 0005.
 */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { IndexLink ,Link } from 'react-router' // 引入Link处理导航跳转

import home from '../img/menu/home.png'
import home_active from '../img/menu/home_active.png'
import activity from '../img/menu/activity.png'
import activity_active from '../img/menu/activity_active.png'
import course from '../img/menu/course.png'
import course_active from '../img/menu/course_active.png'
import my from '../img/menu/my.png'
import my_active from '../img/menu/my_active.png'

import {handleChangeTab ,changeSub} from '../actions/menuAction'


const menu = [
    {
        menuName: '首页',
        img: home,
        activeImg: home_active,
        path: '/'
    },
    {
        menuName: '活动',
        img: activity,
        activeImg: activity_active,
        path: '/activity'
    },
    {
        menuName: '课程',
        img: course,
        activeImg: course_active,
        path: '/course'
    },
    {
        menuName: '我的',
        img: my,
        activeImg: my_active,
        path: '/myInfo'
    }
];

class Menu extends Component{
    componentDidMount() {
        const { handleChangeTab  ,changeSub} = this.props;
         if(location.hash==='#/activity'){
             handleChangeTab(1);
         }else if(location.hash==='#/course'||location.hash==='#/course/select'||location.hash==='#/course/two4Class'){
             handleChangeTab(2);
             if(location.hash==='#/course/two4Class'){
                 changeSub('course',1);
             }
         }else if(location.hash==='#/myInfo'){
             handleChangeTab(3);
        }else {
            handleChangeTab(0);
        }
    }

    render(){
        const { handleChangeTab ,currentIndex} = this.props;
        return(
            <nav>
                {
                    menu.map((menu,index)=>{
                        return(
                            menu.path==='/' ?
                                <IndexLink to={menu.path} key={index} activeClassName="active" onClick={()=>handleChangeTab(index)}>
                                    <img
                                        role="presentation"
                                        src={currentIndex === index ? menu.activeImg : menu.img}
                                    />
                                    <i>{menu.menuName}</i>
                                </IndexLink>
                                :
                                <Link to={menu.path} key={index} activeClassName="active" onClick={()=>handleChangeTab(index)}>
                                    <img
                                        role="presentation"
                                        src={currentIndex === index ? menu.activeImg : menu.img}
                                    />
                                    <i>{menu.menuName}</i>
                                </Link>
                        )
                    })
                }
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentIndex: state.menuReducer.index,
    }
}

export default connect(
    mapStateToProps,{handleChangeTab ,changeSub}
)(Menu)
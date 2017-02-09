/**
 * Created by Administrator on 2017/01/05 0005.
 */
import React,{Component} from 'react';
import {Link } from 'react-router';  // 引入Link处理导航跳转

import './index.css';

export default class HeaderNav extends Component{
    render(){
        return(
            <header>
                {
                    this.props.menuList.map((menu,index)=>{
                        return (
                            <Link to={menu.path} key={index} activeClassName="active_activity">{menu.menuName}</Link>
                        )
                        // return (
                        //     <Link to={menu.path} key={index} activeClassName="active_activity">{menu.menuName}</Link>
                        // )
                    })
                }
            </header>
        )
    }
}
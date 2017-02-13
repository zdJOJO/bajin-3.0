/**
 * Created by Administrator on 2017/01/05 0005.
 */
import React,{Component} from 'react';
import { IndexLink ,Link } from 'react-router';  // 引入Link处理导航跳转

import './index.css';

export default class HeaderNav extends Component{
    render(){
        return(
            <nav className="headerNav">
                {
                    this.props.menuList.map((menu,index)=>{
                        return (
                            menu.path === '/course' ?
                                <IndexLink key={index} to={menu.path} activeClassName="active_headerNav">
                                    {menu.menuName}
                                </IndexLink>
                                :
                                <Link key={index} to={menu.path} activeClassName="active_headerNav">
                                    {menu.menuName}
                                </Link>
                        )
                    })
                }
            </nav>
        )
    }
}
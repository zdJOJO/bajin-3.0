/**
 * Created by Administrator on 2017/01/05 0005.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import { IndexLink ,Link } from 'react-router';  // 引入Link处理导航跳转

import {changeSub} from '../../actions/menuAction'

import './index.css';

// this.props.isRouter  判断二级导航是否是 router
class HeaderNav extends Component{
    render(){
        const { changeSub ,currentIndex } = this.props;
        return(
            <nav className="headerNav">
                { !this.props.isRouter &&
                    this.props.menuList.map((menu,index)=>{
                        return (
                            menu.path === '/course' ?
                                <IndexLink key={index} to={menu.path} activeClassName="active_headerNav"
                                           onClick={()=>{changeSub('course',index)}}>
                                    <span>
                                        {menu.menuName}
                                        { currentIndex === index &&
                                            <i/>
                                        }
                                    </span>
                                </IndexLink>
                                :
                                <Link key={index} to={menu.path} activeClassName="active_headerNav" onClick={()=>{changeSub('course',index)}}>
                                    <span>
                                        {menu.menuName}
                                        { currentIndex === index &&
                                        <i/>
                                        }
                                    </span>
                                </Link>
                        )
                    })
                }
                { this.props.isRouter === '0' &&
                    this.props.menuList.map((menu,index)=>{
                        return(
                            <a key={index}
                                  to={menu.path}
                                  className={ currentIndex === index ? "active_headerNav" : "" }
                                  onClick={()=>{changeSub('course',index)}}
                            >
                                    <span>
                                        {menu.menuName}
                                        { currentIndex === index && <i/> }
                                    </span>
                            </a>
                        )
                    })
                }
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentIndex: state.menuReducer.courseNav.index
    }
}

export default connect(
    mapStateToProps,{changeSub}
)(HeaderNav);
/**
 * Created by Administrator on 2017/01/05 0005.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import { hashHistory } from 'react-router';
import cookie from 'react-cookie';

import HeaderBar from '../../components/headerNav/headBar';
import Menu from '../../router/menu';
import Activity from './activity';
import ActivityInitiating from './activityInitiating'


import {popup} from '../../actions/activityAction'

//import Using ES6 syntax
import {Popup} from 'react-weui';

import './index.css';
import back from '../../img/back.svg';
import search from '../../img/search.svg';
// import add from '../../img/add.svg';

class ActivityBox extends Component{

    handleArouse(){
        const {popup} = this.props;
        if(cookie.load('token')){
            popup(true)
        }else {
            hashHistory.push({pathname: '/login'})
        }
    }

    render(){
        const {popup ,fullpage_show} = this.props;
        return(
            <div className="panel panel-default">
                <div className="headerBox">
                    <span className="left">
                        <img  role="presentation" src={search}/>
                    </span>
                    <HeaderBar content="活动"/>
                    <span className="right" onClick={this.handleArouse.bind(this)}>
                        {/*<img role="presentation" src={add}/>*/}
                        发起
                    </span>
                </div>
                <Activity />
                <Menu />
                <Popup
                    show={fullpage_show}
                >
                    <div style={{height: '100vh', overflow: 'scroll'}}>
                        <div className="headerBox">
                            <span className="left">
                                <img  role="presentation" src={back} onClick={()=>popup(false)}/>
                            </span>
                            <HeaderBar content="发起活动"/>
                        </div>
                        <ActivityInitiating />
                    </div>
                </Popup>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        fullpage_show: state.activityReducer.initiateAct.popupIsShow
    }
}

export default connect(
    mapStateToProps,{popup}
)(ActivityBox)
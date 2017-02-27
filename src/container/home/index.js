/**
 * Created by Administrator on 2017/01/05 0005.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import Menu from '../../router/menu'
import Myswiper from '../swiper/index'
import Icbc from '../icbc/index'

import './index.css'

class Home extends Component{

    componentWillMount(){
        
    }

    render(){
        return(
            <div id="home" className="panel panel-default">
                <Myswiper />
                <Icbc />
                <Menu />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(
    mapStateToProps,{}
)(Home)
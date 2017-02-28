/**
 * Created by Administrator on 2017/01/05 0005.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import Menu from '../../router/menu'
import Myswiper from '../swiper/index'
import Icbc from '../icbc/index'
import Content from './Content'

import './index.css'

class Home extends Component{

    componentWillMount(){
        
    }

    render(){
        const {firstList} = this.props;
        return(
            <div className="panel panel-default">
                <div id="home">
                    <Myswiper pagination="true"  typeStr="icbc" />
                    <Icbc />
                    <div className="totalContentBox">
                        <Content firstList={firstList} type="1" title="热门" typeStr="hot"/>
                        <Content firstList={firstList} type="2" title="其他" typeStr="second"/>
                        <Content firstList={firstList} type="3" title="臻品" typeStr="good"/>
                    </div>
                </div>
                <Menu />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        firstList: state.homeReducer.firstList
    }
}

export default connect(
    mapStateToProps,{}
)(Home)
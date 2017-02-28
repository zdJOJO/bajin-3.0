/**
 * Created by Administrator on 2017/02/27 0027.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import HomeTitle from '../../components/homeTitle/index'

import { fetchData } from '../../actions/homeAction'

import './index.css'

class Icbc extends Component{

    componentWillMount(){
        const {fetchData} = this.props;
        fetchData({
            type: 2,
            isHome: true
        })
    }
    
    render(){
        const {icbcBtnList} = this.props;
        return(
            <div className="icbcBox">
                <HomeTitle 
                    title='工行服务'
                    typeStr='icbc'
                />
                <ul>
                    {
                        icbcBtnList.map( (item)=>{
                            return(
                                <li key={item.pickId}>
                                    <img role="presentation" src={item.buttonPic}/>
                                    <span className="buttonTitle">{item.buttonTitle}</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        icbcBtnList: state.homeReducer.icbcBtnList
    }
}

export default connect(
    mapStateToProps,{fetchData}
)(Icbc)
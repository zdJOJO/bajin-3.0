/**
 * Created by Administrator on 2017/01/05 0005.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import Menu from '../../router/menu'
import Myswiper from '../swiper/index'
import Icbc from '../icbc/index'
import Content from './Content'

import {fetchData} from '../../actions/homeAction'
import {dispatchFetchData} from '../../actions/userAction'

import './index.css'

class Home extends Component{

    componentWillMount(){
        const {fetchData, dispatchFetchData} = this.props;
        fetchData({
            type: 3,
            page: 1
        });
        dispatchFetchData({type: 2})
    }

    render(){
        const {contentList} = this.props;
        return(
            <div className="panel panel-default">
                <div id="home">
                    <Myswiper pagination="false"  typeStr="icbc" />
                    <Icbc />
                    <div className="totalContentBox">
                        {
                            contentList.map((content,index)=>{
                                return(
                                    <Content
                                        key={index}
                                        list={content.hcpageModels}
                                        type={content.type}
                                        title={content.title}
                                        type2FirsElement={
                                         content.type===2 ? content.type2FirsElement : ''
                                        }
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                <Menu />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        contentList: state.homeReducer.contentList
    }
}

export default connect(
    mapStateToProps,{
        fetchData, dispatchFetchData
    }
)(Home)
/**
 * Created by Administrator on 2017/03/20 0020.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import HeaderBar from '../../components/headerNav/headBar'
import { Button, PanelHeader,LoadMore, Toast } from 'react-weui'

import {fetchCollect} from '../../actions/publicAction'

import './index.css'

class MyCollection extends Component{

    constructor(props){
        super(props);
        this.state ={
            page: 1
        }
    }

    componentDidMount (){

    }

    render(){
        const {fetchCollect, collectionList, collectionLoading} = this.props;
        return(
            <div id="collect" className="panel panel-default">
                <HeaderBar content="我的收藏"  type="2"/>
                <div style={{height: '100%'}}>
                    { collectionList.length > 0 &&
                        <div className="collectionList">
                            <p>2222222222222222</p>
                        </div>
                    }
                    {collectionList.length === 0 &&
                        <div className="collectionList">
                            <p>11111111111111</p>
                        </div>
                    }

                    <PanelHeader>
                        { !collectionLoading &&
                            <Button
                                type="default" size="small"
                                onClick={()=>{
                                    this.setState({page: this.state.page+1});
                                }}
                            >点击加载更多订单</Button>
                        }
                        { collectionLoading &&
                            <LoadMore loading>Loading</LoadMore>
                        }
                    </PanelHeader>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        collectionList: state.publicReducer.collectionList,
        collectionLoading: state.publicReducer.collectionLoading
    }
}

export default connect(
    mapStateToProps, { fetchCollect }
)(MyCollection)
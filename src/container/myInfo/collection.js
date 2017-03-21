/**
 * Created by Administrator on 2017/03/20 0020.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router'

import HeaderBar from '../../components/headerNav/headBar'
import {
    Button, PanelHeader,LoadMore, Toast
} from 'react-weui'

import {fetchCollect} from '../../actions/publicAction'

import './index.css'

class MyCollection extends Component{

    constructor(props){
        super(props);
        this.state ={
            page: 1,
            tabArray: ['臻品', '课程'],
            index: 0
        }
    }

    componentDidMount (){
        const {fetchCollect} = this.props;
        fetchCollect({
            type: 4,
            type2: 1
        })
    }

    handleChangeTab(index){
        const {fetchCollect} = this.props;
        this.setState({index: index});
        fetchCollect({
            type: 4,
            type2: index===0 ? 1 : 29
        })
    }

    render(){
        const {fetchCollect, collectionList} = this.props;
        return(
            <div id="collect" className="panel panel-default">
                <HeaderBar content="我的收藏"  type="2"/>
                <div className="tab">
                    <div>
                        {
                            this.state.tabArray.map((tab,index)=>{
                                return(
                                    <a key={index}
                                       className={index === this.state.index ? 'active' : ''}
                                       onClick={this.handleChangeTab.bind(this, index)}
                                    >
                                        {tab}
                                    </a>
                                )
                            })
                        }
                    </div>
                </div>
                <div style={{height: '100%'}}>
                    { collectionList.length === 0 &&
                        <div className="none">
                            <i />
                            <h3>您还没有订单</h3>
                            <a href={this.state.index===0 ? '#/activity' : '#/course' }
                               className="turnPage">再去看看吧&gt;&gt;</a>
                        </div>
                    }
                    {collectionList.length > 0 &&
                        <div className="collectionList">
                            {
                                collectionList.map((collect, index)=>{
                                    return(
                                        <div className="collectItem" key={index}
                                             onClick={()=>{
                                                hashHistory.push({
                                                    pathname: `/${index===0 ? 'activity' : 'course' }/${collect.itemId}` ,
                                                    query: {
                                                        itemType: index===0 ? 1 : 29 ,
                                                        itemId: collect.itemId
                                                    }
                                               })
                                             }}
                                        >
                                            <img src={collect.thumbnail} role="presentation"/>
                                            <div>
                                                <p>{collect.title}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }

                    {/* <PanelHeader>
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
                    </PanelHeader>*/}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        collectionList: state.publicReducer.collectionList
    }
}

export default connect(
    mapStateToProps, { fetchCollect }
)(MyCollection)
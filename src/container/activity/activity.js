/**
 * Created by Administrator on 2017/01/05 0005.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import ActivityItem from '../../components/activity/activityItem';

//import Using ES6 syntax
import {InfiniteLoader,LoadMore} from 'react-weui';

import './index.css';

import { getActList } from '../../actions/activityAction'

class Activity extends Component{
    componentDidMount() {
        const { getActList} = this.props;
        getActList(1,true);
    }

    render(){
        const { getActList ,activityList ,isListNull ,startPage } = this.props;
        return(
            <div>
                { activityList.length === 0 &&
                    <div className="first">
                        <LoadMore loading>Loading</LoadMore>
                    </div>
                }
                <div className="itemBox">
                    <InfiniteLoader
                        onLoadMore={ (resolve, finish) => {
                            getActList(startPage+1 ,false);
                            if(isListNull){
                                console.log(111111111)
                                setTimeout( ()=> {
                                    console.log('list is null')
                                    finish()
                                }, 2000)
                            }else{
                                setTimeout( ()=> {
                                    resolve()
                                }, 500)
                            }
                    }}
                    >
                        <div className="list">
                            {
                                activityList.map( (activity,index) => {
                                    return(
                                        <ActivityItem
                                            key={index}
                                            activity={activity}
                                        />
                                    )
                                })
                            }
                        </div>
                    </InfiniteLoader>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        activityList: state.activityReducer.activity.list,
        startPage: state.activityReducer.activity.startPage,
        isListNull: state.activityReducer.activity.isListNull
    }
}

export default connect(
    mapStateToProps,{getActList}
)(Activity)
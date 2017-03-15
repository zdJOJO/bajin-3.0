/**
 * Created by Administrator on 2017/02/13 0013.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import CourseItem from './item';
//import Using ES6 syntax
import {LoadMore ,InfiniteLoader} from 'react-weui';

import {fetchInfo} from '../../actions/courseAction'


class Select extends Component{
    componentDidMount (){
        const {fetchInfo} = this.props;
        fetchInfo(0,1)
    }

    render(){
        const {selectList ,fetchInfo ,page ,selectListIsNull} = this.props;
        return(
            <div id="course">
                { selectList.length === 0 &&
                    <div className="first">
                        <LoadMore loading>Loading</LoadMore>
                    </div>
                }
                <div id="select" className="subContentPanel">
                    <InfiniteLoader
                        onLoadMore={ (resolve, finish) => {
                            fetchInfo(0, page);
                            if(selectListIsNull){
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
                        <div>
                            {
                                selectList.map((course,index)=>{
                                    return(
                                        <CourseItem
                                            key={index}
                                            course={course}
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
    return{
        selectList: state.courseReducer.select.list,
        page:　state.courseReducer.select.page,
        selectListIsNull: state.courseReducer.select.selectListIsNull
    }
}

export default connect(
    mapStateToProps,{fetchInfo}
)(Select);
/**
 * Created by Administrator on 2017/02/13 0013.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import CourseItem from './item';
//import Using ES6 syntax
import {LoadMore} from 'react-weui';

import {fetchInfo} from '../../actions/courseAction'


class Select extends Component{
    componentWillMount(){
        const {fetchInfo} = this.props;
        fetchInfo(0,1)
    }

    render(){
        const {selectList} = this.props;
        return(
            <div>
                { selectList.length === 0 &&
                    <div className="first">
                        <LoadMore loading>Loading</LoadMore>
                    </div>
                }
                <div id="select" className="subContentPanel">
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
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        selectList: state.courseReducer.select.list
    }
}

export default connect(
    mapStateToProps,{fetchInfo}
)(Select);
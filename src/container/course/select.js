/**
 * Created by Administrator on 2017/02/13 0013.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import CourseItem from './item';
//import Using ES6 syntax
import {
    MediaBox,
    MediaBoxHeader,
    MediaBoxBody,
    MediaBoxTitle,
    MediaBoxDescription,
    MediaBoxInfoMeta,
    PanelHeader
} from 'react-weui';

import {fetchInfo} from '../../actions/courseAction'


class Select extends Component{
    componentWillMount(){
        const {fetchInfo ,selectList} = this.props;
        fetchInfo(0,1)
    }

    render(){
        const {fetchInfo ,selectList} = this.props;

        return(
            <div>
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
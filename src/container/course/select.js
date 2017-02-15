/**
 * Created by Administrator on 2017/02/13 0013.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import { hashHistory } from 'react-router';

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

import {getCourseList} from '../../actions/courseAction'

import test from '../../img/test.jpg'
const appMsgIcon = <img src={test} role="presentation" />

class Select extends Component{
    componentWillMount(){
        const {getCourseList} = this.props;
        getCourseList(1,1)
    }

    handleClick(selectId){
        console.log(1111111)
        hashHistory.push({
            pathname: `/course/select/${selectId}`,
            query: {itemType: 1,itemId: selectId}
        })
    }

    render(){
        const {getCourseList ,selectList} = this.props;
       
        return(
            <div>
                <div id="select" className="subContentPanel">
                    <PanelHeader>实修</PanelHeader>
                    {
                        selectList.map((course,index)=>{
                            return(
                                <MediaBox className="first" type="appmsg" href="javascript:void(0);"
                                          key={index}
                                          onClick={this.handleClick.bind(this,course.id)}
                                >
                                    <MediaBoxHeader>{appMsgIcon}</MediaBoxHeader>
                                    <MediaBoxBody>
                                        <MediaBoxTitle>{course.title}</MediaBoxTitle>
                                        <MediaBoxDescription>{course.subtitle}</MediaBoxDescription>
                                        <MediaBoxDescription>
                                            已经更新9期|19人订阅
                                            <MediaBoxInfoMeta>￥{course.price}</MediaBoxInfoMeta>
                                        </MediaBoxDescription>
                                    </MediaBoxBody>
                                </MediaBox>
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
    mapStateToProps,{getCourseList}
)(Select);
/**
 * Created by Administrator on 2017/02/16 0016.
 */
import React,{Component} from 'react';
import { hashHistory } from 'react-router';

//import Using ES6 syntax
import {
    MediaBox,
    MediaBoxHeader,
    MediaBoxBody,
    MediaBoxTitle,
    MediaBoxDescription,
    MediaBoxInfoMeta
} from 'react-weui';

export default class CourseItem extends Component{

    //_typeStr  判断是否为 24堂课
    handleClick(selectId,_typeStr){
        console.log(selectId)
        hashHistory.push({
            pathname: `/course/${selectId}`,
            query: {itemId: selectId}
        })
    }

    render(){
        return(
            <MediaBox
                type="appmsg"
                href="javascript:void(0);"
                onClick={this.handleClick.bind(this,this.props.course.id,this.props.course.typeStr)}
            >
                <MediaBoxHeader>
                    <img src={this.props.course.minPic} role="presentation" />
                </MediaBoxHeader>
                <MediaBoxBody>
                    <MediaBoxTitle>{this.props.course.title}</MediaBoxTitle>
                    <MediaBoxDescription> 已经更新9期|19人订阅  </MediaBoxDescription>
                    <MediaBoxDescription>
                        { typeStr(this.props.course.type) }
                        <MediaBoxInfoMeta>￥{this.props.course.price}</MediaBoxInfoMeta>
                    </MediaBoxDescription>
                </MediaBoxBody>
            </MediaBox>
        )
    }
}

const typeStr = type =>{
    if(type===1){
        return '时修'
    }else if(type===2){
        return '视频'
    }else {
        return '音频'
    }
}

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

    handleClick(selectId){
        console.log(selectId)
        hashHistory.push({
            pathname: `/course/select/${selectId}`,
            query: {itemId: selectId}
        })
    }

    render(){
        return(
            <MediaBox
                className="first"
                type="appmsg"
                href="javascript:void(0);"
                onClick={this.handleClick.bind(this,this.props.course.id)}
            >
                <MediaBoxHeader>
                    <img src={this.props.course.minPic} role="presentation" />
                </MediaBoxHeader>
                <MediaBoxBody>
                    <MediaBoxTitle>{this.props.course.title}</MediaBoxTitle>
                    <MediaBoxDescription> 已经更新9期|19人订阅  </MediaBoxDescription>
                    <MediaBoxDescription>
                        {typeStr(this.props.course.type)}
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

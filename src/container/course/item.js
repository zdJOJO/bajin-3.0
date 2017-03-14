/**
 * Created by Administrator on 2017/02/16 0016.
 */
import React,{Component} from 'react';
import { hashHistory } from 'react-router';
import {connect} from 'react-redux';

import {disPatchFn} from '../../actions/courseAction'
import { timestampFormat } from '../../public'

//import Using ES6 syntax
import {
    MediaBox,
    MediaBoxHeader,
    MediaBoxBody,
    MediaBoxTitle,
    MediaBoxDescription,
    MediaBoxInfoMeta,
    Popup, Toast
} from 'react-weui';


const typeStr = type =>{
    if(type===1){
        return '实修'
    }else if(type===2){
        return '视频'
    }else {
        return '音频'
    }
};


/*
*  this.props.router - 我的课程 中的引用
*  this.props.isShow - 24堂课 列表勾选
*  this.props.url - 视频 、音频
* */

class CourseItem extends Component{

    constructor(props){
        super(props);
        this.state = {
            fullpage_show: false,
            showLoading: false,
            realUrl: ''
        }
    }

    handleClick(selectId ,isShow, url){
        const { disPatchFn } = this.props;
        console.log(selectId);
        if(!isShow && !url){
            hashHistory.push({
                pathname: `/course/${selectId}`,
                query: {itemType: 29 ,itemId: selectId}
            })
        }
        
        if(url){
            disPatchFn({
                type: 4,
                key: url,
                videoDom: this.refs.video
            });
            this.setState({
                fullpage_show: true
            });
        }
    }

    chooseItem(course ,event){
        const {disPatchFn ,chooseList} = this.props;
        event.stopPropagation();  //冒泡阻止
        console.log('choose item')
        disPatchFn({
            type: 2,
            course: course,
            chooseList
        })
    }

    render(){
        const { realUrl } = this.props ;
        return(
            <MediaBox
                className={this.props.router?'router':''}
                type="appmsg"
                href="javascript:void(0);"
                onClick={this.handleClick.bind(this,this.props.course.id, this.props.course.isShow,  this.props.url)}
            >

                <Popup
                    show={this.state.fullpage_show}
                    onClick={(event)=>{
                        event.stopPropagation();
                        this.refs.video.pause();
                        this.setState({
                            fullpage_show: false
                        })
                    }}
                >
                    <Toast icon="loading" show={this.state.showLoading}>Loading...</Toast>
                    <div style={{height: '100vh', overflow: 'scroll'}}>
                        <video controls loop
                               onClick={(event)=>{
                                    event.stopPropagation();
                                 }}
                               src={realUrl}
                               type="video/mp4"
                               ref="video"
                        />
                    </div>
                </Popup>


                { !this.props.course.isShow &&
                    <MediaBoxHeader>
                        <img src={this.props.course.minPic} role="presentation" />
                    </MediaBoxHeader>
                }
                { this.props.course.isShow &&
                    <MediaBoxHeader>
                        <img src={this.props.course.minPic} role="presentation" />
                        <label
                            className={ this.props.course.isChoose ? "choose" : ''}
                            onClick={this.chooseItem.bind(this ,this.props.course)}
                            htmlFor={this.props.course.id}
                        >
                            <input type="checkbox" name={this.props.course.id}/>
                        </label>
                    </MediaBoxHeader>
                }
                <MediaBoxBody className={this.props.router?'router':''}>
                    <MediaBoxTitle>{this.props.course.title}</MediaBoxTitle>
                    <MediaBoxDescription>
                        {this.props.router ? '' : '已经更新9期|19人订阅 '}
                    </MediaBoxDescription>
                    { !this.props.router &&
                        <MediaBoxDescription>
                            { typeStr(this.props.course.type) }
                            <MediaBoxInfoMeta>
                                {'￥'+this.props.course.price }
                            </MediaBoxInfoMeta>
                        </MediaBoxDescription>
                    }
                    { this.props.router==='one' &&
                        <MediaBoxDescription className='router'>
                            {this.props.course.subtitle}{timestampFormat(this.props.course.startTime)}
                        </MediaBoxDescription>
                    }
                    { this.props.router==='two' &&
                        <MediaBoxDescription className='router two'>
                            <i />
                        </MediaBoxDescription>
                    }
                    { this.props.router==='three' &&
                        <MediaBoxDescription className='router three'>
                            <i />
                        </MediaBoxDescription>
                    }
                </MediaBoxBody>
            </MediaBox>
        )
    }
}

const mapStateToProps = state=>{
    return{
        ...state,
        chooseList: state.courseReducer.two4Class.chooseList,

        realUrl: state.courseReducer.realUrl
    }
}

export default connect(
    mapStateToProps, {disPatchFn}
)(CourseItem);



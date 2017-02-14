/**
 * Created by Administrator on 2017/02/13 0013.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

//import Using ES6 syntax
import {
    MediaBox,
    MediaBoxHeader,
    MediaBoxBody,
    MediaBoxTitle,
    MediaBoxDescription,
    MediaBoxInfoMeta
} from 'react-weui';

import {getCourseList} from '../../actions/courseAction'

import search from '../../img/search.svg'
const appMsgIcon = <img src={search} />

class Select extends Component{
    componentWillMount(){
        const {getCourseList} = this.props;
        getCourseList(1,0)
    }

    render(){
        const {getCourseList} = this.props;
        return(
            <div id="select" className="subContentPanel">
                <MediaBox type="appmsg" href="javascript:void(0);">
                    <MediaBoxHeader>{appMsgIcon}</MediaBoxHeader>
                    <MediaBoxBody>
                        <MediaBoxTitle>朗诗雅静|2017，触动你的心弦</MediaBoxTitle>
                        <MediaBoxDescription>支付定金转用</MediaBoxDescription>
                        <MediaBoxDescription>
                            已经更新9期|19人订阅
                            <MediaBoxInfoMeta>￥180000</MediaBoxInfoMeta>
                        </MediaBoxDescription>
                    </MediaBoxBody>
                </MediaBox>
                <MediaBox type="appmsg" href="javascript:void(0);">
                    <MediaBoxHeader>{appMsgIcon}</MediaBoxHeader>
                    <MediaBoxBody>
                        <MediaBoxTitle>朗诗雅静|2017，触动你的心弦</MediaBoxTitle>
                        <MediaBoxDescription>复杂的三个月社会klan啊</MediaBoxDescription>
                        <MediaBoxDescription>
                            已经更新9期|19人订阅
                            <MediaBoxInfoMeta>￥199</MediaBoxInfoMeta>
                        </MediaBoxDescription>
                    </MediaBoxBody>
                </MediaBox>
                <MediaBox type="appmsg" href="javascript:void(0);">
                    <MediaBoxHeader>{appMsgIcon}</MediaBoxHeader>
                    <MediaBoxBody>
                        <MediaBoxTitle>朗诗雅静|2017，触动你的心弦</MediaBoxTitle>
                        <MediaBoxDescription>减肥啦是加拉垃圾了</MediaBoxDescription>
                        <MediaBoxDescription>
                            已经更新9期|19人订阅
                            <MediaBoxInfoMeta>￥199</MediaBoxInfoMeta>
                        </MediaBoxDescription>
                    </MediaBoxBody>
                </MediaBox>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
    }
}

export default connect(
    mapStateToProps,{getCourseList}
)(Select);
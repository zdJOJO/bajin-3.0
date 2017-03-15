/**
 * Created by Administrator on 2017/02/23 0023.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import HeaderBar from '../../components/headerNav/headBar'
import HeaderNav from '../../components/headerNav/index'
import CourseItem from '../../container/course/item'
import {
    Popup, Toast
} from 'react-weui';

import { dispatchFetchData } from '../../actions/userAction'
import {disPatchFn} from '../../actions/courseAction'

import '../../container/course/index.css'
import './index.css'

const menuList = [
    {
        menuName: '实修',
        path: ''
    },
    {
        menuName: '视频',
        path: ''
    },
    {
        menuName: '音频',
        path: ''
    }
];

class MyCourse extends Component{

    constructor(props){
        super(props);
        this.state = {
            fullpage_show: false
        }
    }

    componentDidMount (){
        const { dispatchFetchData } = this.props;
        dispatchFetchData({type: 6});
    }

    handleClick(url){
        const {disPatchFn} = this.props;
        disPatchFn({
            type: 4,
            key: url,
            videoDom: this.refs.video
        });
        this.setState({
            fullpage_show: true
        });
    }


    render(){
        const {currentIndex, courseList, mediaList, voiceList, realUrl} = this.props;
        const style = {
            position: 'fixed',
            width: '100%',
            height: '4.6rem',
            zIndex: '1000',
            top: '0.7rem'
        };
        return(
            <div id="myCourse" className="panel panel-default">
                <div className="headerBox" style={{height: '0.7rem'}}>
                    <HeaderBar content="我的课程" type="2"/>
                    <HeaderNav menuList={menuList} isRouter="0" />
                </div>

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

                <div id="select" style={{...style}} >
                    { currentIndex === 0 &&
                        <section className="one">
                            {
                                courseList.map((course,index)=>{
                                    return(
                                        <CourseItem
                                            key={index}
                                            course={course}
                                            router="one"
                                        />
                                    )
                                })
                            }
                        </section>
                    }
                    { currentIndex === 1 &&
                        <section className="two">
                            {
                                mediaList.map((course,index)=>{
                                    return(
                                        <div  key={index}  style={{zIndex: '10'}}
                                              onClick={this.handleClick.bind(this, course.url)}>
                                            <CourseItem
                                                course={course}
                                                router="two"
                                                url={course.url}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </section>
                    }
                    { currentIndex === 2 &&
                        <section className="three">
                            {
                                voiceList.map((course,index)=>{
                                    return(
                                        <CourseItem
                                            key={index}
                                            course={course}
                                            router="three"
                                            url={course.url}
                                        />
                                    )
                                })
                            }
                        </section>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentIndex: state.menuReducer.courseNav.index,

        voiceList: state.userReducer.myCourse.voice,
        mediaList: state.userReducer.myCourse.media,
        courseList: state.userReducer.myCourse.course,

        realUrl: state.courseReducer.realUrl
    }
}

export default connect(
    mapStateToProps,{ dispatchFetchData, disPatchFn}
)(MyCourse);
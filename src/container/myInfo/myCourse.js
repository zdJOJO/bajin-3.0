/**
 * Created by Administrator on 2017/02/23 0023.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import HeaderBar from '../../components/headerNav/headBar'
import HeaderNav from '../../components/headerNav/index'
import CourseItem from '../../container/course/item'

import { dispatchFetchData } from '../../actions/userAction'

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

    componentWillMount(){
        const { dispatchFetchData } = this.props;
        dispatchFetchData({type: 6});
    }


    render(){
        const {currentIndex, courseList,mediaList,voiceList} = this.props;
        return(
            <div id="myCourse" className="panel panel-default">
                <div className="headerBox" style={{height: '0.7rem'}}>
                    <HeaderBar content="我的课程" type="2"/>
                    <HeaderNav menuList={menuList} isRouter="0" />
                </div>
                <div id="select">
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
                                        <CourseItem
                                            key={index}
                                            course={course}
                                            router="two"
                                            url={course.url}
                                        />
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
        courseList: state.userReducer.myCourse.course
    }
}

export default connect(
    mapStateToProps,{ dispatchFetchData }
)(MyCourse);
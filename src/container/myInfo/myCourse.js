/**
 * Created by Administrator on 2017/02/23 0023.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import HeaderBar from '../../components/headerNav/headBar'
import HeaderNav from '../../components/headerNav/index'
import CourseItem from '../../container/course/item'

import '../../container/course/index.css'
import './index.css'
import {selectList} from '../../public/falseData'

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
    render(){
        const {currentIndex} = this.props;
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
                            selectList.map((course,index)=>{
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
                            selectList.map((course,index)=>{
                                return(
                                    <CourseItem
                                        key={index}
                                        course={course}
                                        router="two"
                                    />
                                )
                            })
                        }
                    </section>
                    }
                    { currentIndex === 2 &&
                    <section className="three">
                        {
                            selectList.map((course,index)=>{
                                return(
                                    <CourseItem
                                        key={index}
                                        course={course}
                                        router="three"
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
        currentIndex: state.menuReducer.courseNav.index
    }
}

export default connect(
    mapStateToProps,{}
)(MyCourse);
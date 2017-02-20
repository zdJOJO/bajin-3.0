/**
 * Created by Administrator on 2017/02/15 0015.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import CourseItem from './item';
import CommentIn from '../../components/comment/commentIn';
//import Using ES6 syntax
import {
    PanelHeader,
    Button,
    ActionSheet
} from 'react-weui';

import {fetchInfo ,showMoreCourseDetail ,showPayPopup} from '../../actions/courseAction'
import {wx_jssdk_api} from '../../public/wx/wxConfig'


import more from '../../img/more.svg';
import backTop from '../../img/detail/backTop.png';
import kefu from '../../img/detail/kefu.png';
import vedio from '../../img/detail/vedio.png';
import down from '../../img/detail/down.png';


// 评论假数据
const commentObj = {
    itemType: 1,
    itemId: 2,
    rowCount: 10,
    commentList: [
        {
            commentContent: '发觉了沙发司法考试的喝开水大火可视电话客户客户看肯定是k',
            createTime: 1483686098,
            user: {
                userName: "哈哈哈哈",
                headPic: down
            }
        },
        {
            commentContent: 'hkgh;fkh fkhg;hkf地方老师讲过了数据管理是第几个了时间管理设计灵感加上洛杉矶了',
            createTime: 1484883546,
            user: {
                userName: "刘德华",
                headPic: ''
            }
        }
    ]
}

// 相关推荐 假数据
const selectList  = [
    {
        id: 0,
        title: '2013舒服啦捡垃圾了啊',
        price: 2000,
        minPic: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=747081213,1247933411&fm=23&gp=0.jpg',
        type: 1
    },
    {
        id: 1,
        title: '阿达按时大锅饭大概规范化个回个话愉快就看有空看就看就看',
        price: 500,
        minPic: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=747081213,1247933411&fm=23&gp=0.jpg',
        type: 2
    },
    {
        id: 2,
        title: '上课了放家里圣诞节萨达的',
        price: 8000,
        minPic: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=747081213,1247933411&fm=23&gp=0.jpg',
        type: 3
    }
]


class SelectDetail extends Component{

    constructor(props){
        super(props)
        const { showPayPopup} = this.props;
        this.state = {
            menus: [{
                label: '银行卡支付',
                onClick: ()=> { console.log('银行卡支付')  }
            }, {
                label: '微信支付',
                onClick: ()=> { console.log('微信支付')  }
            }],
            actions: [
                {
                    label: '取消',
                    onClick: ()=>{showPayPopup(false)}
                }
            ]
        }
    }
    
    componentWillMount(){
        const { fetchInfo} = this.props;
        fetchInfo(-1 ,-1 ,this.props.location.query.itemId);
        fetchInfo(-2,-1)
    }

    handleClick(clickType){
    // clickType: 1-查看更多视频
        if(clickType===1){
            console.log('查看更多视频')
        }else {
            //todo
        }
    }

    handleScroll(e){
        const { fetchInfo} = this.props;
        let scrollTop  = this.refs.bodyBox.scrollTop;  //滚动条滚动高
        if(scrollTop/window.innerHeight >=0.85){
            fetchInfo(-3,-1,0)
        }else {
            fetchInfo(-3,-1,1)
        }
        console.log(this.refs.bodyBox.scrollHeight)
        console.log(scrollTop)
    }

    backTop(speed){
        console.log('speed is;' + speed)
        console.log( this.refs.bodyBox.scrollTop)
        let scrollBackTop =()=>{
            if(this.refs.bodyBox.scrollTop <= 0){
                console.log('stop ')
                clearInterval(timer);
            }else {
                this.refs.bodyBox.scrollTop = this.refs.bodyBox.scrollTop-20
            }
        }
        let timer = setInterval(scrollBackTop,speed);
    }

    render(){
        const { courseDetail ,
            isShowMoreDetail ,
            showMoreCourseDetail ,
            isShowBackTop ,
            times,
            showPayPopup,
            isShowPayPopup
        } = this.props;
        return(
            <div style={{width:'100%',height:'100%'}} >
                <img role="presentation"
                     id="backTop"
                     className={ (isShowBackTop===1&&times>0) ? "down" : (isShowBackTop===0 ? 'up' : '') }
                     src={backTop}
                     onClick={this.backTop.bind(this,10)}
                />
                <div id="selectDetail" onScroll={this.handleScroll.bind(this)} ref="bodyBox">
                    <div className="head">
                        <img src={courseDetail.maxPic} role="presentation"/>
                        <h3>{courseDetail.title}</h3>
                        <div>
                            <PanelHeader>0人关注/0人订阅</PanelHeader>
                            <PanelHeader>￥{courseDetail.price}</PanelHeader>
                        </div>
                    </div>
                    <div className="body">
                        <PanelHeader>
                            <span className="vedio"><img role="presentation" src={vedio}/><i>相关视频</i></span>
                            <span className="more" onClick={this.handleClick.bind(this,1)}>
                                <i>共0条视频</i>
                                <img role="presentation" src={more}/>
                            </span>
                        </PanelHeader>
                        <h3>课程亮点</h3>
                        <div className={!isShowMoreDetail ? 'detailInfo' : 'detailInfo active'}>
                            { !isShowMoreDetail&&
                                <div className="show" onClick={()=>{showMoreCourseDetail(true)}}>
                                    <h4>展开课程亮点↓</h4>
                                </div>
                            }
                        </div>
                    </div>

                    <CommentIn commentObj={commentObj} />
                    
                    <div className="relate">
                        <PanelHeader>
                            相关推荐
                        </PanelHeader>

                        <div id="select" className="subContentPanel in">
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
                </div>
                <div className="do">
                    <img src={kefu} role="presentation" />
                    <Button id="flow" type="default" plain>关注</Button>
                    <Button id="buy" 
                            onClick={()=>{showPayPopup(true)}}
                    >购买</Button>
                </div>

                <ActionSheet
                    menus={this.state.menus}
                    actions={this.state.actions}
                    show={isShowPayPopup}
                    type="ios"
                    onRequestClose={()=>{showPayPopup(false)}}
                />
            </div>
        )
    }
}




function mapStateToProps(state) {
    return{
        courseDetail: state.courseReducer.courseDetail,
        isShowMoreDetail: state.courseReducer.isShowMoreDetail,
        isShowBackTop: state.courseReducer.isShowBackTop,
        times: state.courseReducer.times,
        isShowPayPopup: state.courseReducer.isShowPayPopup
    }
}

export default connect(
    mapStateToProps,{ fetchInfo ,showMoreCourseDetail ,showPayPopup }
)(SelectDetail);
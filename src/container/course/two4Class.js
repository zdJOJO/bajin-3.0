/**
 * Created by Administrator on 2017/02/13 0013.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import CourseItem from './item';
//import Using ES6 syntax
import {LoadMore,Button,ActionSheet,Dialog} from 'react-weui';

import {fetchInfo ,disPatchFn} from '../../actions/courseAction'
import {showPayPopup ,showDialog} from '../../actions/showPromptAction'
import {disPatchFetchOrder} from '../../actions/payAction'

import buy from '../../img/buy.png'
import close from '../../img/close.png'

class Two4Class extends Component{
    constructor(props){
        super(props)
        const {showPayPopup ,showDialog ,} = this.props;
        this.state = {
            menus: [{
                label: '银行卡支付',
                onClick: this.handleSubmitOrderInfo.bind(this)
            }, {
                label: '微信支付',
                onClick: ()=> { console.log('微信支付')  }
            }],
            actions: [
                {
                    label: '取消',
                    onClick: ()=>{showPayPopup(false)}
                }
            ],
            style1: {
                buttons: [
                    {
                        label: '知道了',
                        onClick: ()=>{showDialog(false)}
                    }
                ]
            }
        }
    }

    handleSubmitOrderInfo(){
        // isFontPrice:  0表示不是定金
        const {disPatchFetchOrder ,totalPrice ,totalNum ,chooseList } = this.props;
        let scmvOrderMapModels =  new Array(chooseList.length);
        for(let i=0;i<chooseList.length;i++){
            scmvOrderMapModels[i] = {
                scmvId: chooseList[i].id,
                title: chooseList[i].title,
                price: chooseList[i].price,
                isFontPrice: 0
            } ;
        }
        disPatchFetchOrder({
            type: 'scmvOrder',
            sum: totalNum,
            price: totalPrice,
            scmvOrderMapModels: scmvOrderMapModels,
            dom: this.refs.pay
        })
    }

    componentWillMount(){
        const {fetchInfo ,disPatchFn ,two4ClassList, totalPrice ,totalNum,} = this.props;
        fetchInfo(1,1)
        disPatchFn({
            type: 1,
            isPop: false,
            list: two4ClassList,
            totalNum: totalNum,
            totalPrice: totalPrice
        })
        disPatchFn({type: 3})
    }

    handleClick(totalNum){
        const {showPayPopup ,showDialog} = this.props;
        if(totalNum===0){
            showDialog(true)
            return
        }
        showPayPopup(true)
    }

    render(){
        const {
            two4ClassList ,disPatchFn ,isLeftBarShow ,totalPrice ,totalNum ,
            isShowPayPopup ,showPayPopup ,showIOS1,
            ciphertext
        } = this.props;
        return(
            <div id="course">
                { two4ClassList.length === 0 &&
                    <div className="first">
                        <LoadMore loading>Loading</LoadMore>
                    </div>
                }
                <div id="select" className="subContentPanel">
                    {
                        two4ClassList.map((course,index)=>{
                            return(
                                <CourseItem
                                    className="2fourItem"
                                    key={index}
                                    course={course}
                                />
                            )
                        })
                    }
                </div>
                <div className="buy" onClick={()=>{
                    disPatchFn({
                        type: 1,
                        isPop: !isLeftBarShow,
                        list: two4ClassList
                    })
                }}>
                    <img role="presentation" src={ isLeftBarShow ? close : buy  } />
                </div>
                { isLeftBarShow &&
                    <div className={ isLeftBarShow ? 'leftBuyBar toLeftShow' : 'leftBuyBar'}>
                        <div className="box">
                            <div className="number">已经选择<span style={{color: '#c49327'}}>{totalNum}</span>件</div>
                            <div className="price">优惠价格:<span style={{color: '#c49327'}}>￥{totalPrice}</span></div>
                        </div>
                        <Button type="default" size="small"
                                onClick={this.handleClick.bind(this ,totalNum)}
                        >确认</Button>
                    </div>
                }

                <ActionSheet
                    menus={this.state.menus}
                    actions={this.state.actions}
                    show={isShowPayPopup}
                    type="ios"
                    onRequestClose={()=>{showPayPopup(false)}}
                />
                <Dialog type="ios"
                        title={this.state.style1.title}
                        buttons={this.state.style1.buttons}
                        show={showIOS1}
                >
                    请选择您感兴趣的课程
                </Dialog>

                <form
                    method="post"
                    action="http://web.zj.icbc.com.cn/mobile/Pay.do?scene=pay"
                    ref="pay"
                >
                    <input type="hidden" id="merSignMsg" name="merSignMsg" value={ciphertext}/>
                    <input type="hidden" id="companyCis" name="companyCis" value="bjzx" />
                </form>

                <form id="addFormButton" method="post" action="http://web.zj.icbc.com.cn/mobile/Bjzx.do?scene=bjzx">
                    <input type="hidden" id="addCard" name="addCard" value='bjzx'/>
                </form>
            </div>
        )
    }
}


const mapStateToProps = state=>{
    return{
        two4ClassList: state.courseReducer.two4Class.list,
        isLeftBarShow: state.courseReducer.two4Class.isLeftBarShow,

        chooseList: state.courseReducer.two4Class.chooseList,
        totalNum: state.courseReducer.two4Class.totalNum,
        totalPrice: state.courseReducer.two4Class.totalPrice,

        isShowPayPopup: state.courseReducer.isShowPayPopup,
        showIOS1: state.courseReducer.showIOS1,

        ciphertext: state.courseReducer.ciphertext
    }
}

export default connect(
    mapStateToProps,
    {
        fetchInfo ,disPatchFn ,
        showPayPopup ,showDialog,
        disPatchFetchOrder
    }
)(Two4Class);
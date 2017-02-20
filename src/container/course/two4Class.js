/**
 * Created by Administrator on 2017/02/13 0013.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import CourseItem from './item';
//import Using ES6 syntax
import {LoadMore,Button} from 'react-weui';

import {fetchInfo ,pupLeftBuyBar} from '../../actions/courseAction'

import buy from '../../img/buy.png'
import close from '../../img/close.png'

class Two4Class extends Component{
    componentWillMount(){
        const {fetchInfo ,pupLeftBuyBar} = this.props;
        fetchInfo(1,1)
        pupLeftBuyBar(false)
    }

    handleClick(){

    }

    render(){
        const {two4ClassList ,pupLeftBuyBar ,isLeftBarShow} = this.props;
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
                                    typeStr="24"
                                />
                            )
                        })
                    }
                </div>
                <div className="buy" onClick={()=>{pupLeftBuyBar(!isLeftBarShow)}}>
                    <img role="presentation" src={ isLeftBarShow ? close : buy  } />
                </div>
                { isLeftBarShow &&
                    <div className={ isLeftBarShow ? 'leftBuyBar toLeftShow' : 'leftBuyBar'}>
                        <div className="box">
                            <div className="number">已经选择<span>2</span>件</div>
                            <div className="price">优惠价格:<span>￥5000</span></div>
                        </div>
                        <Button type="default" size="small">确认</Button>
                    </div>
                }
            </div>
        )
    }
}


const mapStateToProps = state=>{
    return{
        two4ClassList: state.courseReducer.two4Class.list,
        isLeftBarShow: state.courseReducer.two4Class.isLeftBarShow
    }
}

export default connect(
    mapStateToProps, {fetchInfo ,pupLeftBuyBar}
)(Two4Class);
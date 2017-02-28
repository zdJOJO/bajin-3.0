/**
 * Created by Administrator on 2017/02/27 0027.
 */

import React,{Component} from 'react';
import {connect} from 'react-redux';
import ReactSwipe from 'react-swipe';

import {changeSwipeIndex} from '../../actions/publicAction'
import {fetchData} from '../../actions/homeAction'

import './index.css'



/*
*
* pagination: 是否显示分页  true-显示
*
*/
class Myswiper extends Component{
    constructor(props){
        super(props);
        const {changeSwipeIndex} = this.props;
        this.state = {
            swipeOptions:{
                startSlide: 0,
                speed: 500,
                auto: this.props.pagination==='true' ? 5000 : 0 ,
                continuous: true,
                disableScroll: false,
                stopPropagation: false,
                callback: (index, elem) =>{
                    console.log(index)
                },
                transitionEnd: (index, elem) =>{
                    console.log(index)
                    if(this.props.pagination==='true'){
                        changeSwipeIndex(index)
                    }
                }
            }
        }
    }

    componentDidMount(){
        const {changeSwipeIndex, fetchData} = this.props;
        if(this.props.pagination==='true'){
            changeSwipeIndex(0);
        }
        if(this.props.typeStr==="icbc"){
            fetchData({type: 1});
        }
    }

    render(){
        const {swipeIndex, bannerList } = this.props;
        return(
            <div id="swipe">
                { bannerList.length &&
                    <div className="swipeBox">
                        { this.props.typeStr==="icbc" &&
                            <ReactSwipe ref="reactSwipe"  className="carousel" swipeOptions={this.state.swipeOptions}>
                                {
                                    bannerList.map((item, index) =>{
                                        return(
                                            <div  key={index}
                                                  className="swiper"
                                            >
                                                <img role="presentation" src={item.bannerPic}/>
                                            </div>
                                        )
                                    })
                                }
                            </ReactSwipe>
                        }
                        { this.props.pagination === 'true' &&
                            <div className="paginationBox">
                                {
                                    bannerList.map((item, index) =>{
                                        return(
                                            <span key={index}
                                                  className={swipeIndex === index ? 'pagination active' : 'pagination'}
                                            />
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        swipeIndex: state.publicReducer.swipeIndex,

        bannerList: state.homeReducer.bannerList
    }
}

export default connect(
    mapStateToProps,
    {
        changeSwipeIndex,
        fetchData
    }
)(Myswiper);
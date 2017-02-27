/**
 * Created by Administrator on 2017/02/27 0027.
 */

import React,{Component} from 'react';
import {connect} from 'react-redux';
import ReactSwipe from 'react-swipe';

import {changeSwipeIndex} from '../../actions/publicAction'
import {fetchData} from '../../actions/homeAction'

import './index.css'

class Myswiper extends Component{
    constructor(props){
        super(props)
        const {changeSwipeIndex} = this.props
        this.state = {
            swipeOptions:{
                startSlide: 0,
                speed: 500,
                auto: 5000,
                continuous: true,
                disableScroll: false,
                stopPropagation: false,
                callback: function(index, elem) {
                    console.log(index)
                },
                transitionEnd: function(index, elem) {
                    console.log(index)
                    changeSwipeIndex(index)
                }
            }
        }
    }

    componentDidMount(){
        console.log(this.props.array)
        const {changeSwipeIndex, fetchData} = this.props;
        fetchData({type: 1})
        changeSwipeIndex(0);
    }

    render(){
        const {swipeIndex, bannerList } = this.props;
        return(
            <div id="swipe">
                { bannerList.length > 0 &&
                    <div className="swipeBox">
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
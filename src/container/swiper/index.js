/**
 * Created by Administrator on 2017/02/27 0027.
 */

import React,{Component} from 'react';
import {connect} from 'react-redux';
import ReactSwipe from 'react-swipe';

import {changeSwipeIndex} from '../../actions/publicAction'

import './index.css'

class Myswiper extends Component{

    constructor(props){
        super(props)
        const {changeSwipeIndex} = this.props
        this.state = {
            currentIndex: 0,
            array: this.props.array ,
            swipeOptions:{
                startSlide: 0,
                speed: 500,
                auto: 4000,
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

    componentWillMount(){
        const {changeSwipeIndex} = this.props;
        changeSwipeIndex(0);
    }

    render(){
        const {swipeIndex} = this.props;
        return(
            <div id="swipe">
                <div className="swipeBox">
                    <ReactSwipe ref="reactSwipe"  className="carousel" swipeOptions={this.state.swipeOptions}>
                        {
                            this.state.array.map((array, index) =>{
                                return(
                                    <div  key={index}
                                          className="swiper"
                                    >
                                        {array}
                                    </div>
                                )
                            })
                        }
                    </ReactSwipe>
                    <div className="paginationBox">
                        {
                            this.state.array.map((array, index) =>{
                                return(
                                    <span key={index}
                                          className={swipeIndex === index ? 'pagination active' : 'pagination'}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        swipeIndex: state.publicReducer.swipeIndex
    }
}

export default connect(
    mapStateToProps, {changeSwipeIndex}
)(Myswiper);
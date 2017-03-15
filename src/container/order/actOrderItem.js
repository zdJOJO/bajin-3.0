/**
 * Created by Administrator on 2017/03/15 0015.
 */
import React,{Component} from 'react';

import {timestampFormat} from '../../public'
class ActOrderItem extends Component{
    render(){
        return(
            <div className="actOrderItem">
                <img role="presentation" src={this.props.order.activity.activityPic}/>
                <div className="detail">
                    <h4>{this.props.order.activity.activityTitle}</h4>
                    <span>{this.props.order.activity.activityPrice===0 ? '会员专享' : this.props.order.activity.activityPrice===0 }</span>
                    <p className="time">
                        {timestampFormat(this.props.order.activity.startTime, 1)} - {timestampFormat(this.props.order.activity.endTime, 1)}
                    </p>
                    <p className="address">{this.props.order.activity.activityAddress}</p>
                </div>
            </div>
        )
    }
}

export default ActOrderItem;
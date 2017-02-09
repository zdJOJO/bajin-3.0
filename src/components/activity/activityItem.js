/**
 * Created by Administrator on 2017/01/05 0005.
 */
import React,{Component} from 'react';
import { hashHistory } from 'react-router';

import { timestampFormat } from '../../public/index'

import '../../container/activity/index.css';

export default class ActivityItem extends Component{
    linkTo(){
        hashHistory.push({
            pathname: `/activity/${this.props.activity.activityId}`,
            query: {itemType: 1,itemId: this.props.activity.activityId}
        })
    }

    render(){
        return(
            <div className="infoItem" onClick={this.linkTo.bind(this)}>
                <div className="top">
                    <img role="presentation" src={this.props.activity.activityPic}/>
                    <div className="tit-content">
                        <h3>{this.props.activity.activityTitle}</h3>
                        <p className="time">
                            {/*<span>时间: </span>*/}
                            {timestampFormat(this.props.activity.startTime,true)}-{timestampFormat(this.props.activity.endTime,true)}
                        </p>
                        <p className="deTile">{this.props.activity.activityAddress}</p>
                    </div>
                </div>
                <hr/>
                { (this.props.activity.activityTitle.length<=12 || this.props.activity.activityAddress.length<=15) &&
                    <div className='bottom bottomOne'>
                        <span>价格: </span>
                    <span>
                        {this.props.activity.activityPrice === 0 ? '会员专享' : '￥'+this.props.activity.activityPrice.toFixed(2)}
                    </span>
                    </div>
                }
                { (this.props.activity.activityTitle.length>12 && this.props.activity.activityAddress.length>15) &&
                    <div className='bottom bottomTwo'>
                        <span>价格: </span>
                    <span>
                        {this.props.activity.activityPrice === 0 ? '会员专享' : '￥'+this.props.activity.activityPrice.toFixed(2)}
                    </span>
                    </div>
                }
            </div>
        )
    }
}
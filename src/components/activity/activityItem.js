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
                            {timestampFormat(this.props.activity.startTime,1)}-{timestampFormat(this.props.activity.endTime,1)}
                        </p>
                        {/* <p className="deTile">{this.props.activity.activityAddress}</p>*/}
                        { this.props.activity.activityPrice === 0 &&
                            <div className='price'>
                                <span>￥0.00</span>
                                <span className="vip">会员专享</span>
                            </div>
                        }
                        { this.props.activity.activityPrice !== 0 &&
                            <div className='price'>
                                <span>￥{this.props.activity.activityPrice.toFixed(2)}</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
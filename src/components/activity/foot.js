/**
 * Created by Administrator on 2017/01/10 0010.
 */
import React,{Component} from 'react';

import { Link } from 'react-router'

import '../../container/activity/index.css';

export default class Foot extends Component{
    render(){
        return(
            <footer>
                <p className="time">报名截止时间: {this.props.time}</p>
                {
                    this.props.actStateStr==='报名' ?
                        <button className='active'>
                            <Link to="/">{this.props.actStateStr}</Link>
                        </button> : <button >{this.props.actStateStr}</button>
                }
            </footer>
        )
    }
}
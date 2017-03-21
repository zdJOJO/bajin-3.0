/**
 * Created by Administrator on 2017/02/27 0027.
 */
import React,{Component} from 'react';

import { icbcUrl } from '../../public'
import './index.css'

export default class HomeTitle extends Component {

    handleClick(str){
        console.log(' 跳转到：'+str)
        if(str === '工行服务'){
            window.location.href = icbcUrl;
        }
    }
    render(){
        return(
            <h3 className="title">
                <div><span className="content-text">{this.props.title}</span></div>
                <a className="lookMore"
                   onClick={this.handleClick.bind(this, this.props.title)}
                >
                    查看更多 >
                </a>
            </h3>
        )
    }
}
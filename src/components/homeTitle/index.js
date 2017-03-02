/**
 * Created by Administrator on 2017/02/27 0027.
 */
import React,{Component} from 'react';

import './index.css'

export default class HomeTitle extends Component {

    handleClick(str){
        console.log(' 跳转到：'+str)
    }
    render(){
        return(
            <h3 className="title">
                <div><span className="content-text">{this.props.title}</span></div>
                <span className="lookMore"
                      onClick={this.handleClick.bind(this, this.props.title)}
                >
                    查看更多 >
                </span>
            </h3>
        )
    }
}
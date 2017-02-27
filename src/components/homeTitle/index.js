/**
 * Created by Administrator on 2017/02/27 0027.
 */
import React,{Component} from 'react';

import './index.css'

export  default class HomeTitle extends Component {

    handleClick(typeStr){
        if(typeStr === '工行服务'){
            console.log('去工行服务')
        }
    }
    render(){
        return(
            <h3 className="title">
                <div><span className="content-text">{this.props.title}</span></div>
                <span className="lookMore"
                      onClick={this.handleClick.bind(this, this.props.typeStr)}
                >
                    查看更多 >
                </span>
            </h3>
        )
    }
}
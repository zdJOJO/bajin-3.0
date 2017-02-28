/**
 * Created by Administrator on 2017/02/27 0027.
 */
import React,{Component} from 'react';

import './index.css'

export default class HomeTitle extends Component {

    handleClick(typeStr){
        if(typeStr === 'icbc'){
            console.log('去工行服务')
        }else if(typeStr === 'hot'){
            console.log('去热门')
        }else if(typeStr === 'good'){
            console.log('去臻品')
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
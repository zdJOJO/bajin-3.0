/**
 * Created by Administrator on 2017/02/22 0022.
 */
import React,{Component} from 'react';

import './index.css'

export default class BackTopBtn extends Component{

    backTop(speed ,dom){
        console.log('speed is;' + speed)
        console.log( dom.scrollTop)
        let scrollBackTop =()=>{
            if(dom.scrollTop <= 0){
                console.log('stop ')
                clearInterval(timer);
            }else {
                dom.scrollTop = dom.scrollTop - 500 ;
            }
        }
        let timer = setInterval(scrollBackTop,speed);
    }

    render(){
        return(
            <div className={this.props.className}
                 id="backTop"
                 onClick={this.backTop.bind(this ,10,this.props.dom)}
            ></div>
        )
    }
}
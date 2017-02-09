/**
 * Created by Administrator on 2017/02/08 0008.
 */
import React,{Component} from 'react';
import './index.css';

export default class HeaderBar extends Component{
    render(){
        return(
            <header className="headBar"><span>{this.props.content}</span></header>
        )
    }
}
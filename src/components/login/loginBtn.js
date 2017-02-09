/**
 * Created by Administrator on 2017/01/12 0012.
 */
import React,{Component} from 'react';

export default class LoginBtn extends Component{
    render(){
        const { onClick } = this.props
        return(
            <button className="but_dl" onClick={onClick}>
                {this.props.str}
            </button>
        )
    }
}
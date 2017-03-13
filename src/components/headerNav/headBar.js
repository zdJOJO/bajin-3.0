/**
 * Created by Administrator on 2017/02/08 0008.
 */
import React,{Component} from 'react';
import './index.css';


export default class HeaderBar extends Component{
    render(){
        return(
            <header className={(this.props.type==='2'||this.props.type==='3') ? 'headBar full' : 'headBar'}>
                <span>{this.props.content}</span>
                { this.props.type==='3' &&
                    <span className="back" onClick={this.props.onClick}/>
                }
            </header>
        )
    }
}
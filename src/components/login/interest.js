/**
 * Created by Administrator on 2017/01/18 0018.
 */
import React,{Component} from 'react';

export default class Interest extends Component{
    handleClick(){
        this.props.onClick(this.props.id ,this.props.isChoose)
    }
    render(){
        let classSrt = this.props.isChoose ? 'active' : '';
        return(
            <li className="itemInterest">
                <input type="checkbox" id={'i' + this.props.id}/>
                <label
                    onClick={this.handleClick.bind(this)}
                    className={classSrt}
                    id={this.props.id}
                    htmlFor={'i' + this.props.id}
                >
                    <img
                        className={classSrt}
                        role="presentation"
                        src={this.props.pic}
                    />
                    <span className={classSrt}>{this.props.description}</span>
                    { this.props.isChoose &&
                        <i />
                    }
                </label>
            </li>
        )
    }
}
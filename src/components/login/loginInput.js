/**
 * Created by Administrator on 2017/01/12 0012.
 */
import React,{Component} from 'react';

export default class LoginInput extends Component{
    handleChange(event){
        this.props.getValue(
            event.target.value,
            this.props.typeStr,
            this.props.isNew
        )
    }

    handlerFocus(){
        if(this.props.id==='birthDay')
            console.log('输入生日')
    }

    render(){
        return(
            <div className="yhm_login">
                <input
                    onChange={this.handleChange.bind(this)}
                    type={this.props.typeStr}
                    placeholder={this.props.placeholder}
                    id={this.props.id}
                    onFocus={this.handlerFocus.bind(this)}
                />
                { this.props.id==='birthDay' &&
                <label htmlFor="birthDay">
                    {this.props.birthDay || '请选择生日'}
                </label>
                }
            </div>
        )
    }
}
/**
 * Created by Administrator on 2017/03/03 0003.
 */

import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Dialog} from 'react-weui';

import { showDialog } from '../../actions/publicAction'

/*  例子:
*  <MyDialog
 type="2"
 title="提示"
 content="请先绑定白金卡"
 btn2Text="去绑卡"
 show={isDialogShow}
 showDialog={()=>{showDialog(false) }}
 />
 * */

class MyDialog extends Component{
    constructor(props){
        super(props);
        const {showDialog} = this.props
        this.state = {
            style1: {
                title: this.props.title ,
                buttons: [
                    {
                        label: '知道了',
                        onClick: ()=>{showDialog(false)}
                    }
                ]
            },
            style2: {
                title: this.props.title,
                buttons: [
                    {
                        type: 'default',
                        label: '取消',
                        onClick: ()=>{showDialog(false)}
                    },
                    {
                        type: 'primary',
                        label:  this.props.btn2Text,
                        onClick: ()=>{showDialog(false)}
                    }
                ]
            }
        }
    }

    render(){
        return(
            <Dialog
                type="ios"
                title={ this.props.type==='1' ? this.state.style1.title : this.state.style2.title }
                buttons={ this.props.type==='1' ? this.state.style1.buttons : this.state.style2.buttons }
                show={this.props.show}
            >{this.props.content}</Dialog>
        )
    }
}

function mapStateToProps(state) {
    return{}
}

export default connect(
    mapStateToProps, {showDialog}
)(MyDialog)
/**
 * Created by Administrator on 2017/02/08 0008.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import {postActInfo ,showDialog} from '../../actions/activityAction';

//import Using ES6 syntax
import {Button,TextArea,Input,Dialog,Toast} from 'react-weui';

class ActivityInitiating extends Component{
    constructor (props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            introduction: '',
            remarks:'',
            style1: {
                buttons: [
                    {
                        label: '知道了',
                        onClick: this.hideDialog.bind(this)
                    }
                ]
            }
        };
    }

    hideDialog() {
        const { showDialog }=this.props;
        showDialog(false)
    }

    handleSubmit(obj){
        const { postActInfo ,showDialog}=this.props;
        if(!obj.name||!obj.phone||!obj.introduction||!obj.remarks){
            showDialog(true)
        }else {
            postActInfo(obj)
        }
    }

    handleChange(num,event){
        if(num===1){
            this.setState({name: event.target.value})
        }else if(num===2){
            this.setState({phone: event.target.value})
        }else if(num===3){
            this.setState({introduction: event.target.value})
        }else {
            this.setState({remarks: event.target.value})
        }
    }

    render(){
        const {showIOS1 ,showToast} = this.props;
        return(
            <div className="initiateInfo">
                { showIOS1 &&
                    <Dialog
                        type="ios"
                        title={this.state.style1.title}
                        buttons={this.state.style1.buttons}
                        show={showIOS1}
                    >请正确填写信息</Dialog>
                }
                { showToast &&
                    <Toast icon="success-no-circle" show={showToast}>创建成功</Toast>
                }

                <div className="actInfoItem">
                    <h4>姓名:</h4>
                    <Input type="text" placeholder="您的姓名" onChange={this.handleChange.bind(this,1)}/>
                </div>
                <div className="actInfoItem">
                    <h4>联系方式:</h4>
                    <Input type="tel" placeholder="您的手机号码" onChange={this.handleChange.bind(this,2)} />
                </div>
                <div className="actInfoItem textArea">
                    <h4>活动简介:</h4>
                    <TextArea placeholder="对发起的活动的简短描述" rows="2" maxlength="200" onChange={this.handleChange.bind(this,3)} />
                </div>
                <div className="actInfoItem textArea">
                    <h4>备注信息:</h4>
                    <TextArea placeholder="您的特殊要求" rows="2" maxlength="200" onChange={this.handleChange.bind(this,4)} />
                </div>
                <Button onClick={this.handleSubmit.bind(this,{
                    name: this.state.name,
                    phone: this.state.phone,
                    introduction: this.state.introduction,
                    remarks: this.state.remarks
                })}
                >提交</Button>
            </div>
        )
    }
}


const mapStateToProps = state =>{
    return {
        showIOS1: state.activityReducer.initiateAct.isDialogShow,
        showToast: state.activityReducer.initiateAct.showToast
    }
}

export default connect(
    mapStateToProps,{postActInfo ,showDialog}
)(ActivityInitiating)


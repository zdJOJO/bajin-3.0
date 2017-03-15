/**
 * Created by Administrator on 2017/03/06 0006.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import {Dialog, Toast, Popup, Button, Input} from 'react-weui'

import { dispatchFetchData } from '../../actions/userAction'
import { upImgFn, showDialog, showFullPopup, showToastLoading } from '../../actions/publicAction'

import code from '../../img/userInfo/code.png';
import './index.css'

const sexNumberWord =(num)=>{
    return{
        str: num===1 ? '男' : '女'
    }
};


class SetInfo extends  Component{

    constructor(props){
        super(props);
        const { showDialog } = this.props;
        this.state = {
            type: 0,
            userInfo:{
                userName: this.props.userInfo.userName,
                gender: this.props.userInfo.gender,
                headPic: this.props.userInfo.headPic
            },
            style2: {
                title: '更新用户信息',
                buttons: [
                    {
                        type: 'default',
                        label: '取消',
                        onClick: ()=>{showDialog(false)}
                    },
                    {
                        type: 'primary',
                        label: '确定',
                        onClick: this.handleUpdateInfo.bind(this)
                    }
                ]
            },
            codeShow: false  //我的二维码显示
        }
    }

    handleClick(type){
        const { showDialog } = this.props;
        if(type===1 || type===2){
            showDialog(true);
            this.setState({
                type: type
            })
        }else if(type===3){
            this.setState({
                codeShow: true
            })
        }else if(type===4){
           location.hash = '#/myAddress'
        }
    }

    handleChangeInfo(obj, event){
        const { upImgFn, showToastLoading } = this.props;
        if(obj.type === 1){
            this.setState({
                userInfo:{
                    userName: event.target.value,
                    gender: this.props.userInfo.gender,
                    headPic: this.props.userInfo.headPic
                }
            })
        }else if(obj.type === 2){
            this.setState({
                userInfo:{
                    userName: this.props.userInfo.userName,
                    gender: parseInt(event.target.value),
                    headPic: this.props.userInfo.headPic
                }
            })
        }else {
            let file = event.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e){
                showToastLoading(true);
                upImgFn({
                    type: 1,
                    imgBase: this.result,
                    size: file.size,
                    userName: obj.userName,
                    gender: obj.gender
                });
            }
        }
    }

    handleUpdateInfo(){
        const { dispatchFetchData } = this.props;
        if(!this.state.userInfo.userName ) return;
        dispatchFetchData({
            type: 3,
            data: this.state.userInfo
        })
    }

    render(){
        const {
            isDialogShow,isShowToastSuccess, isShowToastLoading
        } = this.props;
        return(
            <div id="userInfo">
                <Dialog type="ios" 
                        title={this.state.style2.title} 
                        buttons={this.state.style2.buttons} 
                        show={isDialogShow}
                >
                    { this.state.type === 1 &&
                        <Input type="text"
                               value={this.state.userInfo.userName}
                               onChange={this.handleChangeInfo.bind(this, {type:1})}
                        />
                    }
                    { this.state.type === 2 &&
                        <div>
                            <select onChange={this.handleChangeInfo.bind(this, {type: 2})}>
                                <option value="1">男</option>
                                <option value="2">女</option>
                            </select>
                        </div>
                    }
                </Dialog>

                <Toast icon="success-no-circle" show={isShowToastSuccess}>更新成功</Toast>
                <Toast icon="loading" show={isShowToastLoading}>Loading...</Toast>

                {/**** 二维码 ***/}
                <Popup
                    show={this.state.codeShow}
                    onRequestClose={()=>{this.setState({codeShow: false})}}
                >
                    <div style={{height: '100vh', overflow: 'scroll'}}>
                        <div style={{textAlign:'center'}}>
                            <div className="qrcodeBox">
                                <img role="presentation" src={this.props.userInfo.qrcode} />
                            </div>
                        </div>
                        <Button onClick={()=>{this.setState({codeShow: false})}}>知道了</Button>
                    </div>
                </Popup>

                <ul style={{marginTop: '0'}}>
                    <li>
                        <label htmlFor="headPic" style={{background: 'none'}}>
                             <span className="first">
                                <img role="presentation" src={this.props.userInfo.headPic} />
                             </span>
                            <span className="last">修改个人头像</span>
                        </label>
                        <input id="headPic" type="file"  multiple={false}
                               onChange={this.handleChangeInfo.bind(this, {
                               type: 3,
                                   userName: this.props.userInfo.userName,
                                   gender: this.props.userInfo.gender
                               })}
                        />
                    </li>
                    <li onClick={this.handleClick.bind(this,1)} >
                        <span className="first">昵称</span>
                        <span className="last">{this.props.userInfo.userName}</span>
                    </li>
                    <li onClick={this.handleClick.bind(this,2)}>
                        <span className="first">性别</span>
                        <span className="last">{sexNumberWord(this.props.userInfo.gender).str}</span>
                    </li>
                    <li>
                        <span className="first">绑定手机号</span>
                        <span className="last phone">{this.props.userInfo.phone}</span>
                    </li>
                    <li onClick={this.handleClick.bind(this,4)} >
                        <span className="first">收货地址</span>
                        <span className="last">点击查看</span>
                    </li>
                    <li onClick={this.handleClick.bind(this,3)}>
                        <span className="first">我的二维码</span>
                        <span className="last">
                             <img role="presentation" src={code}/>
                        </span>
                    </li>
                    <li>
                        <span className="first">我感兴趣的</span>
                        <span className="last">点击查看</span>
                    </li>
                    <li>
                        <span className="first">我是客户经理</span>
                        <span className="last">请下载白金尊享APP</span>
                    </li>
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        isDialogShow: state.publicReducer.isDialogShow,
        isShowToastLoading: state.publicReducer.isShowToastLoading,
        isShowToastSuccess: state.publicReducer.isShowToastSuccess,
        isFullPopupShow: state.publicReducer.isFullPopupShow
    }
}

export default connect(
    mapStateToProps, {
        dispatchFetchData,
        showDialog, showFullPopup, showToastLoading,
        upImgFn
    }
)(SetInfo)
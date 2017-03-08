/**
 * Created by Administrator on 2017/01/12 0012.
 */
import React,{Component} from 'react';
import { connect } from 'react-redux';
import { hashHistory ,Link } from 'react-router';
import cookie from 'react-cookie';

import LoginBtn from '../../components/login/loginBtn';
import LoginInput from '../../components/login/loginInput';
import Interest from '../../components/login/interest';

import {changeTab, shouldFetchGetInfo} from '../../actions/loginAction';
import {hex_md5} from '../../public/md5';

//import Using ES6 syntax
import {Toptips ,Button} from 'react-weui';

import './login.css';
import logo from '../../img/login/logo.png';
import back from '../../img/login/back.png';
import headPic from '../../img/login/headPic_default.png';

const passwordRe = /^[a-zA-Z0-9]{6,99}$/;

// 数组合并（去掉重复，并且不删重复项）
Array.prototype.unique = function(){
    var a = {};
    for(let i = 0; i < this.length; i++){
        if(typeof a[this[i]] === "undefined")
            a[this[i]] = 1;
    }
    this.length = 0;
    for(let i in a)
        this[this.length] = i;
    return this;
}

// 数组合并（去掉重复，并且删除重复项）
Array.prototype.unique_delete = function(){
    var a = {},
        b = {},
        n = this.length;
    for(let i = 0; i < n; i++){
        if(typeof(b[this[i]]) !== "undefined")
            continue;
        if(typeof(a[this[i]]) === "undefined"){
            a[this[i]] = 1;
        }else{
            b[this[i]] = 1;
            delete a[this[i]];
        }
    }
    this.length = 0;
    for(let i in a)
        this[this.length] = i;
    return this;
}


class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            phone: '',
            password: '',
            captcha: '',
            newPasswordOne: '',
            newPasswordTwo: '',
            inviteCode: '',
            isCheck: true,  //是否同意协议
            name: '',
            gender: '',
            birthDay: '',
            base64: '', //图片
            idArray: [] //需要上传的兴趣id列表
        };
    }

    componentWillMount(){
        const {shouldFetchGetInfo} = this.props;
        shouldFetchGetInfo({
            currentPage: 1,
            size: 10
        } ,9)
    }

    componentDidMount(){
        const {changeTab} = this.props;
        if(cookie.load('token')){
            hashHistory.push({pathname: '/'})
        }
        
        if(this.props.location.query.isChangePassWord === '1'){
            changeTab('forget')
        }
    }

    getInputValue(value,type,isNew) {
       if(type==='tel'){
           this.setState({phone:value})
       }else if(type==='num'){
           this.setState({inviteCode:value})
       }else if(type==='password'){
           //密码格式不正确
           console.log('密码格式'+ passwordRe.test(value));
           if(isNew==='1'){
               this.setState({newPasswordOne: passwordRe.test(value) ? hex_md5(value) : -1 })
           }else if(isNew==='2'){
               this.setState({newPasswordTwo: passwordRe.test(value) ? hex_md5(value):-1 })
           }else {
               this.setState({password: passwordRe.test(value) ? hex_md5(value) : -1 })
           }
       }else if(type==='text'){
           this.setState({name: value})
       }else {
           console.log(value)
           this.setState({birthDay: value})
       }
    }

    getCaptcha(event){
        this.setState({captcha: event.target.value})
    }

    handleCheck(){
        if(this.state.isCheck){
            this.setState({isCheck: false})
        }else {
            this.setState({isCheck: true})
        }
    }

    handleSelect(event){
        if(!event.target.value)
            return
        this.setState({gender: event.target.value})
    }

    upLoadImg(event){
        const {shouldFetchGetInfo} = this.props;
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e){
            shouldFetchGetInfo({
                imgBase: this.result,
                size: file.size
            } ,8);
        }
    }

    //生成所选兴趣的 id 数组
    initIdArrayFn(id,isChoose){
        const {shouldFetchGetInfo ,interestingList} = this.props;
        this.setState({
            idArray: this.state.idArray.push(id)
        })
       if(isChoose){  //取消勾选
           shouldFetchGetInfo({
               id: id,
               list: interestingList,
               isChoose: false
           },10)
           this.setState({
               idArray: this.state.idArray.unique_delete()
           })
       }else { //勾选
           shouldFetchGetInfo({
               id: id,
               list: interestingList,
               isChoose: true
           },10)
           this.setState({
               idArray: this.state.idArray.unique()
           })
       }
    }

    render(){
        const {
            shouldFetchGetInfo ,
            tab ,
            changeTab ,
            errorStr ,isError , isSuccessful, successStr,
            countDownNum ,
            disable,
            userInfo,
            interestingList
        } = this.props;
        return(
            <div id="login">
                { isError &&
                    <Toptips type="warn" show={isError}>{errorStr}</Toptips>
                }
                { isSuccessful &&
                    <Toptips type="primary" show={isSuccessful}> {successStr}</Toptips>
                }
                { tab==="login" &&
                    <div className="login">
                        <img  role="presentation" src={logo} />
                        <div className="content">
                            <LoginInput typeStr="tel" placeholder="请输入手机号" getValue={this.getInputValue.bind(this)}/>
                            <LoginInput typeStr="password" placeholder="请输入登录密码" getValue={this.getInputValue.bind(this)}/>
                            <div className="pass_reg">
                                <span className="forget_password" onClick={()=>{changeTab('forget')}}>忘记密码</span>
                                <span className="register" onClick={()=>{changeTab('signUp')}}>新用户注册</span>
                            </div>
                            <LoginBtn str="登录"
                                      onClick={()=>shouldFetchGetInfo({
                                      phone: this.state.phone,
                                      password: this.state.password,
                                      isNeedBack: this.props.location.query.isNeedBack
                                      },1)}
                            />
                        </div>
                    </div>
                }
                { (tab==="forget"||tab==="reset")  &&
                    <div className="login">
                        <div id="back" onClick={
                            tab==='forget' ? ()=>{changeTab('login')} : ()=>{changeTab('forget')}
                        }>
                            <img role="presentation" src={back} />
                        </div>
                        <div className="contentTwo">
                            { tab==="forget"  &&
                                <div>
                                    <LoginInput typeStr="tel" placeholder="请输入手机号" getValue={this.getInputValue.bind(this)}/>
                                    <div className="yhm_dl_gym">
                                        <div className="yhm_sr">
                                            <input type="text" id="captcha" placeholder="请输入验证码" onChange={this.getCaptcha.bind(this)}/>
                                            { !disable &&
                                                <Button id="getCaptcha"
                                                        className="yhm_fs"
                                                        type="default"
                                                        size="small"
                                                        onClick={()=>{shouldFetchGetInfo({phone: this.state.phone} ,3)}}
                                                >{countDownNum}</Button>
                                            }
                                            { disable &&
                                                <Button id="getCaptcha"
                                                        className="yhm_fs"
                                                        type="default"
                                                        size="small"
                                                        disabled
                                                >{countDownNum}</Button>
                                            }
                                        </div>
                                    </div>
                                    <button className="but_dl"
                                            onClick={()=>{shouldFetchGetInfo({
                                            phone: this.state.phone,
                                            captcha: this.state.captcha},
                                            5)}}
                                    >下一步</button>
                                </div>
                            }
                            { tab==="reset" &&
                                <div>
                                    <LoginInput typeStr="password" placeholder="请输入6位以上新密码" isNew="1" getValue={this.getInputValue.bind(this)}/>
                                    <LoginInput typeStr="password" placeholder="请确认新密码" isNew="2" getValue={this.getInputValue.bind(this)}/>
                                    <button className="but_dl" onClick={()=>{shouldFetchGetInfo({
                                        phone: this.state.phone,
                                        newPasswordOne: this.state.newPasswordOne,
                                        newPasswordTwo: this.state.newPasswordTwo
                                        } ,6)}}
                                    >确认修改</button>
                                </div>
                            }
                        </div>
                    </div>
                }
                { tab==="signUp" &&
                    <div className="login">
                        <div id="back" onClick={()=>{changeTab('login')}}>
                            <img role="presentation" src={back} />
                        </div>
                        <div className="contentTwo">
                            <LoginInput typeStr="tel" placeholder="请输入手机号" getValue={this.getInputValue.bind(this)}/>
                            <div className="yhm_dl_gym">
                                <div className="yhm_sr">
                                    <input type="text" id="captcha" placeholder="请输入验证码" onChange={this.getCaptcha.bind(this)}/>
                                    { !disable &&
                                        <Button id="getCaptcha"
                                                className="yhm_fs"
                                                type="default"
                                                size="small"
                                                onClick={()=>{shouldFetchGetInfo({phone: this.state.phone} ,3 ,2)}}
                                        >{countDownNum}</Button>
                                    }
                                    { disable &&
                                        <Button id="getCaptcha"
                                                className="yhm_fs"
                                                type="default"
                                                size="small"
                                                disabled
                                        >{countDownNum}</Button>
                                    }
                                </div>
                            </div>
                            <LoginInput typeStr="password" placeholder="请设置6位以上登录密码" getValue={this.getInputValue.bind(this)}/>
                            <LoginInput typeStr="num" placeholder="请输入邀请码  (选填)" getValue={this.getInputValue.bind(this)}/>
                            <div id="xy_zc">
                                <input type="checkbox" id="ty" defaultChecked onChange={this.handleCheck.bind(this)}/>
                                <span id="ty_zc">我已经阅读并同意</span>
                                <a href="http://www.winthen.com/test/agreement.html">《用户使用协议》</a>
                            </div>
                            <button className="but_dl" onClick={()=>{shouldFetchGetInfo({
                                phone: this.state.phone,
                                password: this.state.password,
                                captcha: this.state.captcha,
                                inviteCode: this.state.inviteCode,
                                isCheck: this.state.isCheck
                            } ,2 ,2)}}>下一步</button>
                        </div>
                    </div>
                }
                { tab==="setInfo" &&
                    <div className="login">
                        <div id="back">
                            <Link to="/">
                                <img role="presentation" src={back} />
                            </Link>
                        </div>
                        <div className="contentThree">
                            <div className="headPic">
                                <label htmlFor="headPic">
                                    <img role="presentation" src={userInfo.headPic || headPic} /><br/>
                                </label>
                                <span>设置头像</span>
                                 <input id="headPic" type="file" accept={'image/*'} multiple={false}
                                       onChange={this.upLoadImg.bind(this)}
                                />
                            </div>
                            <LoginInput typeStr="text" placeholder="请设置昵称" getValue={this.getInputValue.bind(this)}/>
                            <div className="yhm_login">
                                <select id="sexValue" onChange={this.handleSelect.bind(this)}>
                                    <option value="">请选择性别</option>
                                    <option value="1">男</option>
                                    <option value="2">女</option>
                                </select>
                            </div>
                            <LoginInput id="birthDay"  birthDay={this.state.birthDay}
                                        typeStr="date" placeholder="请选择生日" getValue={this.getInputValue.bind(this)}/>
                            <button className="but_dl"
                                    onClick={()=>{shouldFetchGetInfo({
                                        name: this.state.name,
                                        gender: this.state.gender,
                                        birthDay: this.state.birthDay,
                                        headPic: userInfo.headPic
                                    } ,7)}}
                            >下一步</button>
                        </div>
                    </div>
                }
                { tab==="interest" &&
                    <div className="login">
                        <div id="back">
                            <Link to="/">
                                <img role="presentation" src={back} />
                            </Link>
                        </div>
                        <div className="contentThree">
                            <h3>您感兴趣的</h3>
                            <ul className="list">
                                {
                                    interestingList.map( (interest,index) =>{
                                        return(
                                            <Interest
                                                onClick={this.initIdArrayFn.bind(this)}
                                                key={index}
                                                id={interest.id}
                                                description={interest.description}
                                                pic={interest.pic}
                                                isChoose={interest.isChoose}
                                            />
                                        )
                                    })
                                }
                            </ul>
                            <button className="but_dl" onClick={()=>{shouldFetchGetInfo({idArray: this.state.idArray},11)}}>完成</button>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        tab: state.loginReducer.tab,
        isSuccessful: state.loginReducer.isSuccessful,
        successStr: state.loginReducer.successStr,
        errorStr:  state.loginReducer.errorStr,
        isError: state.loginReducer.isError,
        disable: state.loginReducer.disable,
        countDownNum: state.loginReducer.countDownNum,
        userInfo: state.loginReducer.userInfo,
        interestingList: state.loginReducer.interestingList
    }
}
export default connect(
    mapStateToProps,{
        shouldFetchGetInfo,
        changeTab
    }
)(Login)
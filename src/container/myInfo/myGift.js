/**
 * Created by Administrator on 2017/03/13 0013.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import HeaderBar from '../../components/headerNav/headBar'
import { Popup } from 'react-weui'

import './index.css'
import source from '../../img/detail/source.png'
import code from '../../img/detail/code.png'

class MyGift extends Component{

    constructor(props){
        super(props);
        this.state = {
            detailShow: false
        }
    }

    render(){
        const style = {
            color: '#999',
            background: 'none',
            padding: 0,
        };
        return(
            <div id="myGift" className="panel panel-default">
                <HeaderBar content="我的礼包" type="2"/>
                <Popup show={this.state.detailShow} >
                    <div style={{height: '100vh'}}>
                        <div id="selectDetail" className="actDetail" style={{bottom: 0}}>
                            <span className="back" onClick={()=>{this.setState({detailShow: false})}}/>
                            <div className="head">
                                <img src="http://card2016.oss-cn-hangzhou.aliyuncs.com/96e8c797405338a8f5f236bd96a7203a.jpg" role="presentation" />
                                    <h3>礼包主题标题</h3>
                                    <div>
                                        <div className="weui-panel__hd">
                                            <span className="act gifDetail" style={style}>当日活动</span>
                                        </div>
                                        <div className="weui-panel__hd"></div>
                                    </div>
                                    <ul>
                                        <li>
                                            <i className="one" style={{background: 'url('+source+') no-repeat 50%', backgroundSize: '35%'}}/>
                                            <span className="text">来源</span>
                                            <span className="value">生日礼包</span>
                                        </li>
                                        <li>
                                            <i className="two" style={{background: 'url('+code+') no-repeat 50%', backgroundSize: '35%'}}/>
                                            <span className="text">券码</span>
                                            <span className="value">313164646</span>
                                        </li>
                                    </ul>
                            </div>
                            <div className="body" style={{borderBottom: 'none'}}>
                                <h3>礼包详情</h3>
                                <div className="detailInfo">
                                    <div className="content"><p>奉公如法施工方撒花撒花干撒和大伙干撒和地方grey人员特特儿童</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Popup>

                <div className="list">
                    <div className="itemGift" onClick={()=>{this.setState({detailShow: true})}}>
                        <span className="status">未使用</span>
                        <img role="presentation" src="http://card2016.oss-cn-hangzhou.aliyuncs.com/7cf4a65eb1263becc093bf837417b60b.jpg"/>
                        <div>
                            <span className="giftName">礼包名称</span>
                            <span className="time">2017年3月13日10:27:59</span>
                        </div>
                    </div>
                    <div className="itemGift">
                        <span className="status">未使用</span>
                        <img role="presentation" src="http://card2016.oss-cn-hangzhou.aliyuncs.com/7cf4a65eb1263becc093bf837417b60b.jpg"/>
                        <div>
                            <span className="giftName">礼包名称</span>
                            <span className="time">2017年3月13日10:27:59</span>
                        </div>
                    </div>
                    <div className="itemGift">
                        <span className="status status-1">已使用</span>
                        <img role="presentation" src="http://card2016.oss-cn-hangzhou.aliyuncs.com/7cf4a65eb1263becc093bf837417b60b.jpg"/>
                        <div>
                            <span className="giftName">礼包名称</span>
                            <span className="time">2017年3月13日10:27:59</span>
                        </div>
                    </div>
                    <div className="itemGift">
                        <span className="status status-2">已发货</span>
                        <img role="presentation" src="http://card2016.oss-cn-hangzhou.aliyuncs.com/7cf4a65eb1263becc093bf837417b60b.jpg"/>
                        <div>
                            <span className="giftName">礼包名称</span>
                            <span className="time">2017年3月13日10:27:59</span>
                        </div>
                    </div>
                    <div className="itemGift">
                        <span className="status">未使用</span>
                        <img role="presentation" src="http://card2016.oss-cn-hangzhou.aliyuncs.com/7cf4a65eb1263becc093bf837417b60b.jpg"/>
                        <div>
                            <span className="giftName">礼包名称</span>
                            <span className="time">2017年3月13日10:27:59</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
    }
}

export default connect(
    mapStateToProps, {}
)(MyGift)
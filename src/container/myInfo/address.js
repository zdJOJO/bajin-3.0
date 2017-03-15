/**
 * Created by Administrator on 2017/03/14 0014.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import HeaderBar from '../../components/headerNav/headBar'
import {Dialog, Toast, Popup, Button, Input, TextArea, CityPicker} from 'react-weui'

import {dispatchFetchData} from '../../actions/userAction'

import { cnCity } from '../../public/cnCity'
import './index.css'


class MyAddress extends Component{

    constructor(props){
        super(props);
        const { dispatchFetchData }=this.props;
        this.state = {
            fullShow: false,
            isEdit: false,
            city_show: false,

            receiveId: '',
            name: '',
            phone: '',
            city_value: '',
            detailAddress: '',
            isDefault: 0,

            style2: {
                title: '提示',
                buttons: [
                    {
                        type: 'default',
                        label: '取消',
                        onClick: this.hideDialog.bind(this)
                    },
                    {
                        type: 'primary',
                        label: '确定',
                        onClick: ()=>{
                            dispatchFetchData({
                                type: 11,
                                receiveId: this.state.receiveId
                            })
                            this.setState({deleteAddressShow: false})
                        }
                    }
                ]
            },
            deleteAddressShow: false
        }
    }

    componentDidMount (){
        const { dispatchFetchData } = this.props;
        dispatchFetchData({type: 9})
    }

    hideDialog(){
        this.setState({
            deleteAddressShow: false
        })
    }

    handleSetDefault(address, isCreate, isEdit){
        const { dispatchFetchData } = this.props;
        if(address.isDefault === 1) return;
        dispatchFetchData({
            type: 10,
            isCreate: isCreate,
            isEdit: isEdit,
            data: address
        })
    }

    render(){
        const { addressList, dispatchFetchData } = this.props;
        return(
            <div id="myAddress" className="panel panel-default">
                <HeaderBar content="地址管理"  type="2"/>
                <ul>
                    {
                        addressList.map((address, index)=>{
                            return(
                                <li key={index}>
                                    <p className="receiverName">
                                        <span>{address.receiverName}</span>
                                        <span>{address.receiverPhone}</span>
                                    </p>
                                    <p className="receiverAddress">{address.province} - {address.city} - {address.district} - {address.detilAddress}
                                    </p>
                                    <p className="edit">
                                        { address.isDefault === 1 &&
                                            <span className="default" onClick={this.handleSetDefault.bind(this, address, false, false)}>默认地址</span>
                                        }
                                        { address.isDefault === 0 &&
                                            <span className="unDefault" onClick={this.handleSetDefault.bind(this, address, false, false)}>设为默认</span>
                                        }
                                        <span className="editAddress"
                                              onClick={()=>{
                                                    this.setState({
                                                        fullShow: true,
                                                        isEdit: true,
                                                        receiveId: address.receiveId,
                                                        name: address.receiverName,
                                                        phone: address.receiverPhone,
                                                        city_value: `${address.province} ${address.city} ${address.district}`,
                                                        detailAddress: address.detilAddress,
                                                        isDefault: address.isDefault
                                                    }
                                              )}}
                                        >编辑</span>
                                        <span className="deleteAddress"
                                              onClick={()=>{
                                                this.setState({
                                                    deleteAddressShow: true,
                                                    receiveId: address.receiveId
                                                })
                                              }}
                                        >删除</span>
                                    </p>
                                </li>
                            )
                        })
                    }
                </ul>
                <Button onClick={()=>{
                    this.setState({
                        fullShow: true,
                        isEdit: false,

                        receiveId: '',
                        name: '',
                        phone: '',
                        city_value: '',
                        detailAddress: ''
                    })
                }}>添加新地址</Button>


                {/**** 添加、编辑 地址****/}
                <Popup
                    show={this.state.fullShow}
                    onRequestClose={()=>{this.setState({fullShow: false})}}
                >
                    <div style={{height: '100vh', overflow: 'scroll'}}>
                        <HeaderBar content={this.state.isEdit?"编辑地址":'添加新地址'}  type="3"
                                   onClick={()=>{this.setState({fullShow: false, isEdit: false})}}
                        />
                        <ul style={{padding: '0.1rem', width: '3.0rem'}}>
                            <li><Input type="text" placeholder="姓名(请输入真实姓名)"
                                       value={this.state.name}
                                       onChange={(e)=>{this.setState({name: e.target.value})}}/></li>
                            <li><Input type="tel" placeholder="手机号码"
                                       value={this.state.phone}
                                       onChange={(e)=>{this.setState({phone: e.target.value})}}/></li>
                            <li>
                                <Input type="text"
                                       value={this.state.city_value}
                                       onClick={ e=> {
                                            e.preventDefault();
                                            this.setState({city_show: true})
                                       }}
                                       placeholder="省市县区"
                                       readOnly={true}
                                />
                            </li>
                            <li><TextArea rows="2" maxlength="400" placeholder="详细地址"
                                          value={this.state.detailAddress}
                                          onChange={(e)=>{this.setState({detailAddress: e.target.value})}}
                            /></li>
                        </ul>
                    </div>
                    <Button onClick={()=>{
                        dispatchFetchData({
                            type: 10,
                            isCreate: !this.state.receiveId,
                            isEdit: this.state.receiveId,
                            data: {
                                isDefault: this.state.isDefault,
                                receiveId: this.state.receiveId,
                                receiverName: this.state.name,
                                receiverPhone: this.state.phone,
                                province: this.state.city_value.split(' ')[0],
                                city:  this.state.city_value.split(' ')[1],
                                district:  this.state.city_value.split(' ')[2],
                                detilAddress: this.state.detailAddress
                            }
                        });
                        this.setState({fullShow: false, isEdit: false});
                    }}>保存</Button>
                    <CityPicker
                        data={cnCity}
                        onCancel={e=>this.setState({city_show: false})}
                        onChange={text=>this.setState({city_value: text, city_show: false})}
                        show={this.state.city_show}
                    />
                </Popup>

                {/**** 删除收货地址 ****/}
                <Dialog title={this.state.style2.title}
                        buttons={this.state.style2.buttons}
                        show={this.state.deleteAddressShow}>
                    确定删除该收货地址吗？
                </Dialog>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        addressList: state.userReducer.addressList
    }
}

export default connect(
    mapStateToProps, { dispatchFetchData }
)(MyAddress);
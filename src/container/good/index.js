/**
 * Created by Administrator on 2017/03/13 0013.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import CommentIn from '../../components/comment/commentIn'
import {
    PanelHeader,
    Button,LoadMore,
    ActionSheet, Popup, Dialog
} from 'react-weui';

import { fetchInfo , changeChooseSku} from '../../actions/goodAction'
import { getCommentList } from  '../../actions/commentAction';


import './index.css'

class GoodDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            index: 1 ,   // 详情：1  参数：2
            showSku: false, // 展示规格

            number: 1,  //所选商品数量
            currentChoose: 0 // 规格所选
        }
    }

    componentWillMount(){
        const { fetchInfo, getCommentList } = this.props;
        fetchInfo({
            type: 1,
            id: this.props.location.query.itemId
        });

        fetchInfo({
            type: 2,
            sku: true,
            id: this.props.location.query.itemId
        });

        getCommentList({
            itemType: this.props.location.query.itemType,
            itemId:  this.props.location.query.itemId,
            page: 0,
            isListNull: false,
            isInDetail: true
        });
    }

    handleChangeNumber(type){
        const { chooseSku } = this.props;
        //type:  0 - 加  1 - 减
        if( (type===1 && this.state.number === 1) || (this.state.number === chooseSku.stockNumber) ){
           return
        }
        if(type === 0){
            this.setState({
                number: this.state.number + 1
            })
        }else {
            this.setState({
                number: this.state.number - 1
            })
        }
    }

    render(){
        const {
            goodDetail, skuList, changeChooseSku, chooseSku,
            listInDetail, rowCount
        } = this.props;
        const style = {
            color: '#999',
            background: 'none',
            padding: 0
        };
        return(
            <div id="goodDetail" className="panel panel-default">
                { goodDetail &&
                    <div id="selectDetail" className="actDetail" style={{bottom: 0}}>
                        <div className="head">
                            <img src={goodDetail.maxPic} role="presentation" />
                            <h3>{goodDetail.goodsTitle}</h3>
                            <div>
                                <div className="weui-panel__hd">
                                    <span className="act gifDetail" style={style}>{goodDetail.goodsSubtitle}</span>
                                </div>
                                <div className="weui-panel__hd"></div>
                            </div>
                            <div className="sku">
                                <p className="price">
                                    <span>尊享价</span>
                                    <span>￥{chooseSku.skuPrice?chooseSku.skuPrice.toFixed(2):'0000.00'}</span>
                                    <span>市场价:￥{chooseSku.marketPrice?chooseSku.marketPrice.toFixed(2):'0000.00'}</span>
                                </p>
                                <p className="hasChoose"
                                   onClick={()=>{this.setState({showSku: true})}}
                                >已选: {chooseSku.skuGague} × {this.state.number}</p>
                            </div>
                        </div>
                        <CommentIn commentObj={
                                {
                                    itemType: 3,
                                    itemId: goodDetail.goodsId,
                                    rowCount: rowCount,
                                    commentList: listInDetail
                                }
                            }
                        />
                        <div className="body" style={{borderBottom: 'none'}}>
                            <h3 className="tab">
                                <span className={this.state.index === 1 ? 'active' : ''} onClick={()=>{this.setState({index: 1})}}>商品详情</span>
                                <span className={this.state.index === 2 ? 'active' : ''} onClick={()=>{this.setState({index: 2})}}>产品参数</span>
                            </h3>
                            <div className="detailInfo">
                                { this.state.index === 1 &&
                                <div className="content" dangerouslySetInnerHTML={{__html:goodDetail.goodsDetail}}></div>
                                }
                                {  this.state.index === 2 &&
                                <div className="content" dangerouslySetInnerHTML={{__html:goodDetail.goodsGauge}}></div>
                                }

                            </div>
                        </div>
                    </div>
                }
                { !goodDetail &&
                    <LoadMore loading>Loading...</LoadMore>
                }

                <Popup
                    show={this.state.showSku}
                    onRequestClose={e=>this.setState({showSku: false})}
                >
                    <div className="skuList">
                        <div className="head">
                            <img src="http://card2016.oss-cn-hangzhou.aliyuncs.com/96e8c797405338a8f5f236bd96a7203a.jpg" role="presentation" />
                            <div>
                                <p>￥{chooseSku.skuPrice?chooseSku.skuPrice.toFixed(2):'0000.00'}</p>
                                <p>限量{chooseSku.stockNumber}件</p>
                                <p>
                                    <span>已选择</span>
                                    <span>{chooseSku.skuGague}</span>
                                </p>
                            </div>
                        </div>
                        <div className="second">
                            <p className="title">规格</p>
                            <ul>
                                {
                                    skuList.map((sku, index)=>{
                                        return(
                                            <li key={index} className={ this.state.currentChoose===index ? 'active' : '' }
                                                onClick={
                                                    ()=>{
                                                        this.setState({
                                                            currentChoose: index,
                                                            number: 1
                                                        })
                                                        changeChooseSku(sku)
                                                    }
                                                }
                                            >
                                                {sku.skuGague}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="third">
                            <p className="title">数量</p>
                            <p>
                                <i className="reduce" onClick={this.handleChangeNumber.bind(this, 1)}>－</i>
                                <i className="number">{this.state.number}</i>
                                <i className="plus" onClick={this.handleChangeNumber.bind(this, 0)}>＋</i>
                            </p>
                        </div>
                    </div>
                    <Button>确定</Button>
                </Popup>

                <div id="footBuy" className="do">
                    <i />
                    <Button id="flow" type="default" plain>收藏</Button>
                    <Button id="buy" onClick={e=>this.setState({showSku: true})}>购买</Button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        goodDetail:　state.detailReducer.goodDetail,
        skuList:　state.detailReducer.skuList,
        chooseSku: state.detailReducer.chooseSku,

        listInDetail: state.commentReducer.listInDetail,
        rowCount: state.commentReducer.rowCount
    }
}

export default connect(
    mapStateToProps, { fetchInfo , changeChooseSku, getCommentList}
)(GoodDetail)
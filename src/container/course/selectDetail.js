/**
 * Created by Administrator on 2017/02/15 0015.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

//import Using ES6 syntax
import {
    MediaBoxInfoMeta,
    PanelHeader
} from 'react-weui';

import more from '../../img/more.svg';
import backTop from '../../img/detail/backTop.png';
import kefu from '../../img/detail/kefu.png';
import share from '../../img/detail/share.png';
import vedio from '../../img/detail/vedio.png';
import down from '../../img/detail/down.png';


class SelectDetail extends Component{
    componentWillMount(){
        const {} = this.props;
    }

    render(){
        return(
            <div id="selectDetail">
                <div className="head">
                    <img src="" role="presentation"/>
                    <h3>朗诗雅静|2017，触动你生命的24堂必修课</h3>
                    <div>
                        <PanelHeader>18人关注/5人订阅</PanelHeader>
                        <PanelHeader>￥180000</PanelHeader>
                    </div>
                </div>
                <div className="body">
                    <PanelHeader>
                        <span className="vedio"><img role="presentation" src={vedio}/><i>相关视频</i></span>
                        <span className="more"><i>共27条视频</i><img role="presentation" src={more}/></span>
                    </PanelHeader>
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
    mapStateToProps,{}
)(SelectDetail);
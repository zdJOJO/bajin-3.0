/**
 * Created by Administrator on 2017/03/03 0003.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

class IcbcForm extends Component{
    render(){
        const {ciphertext} = this.props;
        return(
            <form
                name="info"
                method="post"
                action="http://web.zj.icbc.com.cn/mobile/Bjzx.do?scene=bjzx"
            >
                <input type="hidden" name="merSignMsg" value={ciphertext}/>
                <input type="hidden" name="companyCis" value="bjzx"/>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return{
        ciphertext: state.publicReducer.ciphertext
    }
}

export default connect(
    mapStateToProps
)(IcbcForm)
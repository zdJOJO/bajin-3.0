/**
 * Created by Administrator on 2017/02/28 0028.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import HomeContentList from '../../components/homeContentList'
import HomeTitle from '../../components/homeTitle'

class Content extends Component{

    render(){
        return(
            <div className="contentBox">
                { this.props.type !== '2' &&
                    <div>
                        <HomeTitle
                            title={this.props.title}
                            typeStr={this.props.typeStr}
                        />
                        <HomeContentList
                            type={this.props.type}
                            list={this.props.firstList}
                        />
                    </div>
                }
                { this.props.type === '2' &&
                    <div className="contentBoxTwo">
                        <img role="presentation" src="http://card2016.oss-cn-hangzhou.aliyuncs.com/68ec567fa0e9256a9d68cb1a4707537a.jpg" />
                        <HomeContentList
                            type={this.props.type}
                            list={this.props.firstList}
                        />
                    </div>
                }
            </div>
        )
    }
}

export default connect()(Content);
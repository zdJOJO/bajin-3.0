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
                            type={this.props.type}
                        />
                        <HomeContentList
                            type={this.props.type}
                            list={this.props.list}
                        />
                    </div>
                }
                { this.props.type === '2' &&
                    <div className="contentBoxTwo">
                        <img role="presentation" src={this.props.pic} />
                        <HomeContentList
                            type={this.props.type}
                            list={this.props.list}
                        />
                    </div>
                }
            </div>
        )
    }
}

export default connect()(Content);
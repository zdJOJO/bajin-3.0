/**
 * Created by Administrator on 2017/02/28 0028.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import HomeContentList from '../../components/homeContentList'
import HomeTitle from '../../components/homeTitle'

class Content extends Component{


    componentDidMount(){
        if(this.props.type===2)
            console.log(this.props.list)
    }

    render(){
        return(
            <div className={this.props.type===2 ? 'contentBox type2' : 'contentBox'}>
                { this.props.type !== 2 &&
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
                { this.props.type === 2 &&
                    <div className="contentBoxTwo">
                        <img role="presentation" src={this.props.type2FirsElement.pic} />
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
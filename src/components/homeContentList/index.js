/**
 * Created by Administrator on 2017/02/28 0028.
 */
import React,{Component} from 'react';
import {hashHistory} from 'react-router'

import './index.css'


class HomeContentList extends Component{

    handlerScroll(e){
        e.preventDefault();
    }

    handleGo(type, id){
        if(type === 3){
            id = 7 ;
            hashHistory.push({
                pathname: `/good/${id}`,
                query: {
                    itemType: 3,
                    itemId: id
                }
            });
        }
    }

    render(){
        return(
            <ul
                className={this.props.type === 1?'homeContent type1':
                (this.props.type === 2 ? 'homeContent type2':'homeContent type3')}
                onScroll={this.handlerScroll.bind(this)}
            >
                {
                    this.props.list.map( (item, index)=>{
                        return(
                            <li key={index} onClick={this.handleGo.bind(this, this.props.type, item.id)}>
                                <div className="imgBox">
                                    <img role="presentation" src={item.pic}/>
                                </div>
                                { (this.props.type === 1 || this.props.type === 2) &&
                                    <span>{item.title}</span>
                                }
                                { this.props.type === 3 &&
                                    <div className="type3Title">
                                        <div>{item.title}</div>
                                        <span>￥17000.00</span>
                                    </div>
                                }
                            </li>
                        )
                    } )
                }
            </ul>
        )
    }
}

export default HomeContentList;
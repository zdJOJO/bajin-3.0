/**
 * Created by Administrator on 2017/02/27 0027.
 */
import React,{Component} from 'react';

import CourseItem from '../../container/course/item';
//import Using ES6 syntax
import { PanelHeader } from 'react-weui'

import './index.css'

class RelateList extends Component{
    render(){
        return(
            <div className="relate">
                <PanelHeader>相关推荐</PanelHeader>
                { this.props.recommendedList.length===0  &&
                    <div className="nullList">暂无推荐</div>
                }
                { this.props.recommendedList.length > 0 &&
                    <div id="select" className="subContentPanel in">
                        {
                            this.props.recommendedList.map((course,index)=>{
                                return(
                                    <CourseItem
                                        key={index}
                                        course={course}
                                    />
                                )
                            })
                        }
                    </div>
                }
            </div>
        )
    }
}

export default RelateList
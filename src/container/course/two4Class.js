/**
 * Created by Administrator on 2017/02/13 0013.
 */
import React,{Component} from 'react';

class WelcomeDialog extends Component{
    render(){
        return (
            <div color="blue" name="章炜">
                <H className="Dialog-title" name={this.props.name}>

                </H>

                <p className="Dialog-message">
                    Thank you for visiting our spacecraft!
                </p >
            </div>
        );
    }
}
class H extends Component{
    render(){
        return(
            <h1>{this.props.name}</h1>
        )
    }
}

class Two4Class extends Component{
    render(){
        return(
            <div id="" className="subContentPanel">
                <WelcomeDialog name="段明明" />
            </div>
        )
    }
}

export default Two4Class;
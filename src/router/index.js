/**
 * Created by Administrator on 2017/01/05 0005.
 */
import App from '../container/App';

import Home from '../container/home';

import ActivityBox from '../container/activity/index';
import ActivityInfo from '../container/activity/activityInfo';

import CourseBox from '../container/course';
import Select from '../container/course/select'
import Two4Class from '../container/course/two4Class'
import SelectDetail from '../container/course/selectDetail'

import MyInfo from '../container/myInfo';
import MyCourse from '../container/myInfo/myCourse'
import BankCard from '../container/bankCard'

import Login from '../container/login';
import CommentList from '../container/comment/commentList';


export const routeConfig = [
    {
        path: '/',
        component: App,
        indexRoute: { component: Home },
        childRoutes: [
            { path: 'activity', component: ActivityBox },
            {
                path: 'course',
                component: CourseBox ,
                indexRoute: { component: Select },
                childRoutes: [
                    { path: 'two4Class', component: Two4Class },
                ]
            },
            {path: 'myInfo', component: MyInfo },
            { path: 'myCourse', component: MyCourse },
            { path: 'myBankCard', component: BankCard },
            { path: 'login', component: Login },
            { path: 'comment', component: CommentList },
            { path: 'activity/:activityId', component: ActivityInfo },
            { path: 'course/:selectId', component: SelectDetail }
        ]
    }
]
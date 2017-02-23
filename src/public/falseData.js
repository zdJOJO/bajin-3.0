/**
 * Created by Administrator on 2017/02/22 0022.
 */

import down from '../img/detail/down.png';


// 评论假数据:  http://test.winthen.com/card/comment/list?currentPage=1&type=1&itemId=22&isAudit=0
//详情中 评论假数据
export const commentObj = {
    itemType: 1,
    itemId: 2,
    rowCount: 10+'（假数据）',
    commentList: [
        {
            commentContent: '发觉了沙发司法考试的喝开水大火可视电话客户客户看肯定是k',
            createTime: 1483686098,
            userModel: {
                userName: "（假数据）哈哈哈哈",
                headPic: down
            }
        },
        {
            commentContent: 'hkgh;fkh fkhg;hkf地方老师讲过了数据管理是第几个了时间管理设计灵感加上洛杉矶了',
            createTime: 1484883546,
            userModel: {
                userName: "（假数据）刘德华",
                headPic: ''
            }
        }
    ]
}

// 详情中 相关推荐 假数据
export const selectList  = [
    {
        id: 0,
        title: '2013舒服啦捡垃圾了啊阿达按时大锅饭大概规范化个回个话愉快就看有空看就看就看',
        price: 2000,
        minPic: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=747081213,1247933411&fm=23&gp=0.jpg',
        type: 1
    },
    {
        id: 1,
        title: '阿达按时大锅饭大概规范化个回个话愉快就看有空看就看就看',
        price: 500,
        minPic: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=747081213,1247933411&fm=23&gp=0.jpg',
        type: 2
    },
    {
        id: 2,
        title: '上课了放家里圣诞节萨达的',
        price: 8000,
        minPic: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=747081213,1247933411&fm=23&gp=0.jpg',
        type: 3
    }
]
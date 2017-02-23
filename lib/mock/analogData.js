Mock.mock(/\/open\/getStore.do/,{
    "code": 200,
    "msg": "处理成功",
    "result": [
        {
            "storeList": [
                {
                    "cityName": "肇庆市",
                    "storeId": "D1BA44B214AB43A7A006FC1E39EF61E7",
                    "storeBriefName": "666蔚蓝国际店"
                },
                {
                    "cityName": "肇庆市",
                    "storeId": "56898989",
                    "storeBriefName": "端州店"
                }
            ],
            "city": "肇庆市"
        },
        {
            "storeList": [
                {
                    "cityName": "广州市",
                    "storeId": "565656565",
                    "storeBriefName": "棠东店"
                },
                {
                    "cityName": "广州市",
                    "storeId": "565656565",
                    "storeBriefName": "车陂店"
                }
            ],
            "city": "广州市"
        }
    ]
});

Mock.mock(/\/open\/getWeixinOpenId.do/,{
    "code": 200,
    "openId": "787989865656545454"
});

Mock.mock(/\/open\/login.do/,{
    "code": 200,
    "msg": "处理成功",
    "result": {
        "token": "2F5EA7CB8A5244CCB65BF7C23C8DA477",
        "account": "13922302431",
        "userImgUrl": " http://www.520coding.com/user_img.png"
    }
});

Mock.mock(/\/customer\/loginOut.do/,{
    "code": 200,
    "msg": "退出成功",
    "result": []
});

/* 首页 */
Mock.mock(/\/open\/index.do/,{ "code": 200, "msg": "处理成功", "result": { "storeInfo": { "closeTime": "02:00", "isOpen": "1", "openTime": "09:00", "restBegintime": "2016-08-24", "restEndtime": "2016-08-24", "storeBriefName": "666蔚蓝国际店", "storeId": "D1BA44B214AB43A7A006FC1E39EF61E7" }, "pageActList": [ { "limitCount": 0, "pageActName": "热销商品", "imageUrl": "http://www.520coding.com/img/2/6/15/1/574320eae230440783514bd4e9237584.png", "paActItemList": [ { "itemSize": "1包", "itemName": "硬盒娇子", "actItemId": "C258722A6EB04B36B628E7BFA90BAF88", "imageUrl": "http://www.520coding.com/img/11/9/0/6/5ec172f1e4dc4ed1a1169061677b3496.png", "available": 500, "appActPrice": 7.5, "itemId": "8C79CBE3420F4297AD74E45B93DF4FA9" }, { "itemSize": "2g", "itemName": "海牌海苔", "actItemId": "B68D8A2E951C4229972880C70FAF3757", "imageUrl": "http://www.520coding.com/img/14/12/0/10/606f087a456a4918a6db59666fda081b.png", "available": 500, "appActPrice": 1, "itemId": "B5F1D5A7E31B4226AF9425B4410A3725" }, { "itemSize": "10片", "itemName": "榄菊蚊香", "actItemId": "40A18C4E7E4441C6AA061C371E2D2BCF", "imageUrl": "http://www.520coding.com/img/11/9/13/0/a0c51be7ff5d4f629bc0eda410bfaed1.png", "available": 500, "appActPrice": 3, "itemId": "039450E9FB5F41C2A1B731D727C3D798" }, { "itemSize": "1包", "itemName": "硬盒世纪经典", "actItemId": "3F2288A610B3474099917E860B8CC1DB", "imageUrl": "http://www.520coding.com/img/2/7/9/11/fbb7b379325b49fb998dc77b117931f7.png", "available": 500, "appActPrice": 23, "itemId": "C437A98C30E64959AC568F6D3CDCABC8" }, { "itemSize": "550ml", "itemName": "550ml尖叫纤维型", "actItemId": "588CE64228CB4F34835D60F3C1A22868", "imageUrl": "http://www.520coding.com/img/12/11/14/2/eb5a8fea63e341b194117c855b2fbed9.png", "available": 500, "appActPrice": 4, "itemId": "60DB05569DF342E8B70A194EFF01B95C" }, { "itemSize": "250ml", "itemName": "黑豆味维他奶", "actItemId": "276E0ACD4F16429BAD2069A23F7CB472", "imageUrl": "http://www.520coding.com/img/0/3/5/14/4942e6f00f6d4877a64339aa79292e8a.png", "available": 500, "appActPrice": 3, "itemId": "B68D544EB07E441C82E198F4F60C7604" } ], "pageActId": "64008FF74D1A4567B1F283EDE5E6E74D" }, { "limitCount": 0, "pageActName": "开业大酬宾", "imageUrl": "http://www.520coding.com/img/9/4/4/11/f56d6f754399450b9c99622b01363534.png", "paActItemList": [ { "itemSize": "310ml", "itemName": "310ml加多宝", "actItemId": "48EB831AB774408A838EA8D67C722252", "imageUrl": "http://www.520coding.com/img/13/12/5/5/1922c24f98a94d039c83982c689c1f1e.png", "available": 500, "appActPrice": 3.5, "itemId": "B7ECE44E2AEA45939A58CDA86CFFD5B5" }, { "itemSize": "500ml", "itemName": "康师傅经典白奶茶", "actItemId": "D3AA9167DFC94B5386BEFF527F7C2BE8", "imageUrl": "http://www.520coding.com/img/15/14/3/12/69115b95e25945c69b6d75649038fd54.png", "available": 500, "appActPrice": 4, "itemId": "A59D93C5FA92465583993032C0709528" }, { "itemSize": "268ml", "itemName": "雀巢咖啡", "actItemId": "A5897F9D85A64931ABFA4412F06B7063", "imageUrl": "http://www.520coding.com/img/5/15/4/3/8a79b38369ed4b849c7b85990d1e70cb.png", "available": 500, "appActPrice": 5.5, "itemId": "87F928489E7B43B19F3B4D8E1B6537D4" }, { "itemSize": "500ml", "itemName": "500ml康师傅柚子绿茶", "actItemId": "477B353E2CE048BB8D5773047BEB248E", "imageUrl": "http://www.520coding.com/img/13/10/1/8/9401b5a9b3fc4f918bd6caa7aedaf253.png", "available": 500, "appActPrice": 3, "itemId": "8304F71FC6FC4DCC800C3E42DECF6AC8" }, { "itemSize": "1排", "itemName": "绿箭", "actItemId": "1613474D889E450AA9E79366F5D8DDD0", "imageUrl": "http://www.520coding.com/img/7/6/15/4/440e90c5cb014da5bc72d6d3c57ed0c8.png", "available": 500, "appActPrice": 2, "itemId": "A004F7C6FDCD461295DA0ADF35E6EEBC" }, { "itemSize": "1粒", "itemName": "5号高功率电池", "actItemId": "F3C2B5041D8B41D28B4A17DA1308886F", "imageUrl": "http://www.520coding.com/img/3/3/5/10/f9be90112baf4eb5938eb48d7178e953.png", "available": 500, "appActPrice": 1, "itemId": "9F99D391F0644558A046BCE164FB9821" } ], "pageActId": "A89AF0A68239485EAD156C9723C4DFD6" } ], "categoryShowList": [ [ { "categoryName": "香烟代购", "imageUrl": "http://www.520coding.com/img/10/11/1/3/e4b4ae044e49479a8eca4545dc29ea9e.png", "categoryId": "F8710346AF7F4DA7890FD25567BAC827" }, { "categoryName": "进口商品", "imageUrl": "http://www.520coding.com/img/1/6/11/14/ecf0464b7de14f57bcbc3ce84ce63d85.png", "categoryId": "D1D393D6618A409284E005814A33D2B5" }, { "categoryName": "文具", "imageUrl": "http://www.520coding.com/img/14/15/14/5/6dfa85257c484e78be2e6c8a9abad1be.png", "categoryId": "B6F051BECBB74AF693C4B522FBF0B511" }, { "categoryName": "粮油", "imageUrl": "http://www.520coding.com/img/13/2/9/0/70f186bc045741ffb098a75edcfbf8b5.png", "categoryId": "BA292BA79F83486FB217C5A725500330" }, { "categoryName": "零食", "imageUrl": "http://www.520coding.com/img/14/7/14/5/419a74748b054dc8b7eecfc0e28d2143.png", "categoryId": "7544E9E8BC704124BF646E05CC4F5AE4" }, { "categoryName": "饮料", "imageUrl": "http://www.520coding.com/img/6/6/12/15/844df1cb19254ab49d098f65b7193a74.png", "categoryId": "4036E0A46CC647318AB025F7C1E2F850" }, { "categoryName": "酒类", "imageUrl": "http://www.520coding.com/img/14/10/7/4/aba229e375014f3d984c5b941f276122.png", "categoryId": "21B122C4C4E340AFB3636CDEE626AAD6" }, { "categoryName": "日用", "imageUrl": "http://www.520coding.com/img/3/8/12/2/76f99dcc9d2c417d9d260f80e0d44be6.png", "categoryId": "55F73BD479604FF192A1DBA1949AF7D3" } ], [ { "categoryName": "奶制品", "imageUrl": "http://www.520coding.com/img/13/2/12/3/dd7224d40438422da58d83b676dd118e.png", "categoryId": "31EC6881BBB843F5B4CDED7E4A59F165" } ] ], "carouselList": [ { "imageUrl": "http://www.520coding.com/img/6/14/8/3/9aefc882a0d54568a4b0c14aa8e5e5af.png", "targetUrl": "http://www.520coding.com/img/1/0/4/1/d784ef9074a5450f8a0145b47c58f41d.png", "carouselId": "5A93FBCC8DB344AE9116FA4005386703" }, { "imageUrl": "http://www.520coding.com/img/10/8/6/10/ca02cf7e794f42db89ab1b22a1403e53.png", "targetUrl": "http://www.520coding.com/img/8/1/11/3/99efe120939c4b73b2faad839d0accc0.png", "carouselId": "857CA43ADD404D70909FFEE1BE5F6863" } ] } });

Mock.mock(/\/open\/captcha.do/,{
    "code": 200,
    "msg": "处理成功",
    "result": []
});

/* 商品模块 */
Mock.mock(/\/category\/getSubCategory.do/,{ "code": 200, "msg": "处理成功", "result": [ { "categoryName": "空腔护理", "categoryId": "14FEDA1C575742AEBE11A9E2859D69A7" }, { "categoryName": "纸巾湿巾", "categoryId": "A0E4C46454BE4F9493E11DF031B18776" }, { "categoryName": "洗发沐浴", "categoryId": "AB42F90DB96D424C8A4219E99CC939E5" } ] });
Mock.mock(/\/open\/queryItemByCategoryId.do/,{ "code": 200, "msg": "处理成功", "result": [ { "itemSize": "10片", "itemName": "榄菊蚊香", "imageUrl": "http://www.520coding.com/img/11/9/13/0/a0c51be7ff5d4f629bc0eda410bfaed1.png", "available": 500, "appActPrice": 3, "itemId": "039450E9FB5F41C2A1B731D727C3D798" }, { "itemSize": "438g", "itemName": "高富力", "imageUrl": "http://www.520coding.com/img/3/3/1/7/a3f813f4c3204932a06d9cb8f2e922a6.png", "available": 500, "appActPrice": 5, "itemId": "F0E1D37F3D3E4AD7BAED6C1CE98D957D" }, { "itemSize": "10片", "itemName": "超威蚊香", "imageUrl": "http://www.520coding.com/img/15/9/3/11/30202ba04b9e43569e224c60f1c40d9d.png", "available": 500, "appActPrice": 3, "itemId": "65BEC98A4DF041F2860DAEFE81301198" }, { "itemSize": "1粒", "itemName": "5号高功率电池", "imageUrl": "http://www.520coding.com/img/3/3/5/10/f9be90112baf4eb5938eb48d7178e953.png", "available": 500, "appActPrice": 1, "itemId": "9F99D391F0644558A046BCE164FB9821" }, { "itemSize": "13g", "itemName": "金芙钎麦（牛奶味）", "imageUrl": "http://www.520coding.com/img/4/9/15/8/a0b23a78859a49c08f192f25f2403a5a.png", "available": 500, "appActPrice": 0.5, "itemId": "647CCF66E6A64B55BCAB2935B3B9E7C5" }, { "itemSize": "300g", "itemName": "高富力300", "imageUrl": "http://www.520coding.com/img/8/15/7/6/3d914528be054ce092734e39a1cdfd35.png", "available": 500, "appActPrice": 3.5, "itemId": "1D85995704F341B9948CB9D2B2A9EE4D" }, { "itemSize": "10片", "itemName": "正点蚊香", "imageUrl": "http://www.520coding.com/img/8/1/7/7/d401a1a32d7346a89f1f993672718af1.png", "available": 500, "appActPrice": 3, "itemId": "FEDA97CA1CF645E8BEC5B3B3FD832840" }, { "itemSize": "一盒", "itemName": "宾王扑克", "imageUrl": "http://www.520coding.com/img/10/2/14/4/3ed3d32fd68b4a39892ff8e42ed67910.png", "available": 500, "appActPrice": 2, "itemId": "E214EEBF2D734FFB822CFAE023B18C8A" }, { "itemSize": "1盒", "itemName": "钓鱼扑克", "imageUrl": "http://www.520coding.com/img/5/11/0/10/55fe6b3ca1544e81a0bf716cce45cdf7.png", "available": 500, "appActPrice": 2, "itemId": "422B761D75DB43E9A131BD0465D50AF0" }, { "itemSize": "10片", "itemName": "黑猫神蚊香", "imageUrl": "http://www.520coding.com/img/12/7/11/13/06cbf10d98dd4567b7e2e3a0b95e2fb4.png", "available": 500, "appActPrice": 3, "itemId": "844EACA57BD0456DAE2FFF92D0DF9FEC" } ] });
Mock.mock(/\/open\/queryItemByItemId.do/,{ "code": 200, "msg": "处理成功", "result": { "itemSize": "300g", "itemName": "高富力300", "imageUrl": "http://www.520coding.com/img/8/15/7/6/3d914528be054ce092734e39a1cdfd35.png", "available": 500, "appActPrice": 3.5, "itemId": "1D85995704F341B9948CB9D2B2A9EE4D" } });
Mock.mock(/\/shoppingCart\/putIntoCart.do/,{cartItemNums:10});
Mock.mock(/\/shoppingCart\/updateCart.do/,{
    "code": 200,
    "msg": "处理成功",
    "result": []
});

/* 订单详情 */
Mock.mock(/\/order\/queryOrder.do/,{
    "code": 200,
    "msg": "处理成功",
    "result": [
        {   "city":"广州市",
            "detailAddr": "棠东东路110号6楼",
            "details": [
                {
                    "itemId": "098165777A984FA8868140A28C86D121",
                    "itemName": "硬盒双喜",
                    "nums": 1,
                    "orderId": "CB5E8D8046814B52A57CFA82869ADC56",
                    "remarks": "退货订单",
                    "salePrice": 6
                },
                {
                    "itemId": "1737453EF7A94E9AB73FC3FD51E1B0AE",
                    "itemName": "330ml百威啤酒",
                    "nums": 1,
                    "orderId": "CB5E8D8046814B52A57CFA82869ADC56",
                    "remarks": "退货订单",
                    "salePrice": 6
                }
            ],
            "orderActAmount": 11,
            "orderAmount": 11,
            "orderId": "CB5E8D8046814B52A57CFA82869ADC56",
            "orderNo": "DMD000002-16080100004",
            "payStatus": "已付款",
            "payTime": "2016-08-01 21:29:30",
            "payWay": "支付宝支付",
            "receivePhone": "13922302431",
            "receiver": "温生",
            "remarks": "退货订单"
        }
    ]
});
Mock.mock(/\/order\/queryOrderStatus.do/,{
    "code": 200,
    "msg": "处理成功",
    "result": [
        {
            "createTime": "10-06 18:20",
            "ordStaId": "386420AD721E42ECB219273CE7968AB8",
            "ordStatus": "下单成功",
            "orderId": "AX7E8D8046814B52A57CFA82869ADC43"
        },
        {
            "createTime": "10-06 18:20",
            "ordStaId": "4405C22165E24646A8393E09168C4CF9",
            "ordStatus": "商家接单",
            "orderId": "AX7E8D8046814B52A57CFA82869ADC43"
        },
        {
            "createTime": "10-06 18:21",
            "ordStaId": "C6476B8FC80B4D9B8999213519AC1AC8",
            "ordStatus": "配送员成成配送",
            "orderId": "AX7E8D8046814B52A57CFA82869ADC43"
        },
        {
            "createTime": "10-06 18:21",
            "ordStaId": "FB070D605D3C4B70B505B9B360D9098E",
            "ordStatus": "订单完成",
            "orderId": "AX7E8D8046814B52A57CFA82869ADC43"
        }
    ]
});
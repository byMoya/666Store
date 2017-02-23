/**
 * 
 * @authors dong (you@example.org)
 * @date    2016-10-15 23:02:31
 * @version $Id$
 */

/**
 * [debug description 微信配置]
 * @type {Boolean}
 */

// wx.config({
//     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//     appId: '', // 必填，公众号的唯一标识
//     timestamp: (new Date()).getTime(), // 必填，生成签名的时间戳
//     nonceStr: '', // 必填，生成签名的随机串
//     signature: '',// 必填，签名，见附录1
//     jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
// });

wxSingle = {
	/* 微信支付 */
	isWX:window.WeixinJSBridge,
	args:null,
	onBridgeReady:function(callback){
		WeixinJSBridge.invoke(  
           'getBrandWCPayRequest',wxSingle.args,function(res){       
                if(res.err_msg == "get_brand_wcpay_request:ok" ){  
                   alert("支付成功");
                   if(callback){
                      callback();
                   }  
                }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。   
           }  
       );  
	},
	pay:function(callback){
		if (typeof WeixinJSBridge == "undefined"){  
           if( document.addEventListener ){  
               document.addEventListener('WeixinJSBridgeReady',this.onBridgeReady,false);  
           }else if (document.attachEvent){  
               document.attachEvent('WeixinJSBridgeReady',this.onBridgeReady);   
               document.attachEvent('onWeixinJSBridgeReady',this.onBridgeReady);  
           }  
        }else{  
           this.onBridgeReady(callback);  
        }  
	}
};
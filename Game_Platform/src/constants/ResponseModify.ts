  /**
	* 发出请求需要得到响应后处理的消息
	* by james
	* (c) copyright 2018 - 2035
	* All Rights Reserved. 
	* 包括 角色UI、主功能、活动等等
    */
class ResponseModify {
	
	public constructor() {
	}


	//验证码成功
	public static SUCCESS_REQUESTCODE_RESPONSE: string = "RESPONSEMODIFY_SUCCESS_REQUESTCODE_RESPONSE";
	//重置密码成功
	public static SUCCESS_RESETPASSWORD_RESPONSE : string = "RESPONSEMODIFY_SUCCESS_RESETPASSWORD_RESPONSE";
	//存取金币成功
	public static SUCCESS_OPERATORMONEY_RESPONSE : string = "SUCCESS_OPERATORMONEY_RESPONSE";
	//更换头像成功
	public static SUCCESS_CHANGEHEADICON_RESPONSE : string = "SUCCESS_CHANGEHEADICON_RESPONSE";
	//重设昵称成功
	public static SUCCESS_RESETNAME_RESPONSE : string = "SUCCESS_RESETNAME_RESPONSE";
	//请求排行数据返回
	public static REQUEST_RANKING_RESPONSE : string = "REQUEST_RANKING_RESPONSE";
	//收款账号绑定成功
	public static SUCCESS_SETUPBANK_RESPONSE : string = "SUCCESS_SETUPBANK_RESPONSE";
	//兑换成功
	public static SUCCESS_EXCHANGE_RESPONSE : string = "SUCCESS_EXCHANGE_RESPONSE";
	//请求兑换记录返回
	public static RQEUEST_EXCHANGERECODE_RESPONSE : string = "RQEUEST_EXCHANGERECODE_RESPONSE";
	//注册成功
	public static SUCCESS_REG_RESPONSE : string = "SUCCESS_REG_RESPONSE";
	//获取验证码成功
	public static OPEN_CODE_TIPS_INFO : string = "OPEN_CODE_TIPS_INFO";
}
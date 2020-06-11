/**
  * 注册controller
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

  export class ControllerPrepCommand extends puremvc.SimpleCommand implements puremvc.ICommand {

    public constructor() {
      super();
    }
    public execute(notification: puremvc.INotification): void {
      egret.log("ControllerPrepCommand begin");
      (new LoginManager()).register();
      //服务器返回command
      (new Processor_10001()).register();
      (new Processor_10002()).register();
      (new Processor_10003()).register();
      (new Processor_10004()).register();
      (new Processor_20001()).register();
      (new Processor_20002()).register();
      (new Processor_20003()).register();
      (new Processor_20004()).register();
      (new Processor_20005()).register();
      (new Processor_20006()).register();
      (new Processor_20007()).register();
      (new Processor_20008()).register();
      (new Processor_20009()).register();
      (new Processor_20010()).register();
      (new Processor_20011()).register();
      (new Processor_20012()).register();
      (new Processor_20013()).register();
      (new Processor_20014()).register();
      (new Processor_20015()).register();
      (new Processor_20016()).register();
      (new Processor_20018()).register();
      //  平三张
      (new Processor_30001()).register();
      (new Processor_30004()).register();
      (new Processor_30005()).register();
      (new Processor_30006()).register();
      (new Processor_60008()).register();

      //战绩查询
      (new Processor_30007()).register();
      (new Processor_30008()).register();
      (new Processor_30009()).register();
      (new Processor_30010()).register();
      //玩家的历史记录
      (new Processor_30012()).register();


      (new Processor_70001()).register();
      (new Processor_70002()).register();
      (new Processor_70003()).register();
      (new Processor_70005()).register();
      (new Processor_70006()).register();
      (new Processor_70008()).register();
      (new Processor_70009()).register();
      (new Processor_70010()).register();
      (new Processor_70011()).register();
      (new Processor_70012()).register();
      // 抢压牛牛
      (new Processor_100001()).register();
      (new Processor_100002()).register();
      (new Processor_100003()).register();
      (new Processor_100004()).register();
      (new Processor_100005()).register();
      (new Processor_100006()).register();
      (new Processor_100007()).register();
      (new Processor_100008()).register();
      (new Processor_100009()).register();
      //百人牛牛
      (new Processor_90001()).register();
      (new Processor_90002()).register();
      (new Processor_90003()).register();
      (new Processor_90004()).register();
      (new Processor_90005()).register();
      (new Processor_90006()).register();
      (new Processor_90007()).register();
      (new Processor_90009()).register();
      (new Processor_90010()).register();
      (new Processor_90011()).register();
      // 斗地主
      (new Processor_60001()).register();
      (new Processor_60002()).register();
      (new Processor_60003()).register();
      (new Processor_60005()).register();
      (new Processor_60006()).register();
      (new Processor_60007()).register();
      //龙虎大战
      (new Processor_80001()).register();
      (new Processor_80002()).register();
      (new Processor_80003()).register();
      (new Processor_80004()).register();
      (new Processor_80005()).register();
      (new Processor_80006()).register();
      (new Processor_80007()).register();
      (new Processor_80008()).register();
      (new Processor_80009()).register();
      (new Processor_80010()).register();
      //红黑大战
      (new Processor_130001()).register();
      (new Processor_130002()).register();
      (new Processor_130003()).register();
      (new Processor_130004()).register();
      (new Processor_130005()).register();
      (new Processor_130006()).register();
      (new Processor_130007()).register();
      (new Processor_130008()).register();
      (new Processor_130009()).register();
      (new Processor_130010()).register();
      //百家乐
      (new Processor_140001()).register();
      (new Processor_140002()).register();
      (new Processor_140003()).register();
      (new Processor_140004()).register();
      (new Processor_140005()).register();
      (new Processor_140006()).register();
      (new Processor_140007()).register();
      (new Processor_140008()).register();
      (new Processor_140009()).register();
      (new Processor_140010()).register();
      // 跑得快
      (new Processor_50001()).register();
      (new Processor_50002()).register();
      (new Processor_50003()).register();
      (new Processor_50004()).register();
      (new Processor_50005()).register();
      // 糖果排队
      (new Processor_170001()).register();
      (new Processor_170002()).register();
      (new Processor_170003()).register();
      (new Processor_170004()).register();
      (new Processor_170005()).register();
      (new Processor_170006()).register();
      // 德州扑克
      (new Processor_110001()).register();
      (new Processor_110002()).register();
      (new Processor_110003()).register();
      (new Processor_110004()).register();
      (new Processor_110005()).register();
      (new Processor_110006()).register();
      //二人麻将
      (new Processor_40001()).register();
      (new Processor_40002()).register();
      (new Processor_40003()).register();
      (new Processor_40004()).register();
      (new Processor_40005()).register();

      (new Processor_150001()).register();
      (new Processor_150002()).register();
      (new Processor_150003()).register();
      (new Processor_150004()).register();
      (new Processor_150005()).register();
      (new Processor_150006()).register();
      (new Processor_150009()).register();
      (new Processor_150010()).register();

      (new Processor_160001()).register();
      (new Processor_160002()).register();
      (new Processor_160003()).register();
      (new Processor_160004()).register();
      (new Processor_160005()).register();
      (new Processor_160006()).register();
      (new Processor_160007()).register();

      (new Processor_180001()).register();
      (new Processor_180002()).register();
      (new Processor_180003()).register();
      (new Processor_180004()).register();
      (new Processor_180005()).register();
      (new Processor_180006()).register();

      //骰宝
      (new Processor_190001()).register();
      (new Processor_190002()).register();
      (new Processor_190003()).register();
      (new Processor_190004()).register();
      (new Processor_190005()).register();
      (new Processor_190006()).register();
      (new Processor_190007()).register();
      (new Processor_190008()).register();
      (new Processor_190009()).register();
      (new Processor_190010()).register();

      // 奔驰宝马
      (new Processor_200001()).register();
      (new Processor_200002()).register();
      (new Processor_200003()).register();
      (new Processor_200004()).register();
      (new Processor_200005()).register();
      (new Processor_200006()).register();
      (new Processor_200007()).register();
      (new Processor_200008()).register();
      (new Processor_200009()).register();
      (new Processor_200010()).register();
      (new Processor_200011()).register();
      //飞禽走兽
      (new Processor_210001()).register();
      (new Processor_210002()).register();
      (new Processor_210003()).register();
      (new Processor_210004()).register();
      (new Processor_210005()).register();
      (new Processor_210006()).register();
      (new Processor_210007()).register();
      (new Processor_210008()).register();
      (new Processor_210009()).register();
      (new Processor_210010()).register();
      (new Processor_210011()).register();

      egret.log("ControllerPrepCommand end");
    }
  }
}

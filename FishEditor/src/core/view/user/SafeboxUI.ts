enum OperatorType
{
	save = 1,
	get = 2
}
class SafeboxUI extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}
	private type : OperatorType = OperatorType.save;
	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}
	
	public closeBtn : IButton;
	public operatorBtn : IButton;
	public maxNumBtn : IButton;
	public minNumBtn: IButton;
	public clearNumBtn : IButton;
	public getLabel : eui.Label;
	public saveLabel : eui.Label;
	public currGoldNumLabel : eui.BitmapLabel;
	public bankGoldNumLabel : eui.BitmapLabel;
	public bankSlider : eui.HSlider;
	public bankProgress : eui.ProgressBar;
	private cunSelectBtn:eui.Button;
	private quSelectBtn:eui.Button;
	private cunBtn:eui.Button;
	private quBtn:eui.Button;
	
	public opratorGoldInput : EditText;

	private curOper:OperatorType = OperatorType.save;

	private refreshBtnStatus(isCun:boolean = false):void {
		if(isCun) {
			this.cunSelectBtn.visible = true;
			this.quBtn.visible = true;
			this.cunBtn.visible = false;
			this.quSelectBtn.visible = false;
		} else {
			this.cunSelectBtn.visible = false;
			this.quBtn.visible = false;
			this.cunBtn.visible = true;
			this.quSelectBtn.visible = true;
		}
		this.onRadioChange();
	} 

	protected childrenCreated():void
	{
		super.childrenCreated();
		var radioGroup:eui.RadioButtonGroup = new eui.RadioButtonGroup();
		
		this.operatorBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onOperator , this);
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.closePanel , this);
		this.maxNumBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onMaxNum , this);
		this.minNumBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onMinNum , this);
		this.clearNumBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onClearNum , this);

		this.cunBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cunBtnClick, this);
		this.quBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.quBtnClick, this);

		this.opratorGoldInput.addEventListener(egret.TouchEvent.CHANGE , this.onInputChange , this)
		this.bankSlider.addEventListener(eui.UIEvent.CHANGE , this.onSliderChange , this );
		this.opratorGoldInput.resetTipContent();
		this.opratorGoldInput.editInput.text = "";
		this.saveLabel.visible = true;
		this.getLabel.visible = false;

		this.refreshBtnStatus(true);
		
	}

	private cunBtnClick():void {
		this.curOper = OperatorType.save
		this.refreshBtnStatus(true);
	}

	private quBtnClick():void {
		this.curOper = OperatorType.get
		this.refreshBtnStatus(false);
	}

	public initUI()
	{
		this.resetValue(game.UserService.instance.money , game.UserService.instance.bankMoney);
	}
	private onOperator(event : egret.TouchEvent)
	{
		var opratorNum = Number(this.opratorGoldInput.editInput.text);
		if(opratorNum == 0)
		{
			return;
		}
		UserRequest.sendOperatorMoney(<number>this.type , opratorNum);
	}

	private onMaxNum()
	{
		if(this.type == OperatorType.save)
		{
			var money =Math.floor(game.UserService.instance.money);
			this.resetValue(game.UserService.instance.money-money , game.UserService.instance.bankMoney + money);
			// this.resetValue(0 , game.UserService.instance.money + game.UserService.instance.bankMoney);
		}else
		{
			this.resetValue(game.UserService.instance.money + game.UserService.instance.bankMoney , 0);
		}
	}

	private onMinNum() {
		if(this.type == OperatorType.save)
		{
			if(game.UserService.instance.money>=1){
				this.resetValue(game.UserService.instance.money-1,game.UserService.instance.bankMoney +1);
			}else{
				this.resetValue(game.UserService.instance.money,game.UserService.instance.bankMoney );
			}
			// this.resetValue(game.UserService.instance.bankMoney + game.UserService.instance.money,0);
		}else
		{	
			if(game.UserService.instance.bankMoney>=1){
				this.resetValue(game.UserService.instance.money+1,game.UserService.instance.bankMoney -1);
			}else{
				this.resetValue(game.UserService.instance.money,game.UserService.instance.bankMoney );
			}
			// this.resetValue(0, game.UserService.instance.money + game.UserService.instance.bankMoney);
		}
	}

	private onClearNum()
	{
		this.resetValue(game.UserService.instance.money , game.UserService.instance.bankMoney);
	}
	private tempCurrGold : number;
	// private 
	private onRadioChange()
	{
		if(this.curOper == OperatorType.save)
		{
			this.operatorBtn.updateImageLabel("gp_btn_cun");
			this.saveLabel.visible = true;
			this.getLabel.visible = false;
			this.resetValue(game.UserService.instance.money , game.UserService.instance.bankMoney);
			this.opratorGoldInput.resetTipContent();
			this.opratorGoldInput.editInput.text = "";
			// this.bankSlider.value = this.bankProgress.value = 0;
			this.type = OperatorType.save;
		}
		else
		{
			this.operatorBtn.updateImageLabel("gp_btn_qu");
			this.saveLabel.visible = false;
			this.getLabel.visible = true;
			this.resetValue(game.UserService.instance.money , game.UserService.instance.bankMoney);
			this.opratorGoldInput.resetTipContent();
			this.opratorGoldInput.editInput.text = "";
			// this.bankSlider.value = this.bankProgress.value = 0;
			this.type = OperatorType.get;
		}
	}

	private resetValue(currGoldNum : number , bankGoldNum : number) : void
	{
		this.currGoldNumLabel.text = currGoldNum.toFixed(2);
		this.bankGoldNumLabel.text = bankGoldNum.toFixed(2);
		var changeNum = 0;
		var showNum = 0;
		if(this.type == OperatorType.save)
		{
			showNum = (game.UserService.instance.money - currGoldNum);
			changeNum = showNum / game.UserService.instance.money;
			
		}
		else
		{
			showNum = (game.UserService.instance.bankMoney - bankGoldNum);
			changeNum =  showNum / game.UserService.instance.bankMoney;
		}
		if(changeNum == 0)
		{
			this.bankSlider.value = this.bankProgress.value = 0;
			this.opratorGoldInput.editInput.text = "";
			this.opratorGoldInput.resetTipContent();
		}else
		{
			this.bankSlider.value = this.bankProgress.value = Math.floor(changeNum * 100);
			this.opratorGoldInput.editInput.text = showNum.toFixed(0);
			this.opratorGoldInput.resetTipContent("");
		}
	}

	private onSliderChange(event : eui.UIEvent)
	{
		if(this.type == OperatorType.save)
		{
			var changeNum = Math.floor((this.bankSlider.value / 100) * game.UserService.instance.money);
			this.resetValue(game.UserService.instance.money - changeNum , game.UserService.instance.bankMoney + changeNum);
		}
		else
		{
			var changeNum = Math.floor((this.bankSlider.value / 100) * game.UserService.instance.bankMoney);
			this.resetValue(game.UserService.instance.money + changeNum , game.UserService.instance.bankMoney - changeNum);
		}
		this.bankProgress.value = this.bankSlider.value;
		
	}

	private onInputChange(event : eui.UIEvent)
	{
		var changeNum = Number(this.opratorGoldInput.editInput.text);
		this.opratorGoldInput.editInput.text = changeNum.toString();
		if(changeNum <= 0)
		{
			this.opratorGoldInput.editInput.text = "0";
			return;
		}
		if(!RegUtils.isNumber(this.opratorGoldInput.editInput.text))
		{
			this.opratorGoldInput.editInput.text = "0";
			this.resetValue(game.UserService.instance.money , game.UserService.instance.bankMoney);
			return;
		}
		if(this.type == OperatorType.save)
		{
			if(changeNum > game.UserService.instance.money)
			{
				changeNum = Math.floor(game.UserService.instance.money);
				this.opratorGoldInput.editInput.text = changeNum.toString();
			}
			this.resetValue(game.UserService.instance.money - changeNum , game.UserService.instance.bankMoney + changeNum);
		}
		else
		{
			if(changeNum > game.UserService.instance.bankMoney)
			{
				changeNum = Math.floor(game.UserService.instance.bankMoney);
				this.opratorGoldInput.editInput.text = changeNum.toString();
			}
			this.resetValue(game.UserService.instance.money + changeNum , game.UserService.instance.bankMoney - changeNum);
		}
	}

	private closePanel(event : egret.TouchEvent)
	{
		PopUpManager.removePopUp(this , 1);
	}
}
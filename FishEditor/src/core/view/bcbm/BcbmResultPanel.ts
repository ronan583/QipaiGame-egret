module game.bcbm {
	export class BcbmResultPanel extends ResizePanel implements eui.UIComponent{
		public constructor(iswin: boolean) {
			super();
			this.isWin = iswin;
			this.skinName = "resource/eui_skins/bcbm/BcbmResultPanel.exml"
			this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirm, this);
			this.listBgArr = [this.selfBg, this.bankerBg, this.plistBg0, this.plistBg1, this.plistBg2, this.plistBg3, this.plistBg4];
			this.listIconArr = [this.plistIcon0, this.plistIcon1, this.plistIcon2, this.plistIcon3, this.plistIcon4];
			this.listNameArr = [this.plistName0, this.plistName1, this.plistName2, this.plistName3, this.plistName4];
			this.listResultArr = [this.plistResult0, this.plistResult1, this.plistResult2, this.plistResult3, this.plistResult4];
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}	


		public resultBg: eui.Image;
		public winloseImg: eui.Image;
		public carImg: eui.Image;
		public carIcon: eui.Image;
		public multiResult: eui.Image;

		public selfResultImg: eui.Image;

		private selfBg: eui.Image;
		private bankerBg: eui.Image;
		private plistBg0: eui.Image;
		private plistBg1: eui.Image;
		private plistBg2: eui.Image;
		private plistBg3: eui.Image;
		private plistBg4: eui.Image;
		private listBgArr: eui.Image[];

		private selfIcon: eui.Image;
		private bankerIcon: eui.Image;
		private plistIcon0: eui.Image;
		private plistIcon1: eui.Image;
		private plistIcon2: eui.Image;
		private plistIcon3: eui.Image;
		private plistIcon4: eui.Image;
		private listIconArr: eui.Image[];

		private selfName: eui.Label;
		private bankerName: eui.Label;
		private plistName0: eui.Label;
		private plistName1: eui.Label;
		private plistName2: eui.Label;
		private plistName3: eui.Label;
		private plistName4: eui.Label;
		private listNameArr: eui.Label[];

		private selfResult: eui.BitmapLabel;
		private bankerResult: eui.BitmapLabel;
		private plistResult0: eui.BitmapLabel;
		private plistResult1: eui.BitmapLabel;
		private plistResult2: eui.BitmapLabel;
		private plistResult3: eui.BitmapLabel;
		private plistResult4: eui.BitmapLabel;
		private listResultArr: eui.BitmapLabel[];
		
		private confirmBtn: IButton;
		private animResultW: DragonAnim;
		private animResultL: DragonAnim;

		public isWin: boolean;


		protected childrenCreated(): void{
			super.childrenCreated();
		}

		public initPanel(winType, cityArr: Array<string>, costMoneyArr: Array<number>, cityArr2: Array<string>, costMoneyArr2: Array<number>){
			//console.warn("------ initPanel ", this.isWin);
			//bcbmsound result
			this.initTheme(winType, costMoneyArr);
			this.initPlayerList(cityArr, costMoneyArr, cityArr2, costMoneyArr2);
			egret.setTimeout(this.showAnim, this, 200);
		}

		public showAnim(){
			//console.warn("------ showAnim ", this.isWin);
			if(this.isWin){
				this.animResultL.visible = false;
				this.animResultW.visible = true;
				this.animResultW.playerOnce(()=>{
					this.animResultW.playAnim("idle");
					//bcbmsound youwin
				}, this, "start");
			}
			else {
				this.animResultL.visible = true;
				this.animResultW.visible = false;
				this.animResultL.playerOnce(()=>{
					this.animResultL.playAnim("idle");
					//bcbmsound you lose
				}, this, "start");
			}


		}

		public initTheme(type: number, costMoneyArr: Array<number>){
			let multiName: string;	//倍数图案资源名
			if(this.isWin){
				this.winloseImg.source = "bcbm_result_youwin";
				this.resultBg.source = "bcbm_result_youwinbg";
				for(let i = 0; i < this.listBgArr.length; i++){
					if(i < 2){
						this.listBgArr[i].source = "bcbm_result_youwinbg1";
					} else {
						this.listBgArr[i].source = "bcbm_result_youwinbg2";	
						this.listIconArr[i-2].source = "bcbm_result_w" + (i-1);		
						//todo 输赢金额的字体和前五玩家名字颜色待定			
					}
				}
				multiName = "w";
				this.bankerResult.font = "vbcbm_result_type1_fnt";
				this.selfResult.font = "vbcbm_result_type1_fnt";
				for(let resultLabel of this.listResultArr){
					resultLabel.font = "vbcbm_result_win_rank_fnt";
				}
				for(let name of this.listNameArr){
					name.textColor = 0xB97FF0;
				}
			} else{
				this.winloseImg.source = "bcbm_result_youlose";						
				this.resultBg.source = "bcbm_result_youlosebg";
				for(let i = 0; i < this.listBgArr.length; i++){
					if(i < 2){
						this.listBgArr[i].source = "bcbm_result_youlosebg1";
					} else {
						this.listBgArr[i].source = "bcbm_result_youlosebg2";						
							this.listIconArr[i-2].source = "bcbm_result_l" + (i-1);
						//todo 输赢金额的字体和前五玩家名字颜色待定			
					}
				}
				multiName = "l";
				this.bankerResult.font = "vbcbm_result_type2_fnt";
				this.selfResult.font = "vbcbm_result_type2_fnt";
				for(let resultLabel of this.listResultArr){
					resultLabel.font = "vbcbm_result_lost_rank_fnt";
				}
				for(let name of this.listNameArr){
					name.textColor = 0x9AD7F9;
				}
			}
			if(costMoneyArr[0] >= 0){
				console.error("bank win")
				this.bankerResult.font = "vbcbm_result_type1_fnt";
			} else{
				console.error("bank lose")
				this.bankerResult.font = "vbcbm_result_type2_fnt";
			}
			if(costMoneyArr[1] >= 0){
				console.error("self win")
				this.selfResult.font = "vbcbm_result_type1_fnt";
			} else{
				console.error("self lose")
				this.selfResult.font = "vbcbm_result_type2_fnt";
			}
		// 1.大保时捷 2.小保时捷 3.大奔驰 4.小奔驰  5.大宝马  6.小宝马  7.大大众 8.小大众		
			if(type < 2) {
				this.carIcon.source = "bcbm_caricon_bsj6";
				this.carImg.source = "bcbm_result_carbsj";
				this.multiResult.source = "bcbm_result_mutiple40" + multiName;
			} else if(type < 3){
				this.carIcon.source = "bcbm_caricon_bsj6";
				this.carImg.source = "bcbm_result_carbsj";
				this.multiResult.source = "bcbm_result_mutiple5" + multiName;
			} else if(type < 4){
				this.carIcon.source = "bcbm_caricon_benz6";
				this.carImg.source = "bcbm_result_carbenz";
				this.multiResult.source = "bcbm_result_mutiple30" + multiName;
			} else if(type < 5){
				this.carIcon.source = "bcbm_caricon_benz6";
				this.carImg.source = "bcbm_result_carbenz";
				this.multiResult.source = "bcbm_result_mutiple5" + multiName;
			}else if(type < 6){
				this.carIcon.source = "bcbm_caricon_bmw6";
				this.carImg.source = "bcbm_result_carbmw";
				this.multiResult.source = "bcbm_result_mutiple20" + multiName;
			}else if(type < 7){
				this.carIcon.source = "bcbm_caricon_bmw6";
				this.carImg.source = "bcbm_result_carbmw";
				this.multiResult.source = "bcbm_result_mutiple5" + multiName;
			}else if(type < 8){
				this.carIcon.source = "bcbm_caricon_vw6";
				this.carImg.source = "bcbm_result_carvw";
				this.multiResult.source = "bcbm_result_mutiple10" + multiName;
			}else if(type < 9){
				this.carIcon.source = "bcbm_caricon_vw6";
				this.carImg.source = "bcbm_result_carvw";
				this.multiResult.source = "bcbm_result_mutiple5" + multiName;
			}
		}

		public initPlayerList(cityArr:Array<string>, moneyArr:Array<number>, cityArr2:Array<string>, moneyArr2:Array<number>){
			if(!cityArr || !moneyArr || !cityArr2 || !moneyArr2){
				return;
			}
			//自己的金额
			if(moneyArr[1] == 0){
				this.selfResult.visible = false;
				this.selfResultImg.visible = true;
			} else {
				this.selfResult.visible = true;
				this.selfResultImg.visible = false;
				this.selfResult.text = moneyArr[1] + "";
				if(moneyArr[1] > 0){
					this.selfResult.text = "+" + this.selfResult.text;
				}
			}
			this.selfName.text = this.subText(cityArr[1]);
			//庄家的金额
			this.bankerResult.text = moneyArr[0] + "";
			if(moneyArr[0] > 0){
				this.bankerResult.text = "+" + this.bankerResult.text;
			}
			this.bankerName.text = this.subText(cityArr[0]);

			for(let i = 0; i < cityArr2.length; i++){
				//超过长度使用substring处理
				this.listNameArr[i].text = this.subText(cityArr2[i]);
				//正负号待处理
			}
			for(let i = 0; i < 5; i++){
				if(moneyArr2[i] && cityArr2[i]){
					//超过长度使用substring处理
					//正负号待处理
					this.listNameArr[i].text = this.subText(cityArr2[i]);
					this.listResultArr[i].text = "+" + moneyArr2[i] + "";
					this.listNameArr[i].visible = true;
					this.listResultArr[i].visible = true;
				} else{
					this.listNameArr[i].visible = false;
					this.listResultArr[i].visible = false;					
				}

				
			}
		}

		private subText(text: string){
			if(text.length > 4){
				return text.substring(0,4) + "...";
			}else return text;
		}

		public stopAnim(){
			this.animResultL.stop();
			this.animResultL.visible = false;
			this.animResultW.stop();
			this.animResultW.visible = false;
		}

		private onConfirm(e: egret.TouchEvent){
			this.stopAnim();
			PopUpManager.removePopUp(this, 1);
		}
	}
}
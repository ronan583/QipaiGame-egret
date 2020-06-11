module game.tb {
	export class TbDiceBao extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
			this.skinName='resource/eui_skins/tb/TbDiceBaoSkin.exml';
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
		}
        // public tb_pedestal:eui.Image;
        // public tb_lid:eui.Image;
        public touzhiPoint : eui.Group;
        public animPoint : eui.Group;
        public pointLabel : eui.BitmapLabel;
        public typeLabel : eui.BitmapLabel;
        public dice1 : eui.Image;
        public dice2 : eui.Image;
        public dice3 : eui.Image;
        public resultGroup : eui.Group;
        public touzhiAnim : CommonDBLoop2;
        public startAnim : CommonDB;
        public stopAnim : CommonDB;
        public waitAnim : CommonDBLoop2;
        public recountAnim : CommonDB;
        public tbMc:egret.MovieClip;

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}
        protected childrenCreated():void
		{
			super.childrenCreated();
            this.initTbMC();
		}
        public updataDiceBao(data):void
        {

        }

        private onAdd() {
            this.resultGroup.scaleX = this.resultGroup.scaleY = 0;
        }

        public playStartAnim()
        {
            if(this.startAnim == null)
            {
                this.startAnim = new CommonDB("startAnim_ske_json","startAnim_tex_json","startAnim_tex_png","startAnim" ,1670);
            }else
            {
                this.startAnim.restartRunAnim();
            }
            this.animPoint.addChild(this.startAnim);
        }

        public playTouzhiAnim(diceNums)
        {
            this.showTouzhiAnim();
            TbSoundPlayer.instance.playShake();
            this.pointLabel.text = (diceNums[0] + diceNums[1] + diceNums[2]) + "点";
            this.touzhiAnim.setNewSlot("Layer5" , "diceGame_json.game_dice_image_result_yaoyiyao4.0_" + diceNums[0]);
            this.touzhiAnim.setNewSlot("Layer6" , "diceGame_json.game_dice_image_result_yaoyiyao4.0_" + diceNums[1]);
            this.touzhiAnim.setNewSlot("Layer7" , "diceGame_json.game_dice_image_result_yaoyiyao4.0_" + diceNums[2]);
            this.touzhiAnim.playOnce(1);
            let type = ""            
            if(diceNums[0] == diceNums[1] && diceNums[1] == diceNums[2])
			{
                type = "豹子";
			}else {
				let pointSum = diceNums[0] + diceNums[1] + diceNums[2];
				if(pointSum <= 10) {
                    type = "小";
				} else {
                    type = "大";
				}
            }
            this.typeLabel.visible = false;
            this.pointLabel.text = (diceNums[0] + diceNums[1] + diceNums[2]) + "点" + type;
            //隐藏整个动画
            /*
            this.registerTimeout(function(){
                this.touzhiPoint.removeChildren();
                this.resultGroup.visible = false;
                this.resultGroup.scaleX = this.resultGroup.scaleY = 0;
                if(darkSprite != null && this.contains(darkSprite))
                {
                    this.removeChild(darkSprite);
                }
            },5000);
            */
        }

        public showResult(diceNums:Array<number>) {
            this.resultGroup.visible = true;
            CommonUtil.setNextFrameCall(this.nextTickShow, this);
            this.dice1.source = "diceGame_json.game_dice_image_result_dice_" + diceNums[0];
            this.dice2.source = "diceGame_json.game_dice_image_result_dice_" + diceNums[1];
            this.dice3.source = "diceGame_json.game_dice_image_result_dice_" + diceNums[2];
            for(let i = 0 ; i < 3 ; i++)
            {
                this.registerTimeout(()=>{
                    TbSoundPlayer.instance.playSinglePoint(diceNums[i]);
                } , (i+1)*300);
            }
        }

        public showResultAnimDirect(diceNums:Array<number>) {
            this.showTouzhiAnim();
            
            try {
                this.touzhiAnim.setNewSlot("Layer5" , "diceGame_json.game_dice_image_result_yaoyiyao4.0_" + diceNums[0]);
                this.touzhiAnim.setNewSlot("Layer6" , "diceGame_json.game_dice_image_result_yaoyiyao4.0_" + diceNums[1]);
                this.touzhiAnim.setNewSlot("Layer7" , "diceGame_json.game_dice_image_result_yaoyiyao4.0_" + diceNums[2]);
            }catch(e) {
                
            }
            
            let type = ""
            this.touzhiAnim.showProgress(1);
            if(diceNums[0] == diceNums[1] && diceNums[1] == diceNums[2])
			{
                type = "豹子";
			}else {
				let pointSum = diceNums[0] + diceNums[1] + diceNums[2];
				if(pointSum <= 10) {
                    type = "小";
				} else {
                    type = "大";
				}
            }
            this.typeLabel.visible = false;
            this.pointLabel.text = (diceNums[0] + diceNums[1] + diceNums[2]) + "点" + type;
        }
        public showResultDircet(diceNums:Array<number>) {
            this.showTouzhiAnim();
            this.touzhiAnim.showProgress(1);
            this.resultGroup.visible = true;
            this.resultGroup.scaleX = this.resultGroup.scaleY = 1;
            this.dice1.source = "diceGame_json.game_dice_image_result_dice_" + diceNums[0];
            this.dice2.source = "diceGame_json.game_dice_image_result_dice_" + diceNums[1];
            this.dice3.source = "diceGame_json.game_dice_image_result_dice_" + diceNums[2];
        }

        public playTotalVoice(diceNums:Array<number>) {
            TbSoundPlayer.instance.playTotalPoint(diceNums[0] + diceNums[1] + diceNums[2]);
        }

        public playResultVoice(diceNums:Array<number>) {
            let type = 0;
            if(diceNums[0] == diceNums[1] && diceNums[1] == diceNums[2])
			{
                this.typeLabel.text = "豹子";
                type = 3;
			}else
			{
				let pointSum = diceNums[0] + diceNums[1] + diceNums[2];
				if(pointSum <= 10)
				{
                    this.typeLabel.text = "小";
                    type = 2;
				}else
				{
                    this.typeLabel.text = "大";
                    type = 1;
				}
			}
            TbSoundPlayer.instance.playResult(type);
        }

        public directEnd() {
            this.resultGroup.visible = false;
            this.resultGroup.scaleX = this.resultGroup.scaleY = 0;
            this.hideTouzhiAnim();
        }

        private nextTickShow()
        {
            //////////////////
            this.resultGroup.scaleX = this.resultGroup.scaleY = 0;
            egret.Tween.get(this.resultGroup).to({scaleX:1,scaleY:1}, 500);
        }

        public playRecountAnim()
        {
            if(this.recountAnim == null)
            {
                this.recountAnim = new CommonDB("recountAnim_ske_json","recountAnim_tex_json","recountAnim_tex_png","recountAnim" ,3020);
            }else
            {
                this.recountAnim.restartRunAnim();
            }
            this.animPoint.addChild(this.recountAnim);
        }

        public initTbMC(){
            this.touzhiAnim = new CommonDBLoop2("touzhiAnim_ske_json","touzhiAnim_tex_json","touzhiAnim_tex_png","touzhiAnim",false, false);
            var darkSprite = new egret.Sprite();
	        darkSprite.graphics.clear();
	        darkSprite.graphics.beginFill(0x000000, 0.5);
	        darkSprite.graphics.drawRect(0, 0, this.stage.width, this.stage.height);
	        darkSprite.graphics.endFill();
            this.addChildAt(darkSprite,0);
            this.touzhiPoint.addChild(this.touzhiAnim);
            this.touzhiAnim['dark'] = darkSprite;
            this.touzhiAnim.visible = false;
        }

        private showTouzhiAnim() {
            this.touzhiAnim.visible = true;
            this.touzhiAnim['dark'].visible = true;
            let sprite:egret.DisplayObject = this.touzhiAnim['dark'];
            let p = this.globalToLocal(0,0);
            sprite.x = p.x
            sprite.y = p.y
        }

        private hideTouzhiAnim() {
            this.touzhiAnim.visible = false;
            this.touzhiAnim['dark'].visible = false;
        }

        public playTbMC(){
            // if(this.tbMc!=null){
            //     this.tbMc.gotoAndPlay(1);
            //     this.tbMc.addEventListener(egret.Event.COMPLETE, this.tweenComplete, this);
            // }
        }
        public tweenComplete(event)
		{
			if(this.tbMc != null && this.tbMc.visible)
			{
				console.log("tweenComplete");
				// this.tbMc.parent.removeChild(this.tbMc);
				// this.tbMc = null;
			}
		}
        private timeoutIdList:Array<number> = [];
		private registerTimeout(func:Function, time:number):void {
			var holder:any = this;
			var timeOutId:number = egret.setTimeout(function(){
				func.call(holder);
				let index:number = this.timeoutIdList.indexOf(timeOutId);
				if(index >= 0) {
					this.timeoutIdList.splice(index, 1);
				}
			} , this , time);
			this.timeoutIdList.push(timeOutId);
		}

		public clearAllTimeOut():void {
			if(this.timeoutIdList.length > 0) {
				for(let timeOutId of this.timeoutIdList) {
					egret.clearTimeout(timeOutId);
				}
				this.timeoutIdList = [];
			}
		}

        public clear() {
            this.directEnd();
            this.hideTouzhiAnim();
        }
    }
}

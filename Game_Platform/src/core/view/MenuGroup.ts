module game {
	export class MenuGroup {

		private menuImg:eui.Image;
		private menuContent:eui.Group;
		private menuHide:string;
		private menuShow:string;
		private recordCountentY:number = 0;
		public showDelegate:any;
		public hideDelegate:any;
		private anim:boolean = true;
		public constructor(menuImg:eui.Image,menuContent:eui.Group,menuHide:string,menuShow:string,anim:boolean = true) {
			this.menuImg = menuImg;
			this.menuContent = menuContent;
			this.menuHide = menuHide;
			this.menuShow = menuShow;
			this.anim = anim;
			this.menuImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.menuClick, this);
		}

		public showDefault() {
			this.menuImg.source = this.menuHide;
			this.menuContent.visible = false;
			this.menuContent.alpha = 1;
		}

		private menuClick() {
			SoundMenager.instance.PlayClick();
			if(this.recordCountentY == 0) {
				this.recordCountentY = this.menuContent.y;
			}
			this.toggle();
		}

		private toggle() {
			if(this.menuContent.visible && this.menuContent.alpha == 1) {
				this.hide();
			} else {
				egret.Tween.removeTweens(this.menuContent);
				if(this.anim) {
					this.menuContent.y = this.recordCountentY - this.menuContent.height / 2;
					this.menuContent.visible = true;
					this.menuContent.alpha = 0;
					egret.Tween.get(this.menuContent).to({alpha : 1},200);
					egret.Tween.get(this.menuContent).to({
						y : this.recordCountentY
					}, 300, egret.Ease.backOut).call(()=>{
						if(this.showDelegate) {
							this.showDelegate.func.call(this.showDelegate.caller)
						}
					}, this)
				} else {
					this.menuContent.y = this.recordCountentY
					this.menuContent.visible = true;
					this.menuContent.alpha = 1;
					if(this.showDelegate) {
						this.showDelegate.func.call(this.showDelegate.caller)
					}
				}
				egret.setTimeout(() => {
					this.check();
				},this, 200);
				this.menuImg.source = this.menuShow;
			}
		}

		private hide() {
			this.menuImg.source = this.menuHide;
			egret.Tween.removeTweens(this.menuContent)
			if(this.anim) {
				egret.Tween.get(this.menuContent).to({
					y : this.menuImg.y + this.menuImg.height / 2,
					alpha:0
				}, 200).call(()=>{
					this.menuContent.visible = false;
					if(this.hideDelegate) {
						this.hideDelegate.func.call(this.hideDelegate.caller);
					}
				})
			} else {
				this.menuContent.visible = false;
				this.menuContent.y = this.menuImg.y + this.menuImg.height / 2;
				if(this.hideDelegate) {
					this.hideDelegate.func.call(this.hideDelegate.caller);
				}
			}
		}

		private check() {
			if(this.menuContent.visible && this.menuContent.stage) {
				if(this.menuContent.stage.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
					this.menuContent.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onstageclick, this);
				}
				this.menuContent.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onstageclick, this);
			}
		}

		private onstageclick(e:egret.TouchEvent) {
			if(this.menuContent && this.menuContent.stage) {
				this.menuContent.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onstageclick, this);
			}
			this.toggle();
		}
	}
}
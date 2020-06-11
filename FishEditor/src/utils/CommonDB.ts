module game {
	export class CommonDB extends eui.UILayer {
		public constructor(dragonbonesData:string, textureData:string, texture:string, anim:string,
			timeLimit:number = 1000,playOnAdd:boolean = true, completeFunc:any = null) {
			super();
			this.dragonbonesData = dragonbonesData;
			this.textureData = textureData;
			this.texture = texture;
			this.anim = anim;
			this.timeLimit = timeLimit;
			this.playOnAdd = playOnAdd;
			if(completeFunc) {
				this.completeFunc = completeFunc.func;
				this.completeFuncObj = completeFunc.caller;
			}
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
		}

		private armature: dragonBones.Armature ;
		private dragonbonesData:string;
		private textureData:string;
		private texture:string;
		private customWidth:number;
		private customHeight:number;
		private timeLimit:number = 0;
		private startTime:number = 0;
		private anim:string;
		private destoryTimeoutId:number = 0;
		private completeFunc:Function;
		private completeFuncObj:any;
		private playOnAdd:boolean = true;

		public restartRunAnim() {
			this.armature.animation.gotoAndPlayByFrame(this.anim,1,1);
			if(!dragonBones.WorldClock.clock.contains(this.armature)) {
				dragonBones.WorldClock.clock.add(this.armature);
			}
			this.resetTimeLimit();
		}

		protected createChildren(): void {
        	super.createChildren();
			this.touchEnabled = false;
			this.touchChildren = false;
            var dragonbonesData = RES.getRes(this.dragonbonesData);
            var textureData = RES.getRes(this.textureData);
			var texture = RES.getRes(this.texture);
            var dragonbonesFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
            dragonbonesFactory.parseDragonBonesData(dragonbonesData);
            dragonbonesFactory.parseTextureAtlasData(textureData, texture);
            this.armature = dragonbonesFactory.buildArmature("Armature");
			let display:dragonBones.EgretArmatureDisplay = this.armature.display;
			// display.debugDraw = true;
            this.addChild(display);
			if(this.playOnAdd) {
				this.armature.animation.play(this.anim, 1);
			}
		}

		private destory() {
			if(this.parent != null) this.parent.removeChild(this);
			if(this.completeFunc && this.completeFuncObj) {
				this.completeFunc.call(this.completeFuncObj);
			}
		}

		private addToStage() {
			if(this.playOnAdd) {
				dragonBones.WorldClock.clock.add(this.armature);
				this.resetTimeLimit();
			}
		}

		private resetTimeLimit() {
			if(this.destoryTimeoutId > 0) {
				egret.clearTimeout(this.destoryTimeoutId);
			}
			if(this.timeLimit > 0) {
				this.destoryTimeoutId = egret.setTimeout(this.destory, this, this.timeLimit);
			}
		}

		private removeStage() {
			if(this.destoryTimeoutId > 0) {
				egret.clearTimeout(this.destoryTimeoutId);
			}
			dragonBones.WorldClock.clock.remove(this.armature);
		}
		
	}
}
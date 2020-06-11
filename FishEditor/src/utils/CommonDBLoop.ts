module game {
	export class CommonDBLoop extends eui.UILayer {
		public constructor(dragonbonesData:string, textureData:string, texture:string, anim:string) {
			super();
			this.dragonbonesData = dragonbonesData;
			this.textureData = textureData;
			this.texture = texture;
			this.anim = anim;
			this.touchEnabled = false;
			this.touchChildren = false;
		}

		private armature: dragonBones.Armature ;
		private dragonbonesData:string;
		private textureData:string;
		private texture:string;
		private customWidth:number;
		private customHeight:number;
		private frameCount:number = 0;
		private startTime:number = 0;
		private anim:string;
		protected createChildren(): void {
        	super.createChildren();
			// 添加MovieClip测试
            var dragonbonesData = RES.getRes(this.dragonbonesData);
            var textureData = RES.getRes(this.textureData);
			var texture = RES.getRes(this.texture);
            var dragonbonesFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
			dragonbonesFactory.parseDragonBonesData(dragonbonesData);
            dragonbonesFactory.parseTextureAtlasData(textureData, texture);
            this.armature = dragonbonesFactory.buildArmature("Armature");
            this.addChild(this.armature.display);
			// this.armature.armatureData.frameRate = 12;
            this.armature.animation.play(this.anim, 0);
			
			this.startTime = egret.getTimer();
			
			/**
             * 开启大时钟这步很关键
             * */
            dragonBones.WorldClock.clock.add(this.armature);
		}	
	}
}
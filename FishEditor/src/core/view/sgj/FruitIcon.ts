import HashMap = game.HashMap;

class FruitIcon extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();

	}

	private static animCacheMap:HashMap = new HashMap();
	public static getAnim(fruitIndex:number):DragonAnim {
		let key = "fruitAnim" + fruitIndex;
		let arr:Array<DragonAnim>
		if(FruitIcon.animCacheMap.contains(key)) {
			arr = FruitIcon.animCacheMap.get(key);
		} else {
			arr = [];
			FruitIcon.animCacheMap.put(key, arr);
		}
		if(arr.length > 0) {
			let o = arr[arr.length - 1];
			arr.splice(arr.length - 1, 1);
			return o;
		} else {
			let dragonAnim:DragonAnim = new DragonAnim();
			dragonAnim.anim = key;
			dragonAnim.playOnStage = false;
			dragonAnim.isloop = false;
			dragonAnim.aligntype = "middle";
			return dragonAnim;
		}
	}

	public static cache(key:string, anim:DragonAnim) {
		let arr:Array<DragonAnim>
		if(FruitIcon.animCacheMap.contains(key)) {
			arr = FruitIcon.animCacheMap.get(key);
		} else {
			arr = [];
			FruitIcon.animCacheMap.put(key, arr);
		}
		arr.push(anim);
	}

	public fruitIndex:number = 0;

	private fruitImg:eui.Image;
	private fruitAnim:DragonAnim;
	public position:number = 0;
	
	public showFruit(fruitIndex:number, position:number = 0):void {
		this.visible = true;
		this.fruitImg.visible = true;
		this.position = position;
		this.fruitImg.source = "fruitIcon_" + fruitIndex.toFixed(0);
		this.fruitIndex = fruitIndex;
		if(this.fruitAnim && this.fruitAnim.stage) {
			this.removeChild(this.fruitAnim);
			this.fruitAnim = null;
		}
	}

	public showUnrewardState() {
		this.fruitImg.alpha = 0.4;
	}

	public showNormal() {
		this.fruitImg.alpha = 1;
		if(this.fruitAnim) {
			this.fruitAnim.stop();
			this.fruitAnim.visible = false;
		}
		this.fruitImg.visible = true;
	}

	public playFruitRewardAnim() {
		if(!this.fruitAnim) {
			this.fruitAnim = FruitIcon.getAnim(this.fruitIndex);
			this.fruitAnim.width = this.width;
			this.fruitAnim.height = this.height;
			this.addChild(this.fruitAnim);
		} else {
			if(this.fruitAnim) {
				this.removeChild(this.fruitAnim);
				FruitIcon.cache(this.fruitAnim.anim, this.fruitAnim);
			}
			this.fruitAnim = FruitIcon.getAnim(this.fruitIndex);
			this.fruitAnim.width = this.width;
			this.fruitAnim.height = this.height;
			this.addChild(this.fruitAnim);
			this.fruitAnim.visible = true;
		}
		this.fruitImg.visible = false;
		this.fruitAnim.isloop = true;
		this.fruitAnim.playerTimes(null, null, 200);
	}

}
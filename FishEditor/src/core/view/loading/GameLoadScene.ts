class GameLoadScene extends ResizePanel {
	public constructor(gameType:game.ChildGameType) {
		super();
		if(gameType == game.ChildGameType.DDZ) {
			this.skinName = "resource/eui_skins/gameload/DDZLoadScene.exml";
		} else if(gameType == game.ChildGameType.PDK) {
			this.skinName = "resource/eui_skins/gameload/PDKLoadScene.exml";
		} else if(gameType == game.ChildGameType.ZJH) {
			this.skinName = "resource/eui_skins/gameload/ZJHLoadScene.exml";
		} else if(gameType == game.ChildGameType.QYNN) {
			this.skinName = "resource/eui_skins/gameload/QZNNLoadScene.exml";
		} else if(gameType == game.ChildGameType.LHDZ) {
			this.skinName = "resource/eui_skins/gameload/LHDZLoadScene.exml";
		} else if(gameType == game.ChildGameType.HHDZ) {
			this.skinName = "resource/eui_skins/gameload/HHDZLoadScene.exml";
		} else if(gameType == game.ChildGameType.DZPK) {
			this.skinName = "resource/eui_skins/gameload/DZPKLoadScene.exml";
		} else if(gameType == game.ChildGameType.ERMJ) {
			this.skinName = "resource/eui_skins/gameload/ERMJLoadScene.exml";
		} else if(gameType == game.ChildGameType.BJL) {
			this.skinName = "resource/eui_skins/gameload/BJLLoadScene.exml";
		} else if(gameType == game.ChildGameType.FRUIT) {
			this.skinName = "resource/eui_skins/gameload/FRUITLoadScene.exml";
		} else if(gameType == game.ChildGameType.TGPD) {
			this.skinName = "resource/eui_skins/gameload/TGPDLoadScene.exml";
		} else if(gameType == game.ChildGameType.DUOBAO) {
			this.skinName = "resource/eui_skins/gameload/DUOBAOLoadScene.exml";
		} else if(gameType == game.ChildGameType.DiceBao) {
			this.skinName = "resource/eui_skins/gameload/DICEBAOLoadScene.exml";
		} else if(gameType == game.ChildGameType.BRNN) {
			this.skinName = "resource/eui_skins/gameload/BrnnLoadScene.exml";
		} else if(gameType == game.ChildGameType.FQZS) {
			this.skinName = "resource/eui_skins/gameload/FQZSLoadScene.exml";
		} else if(gameType == game.ChildGameType.BCBM) {
			this.skinName = "resource/eui_skins/gameload/BcbmLoadScene.exml";
		}
		this.game = gameType;
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
	}
	protected game:game.ChildGameType;

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	private forceDestoryTimeOutId:number = 0;
	protected anim:DragonAnim;
	private anim1:DragonAnim;
	public allowExit:boolean = false;
	private animComplete:boolean = false;

	protected childrenCreated():void
	{
		super.childrenCreated();
	}

	public leave() {
		this.allowExit = true;
		if(this.animComplete && this.stage) {
			this.parent.removeChild(this);
		}
	}

	public init():void {
		if(this.game == game.ChildGameType.DDZ) {
			if(this.width > 1334) {
                this.anim.scaleX = this.width / 1334;
            }
		}
		this.allowExit = false;
		this.animComplete = false;
		this.anim.playerOnce(()=>{
			this.animComplete = true;
			if(this.allowExit) {
				this.parent.removeChild(this);
			}
		}, this)

		if(this.anim1) {
			this.anim1.playerOnce();
		}
	}

	
	private removeStage():void {
		
	}
}
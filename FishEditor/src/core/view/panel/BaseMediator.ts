/**
  * 面板mediator基类
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  * todo:面板特效，全屏+非全屏蒙层
  */
class BaseMediator extends puremvc.Mediator implements puremvc.IMediator {

    private isInitialized: Boolean = false;//是否初始化
    private isPopUp: Boolean = false;//是否已经显示
    private ui: eui.Component = null;//UI容器
    public w: number = 0;
    public h: number = 0;
    private maskBg: egret.Sprite = new egret.Sprite();

    public constructor(mediatorName: string = "", viewComponent: Object = null) {
        super(mediatorName, viewComponent);
        this.w = egret.MainContext.instance.stage.stageWidth;
        this.h = egret.MainContext.instance.stage.stageHeight;

        this.maskBg.graphics.beginFill(0x000000, 0.2);
        this.maskBg.graphics.drawRect(0, 0, this.w, this.h);
        this.maskBg.graphics.endFill();
        this.maskBg.width = egret.MainContext.instance.stage.stageWidth;
        this.maskBg.height = egret.MainContext.instance.stage.stageHeight;
    }

    /**
    * 添加面板方法
    * panel       		面板
    * dark        		背景是否变黑
    * popUpWidth      	指定弹窗宽度，定位使用
    * popUpHeight      	指定弹窗高度，定位使用
    * effectType        0：没有动画 1:从中间轻微弹出 2：从中间猛烈弹出  3：从左向右 4：从右向左 5、从上到下 6、从下到上
    */
    public showUI(ui: eui.Component, dark: boolean = false, popUpWidth: number = 0, popUpHeight: number = 0, effectType: number = 0, isAlert: boolean = false): void {
        this.ui = ui;
        this.isPopUp = true;
        this.beforShow();
        this.initUI();
        this.initData();
        PopUpManager.addPopUp(ui, false, popUpWidth, popUpHeight, effectType, isAlert);
        if (dark) {
            this.ui.addChildAt(this.maskBg, 0);
        }
    }

	/**
	 * 面板弹出之前处理
	 */
    public beforShow(): void {

    }

	/**
	 * 初始化面板ui
	 */
    public initUI(): void {

    }


	/**
	 * 初始化面板数据
	 */
    public initData(): void {

    }


    /**
    * 移除面板方法
    * panel       		面板
    * effectType        0：没有动画 1:从中间缩小消失 2：  3：从左向右 4：从右向左 5、从上到下 6、从下到上
    */
    public closePanel(effectType: number = 0): void {
        if (this.isPopUp) {
            this.isPopUp = false;
            if(this.maskBg!= null && this.maskBg.parent == this.ui)
            {
                this.ui.removeChild(this.maskBg);
            }
            PopUpManager.removePopUp(this.ui, effectType);
            this.destroy();
        }

        if(this.ui && this.ui.parent && this.ui.stage) {
            if(this.maskBg!= null && this.maskBg.parent == this.ui)
            {
                this.ui.removeChild(this.maskBg);
            }
            PopUpManager.removePopUp(this.ui, effectType);
        }
    }


	/**
	 * 面板关闭后需要销毁的对象
	 */
    public destroy(): void {

    }


	/**
	 * 面板是否弹出状态
	 */
    public getIsPopUp(): Boolean {
        return this.isPopUp;
    }


	/**
	 * 面板是否初始化完毕
	 */
    public getIsInit(): Boolean {
        return this.isInitialized;
    }

    // 获取面板宽度
    public getWidth(): number {
        return this.ui.width;
    }

    // 获取面板高度
    public getHeight(): number {
        return this.ui.height;
    }

}
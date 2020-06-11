class TestPage extends ResizePanel{
	public constructor() {
		super();
		this.init();
	}

	private chargeParticle:particle.GravityParticleSystem;
	private shape:egret.Shape;

	private init() {
		/*
		this.shape = new egret.Shape();
		this.shape.graphics.clear();
		this.shape.graphics.beginFill(0xffffff);
		this.shape.graphics.drawRect(0,0,680,375);
		this.shape.graphics.endFill();
		let startPoint = new egret.Point(0,0);
		let endPoint = new egret.Point(680,375);
		this.chargeParticle = CommonUtil.generateDirectionParticle(RES.getRes("test_png"), RES.getRes("test_json"),startPoint,endPoint , 1500);
		this.chargeParticle.start();
		this.addChild(this.chargeParticle);
		// this.chargeParticle.mask = this.shape;
		*/
		let group:eui.Group = new eui.Group();
		this.addChild(group);
		group.x = egret.lifecycle.stage.stageWidth / 2;
		group.y = egret.lifecycle.stage.stageHeight / 2;
		let texture = RES.getRes("sc_12");
		let img:egret.Bitmap = new egret.Bitmap(texture);
		group.addChild(img);
		let matrix2 = new egret.Matrix(1,Math.tan(Math.PI/12),0,1,0,0);
		let matrix = new egret.Matrix();
		matrix.rotate(90 * 3.1415926 / 180);
		// matrix.b += Math.tan(Math.PI/24);
		console.log(matrix);
		// img.matrix = matrix
		img.rotation = 90;
		img.skewY = 10;
		// group.matrix = matrix2;
		//img.rotation = 90;
	}

}
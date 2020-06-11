class FruitMachine extends eui.Component implements  eui.UIComponent {

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
		this.fruitHorMap = {
			1 : [this.fruit1_1,this.fruit2_1,this.fruit3_1,this.fruit4_1,this.fruit5_1],
			2 : [this.fruit1_2,this.fruit2_2,this.fruit3_2,this.fruit4_2,this.fruit5_2],
			3 : [this.fruit1_3,this.fruit2_3,this.fruit3_3,this.fruit4_3,this.fruit5_3]
		};

		this.fruitVerMap = {
			1 : [this.fruit1_1,this.fruit1_2,this.fruit1_3],
			2 : [this.fruit2_1,this.fruit2_2,this.fruit2_3],
			3 : [this.fruit3_1,this.fruit3_2,this.fruit3_3],
			4 : [this.fruit4_1,this.fruit4_2,this.fruit4_3],
			5 : [this.fruit5_1,this.fruit5_2,this.fruit5_3],
		};
		this.lines = [
			this.line1,
			this.line2,
			this.line3,
			this.line4,
			this.line5,
			this.line6,
			this.line7,
			this.line8,
			this.line9
		];
		this.fliconArrLeft = [this.flicon_l1, this.flicon_l2,this.flicon_l3,this.flicon_l4,this.flicon_l5,this.flicon_l6,this.flicon_l7,this.flicon_l8,this.flicon_l9]
		this.fliconArrRight = [this.flicon_r1, this.flicon_r2,this.flicon_r3,this.flicon_r4,this.flicon_r5,this.flicon_r6,this.flicon_r7,this.flicon_r8,this.flicon_r9]
		this.fruitRolls = [
			this.fruitRoll1,this.fruitRoll2,this.fruitRoll3,this.fruitRoll4,this.fruitRoll5
		]
		// 制作每根线的mask
		for(let line of this.lines) {
			let maskRect = new eui.Rect();
			maskRect.width = 1;
			maskRect.height = line.height;
			line['maskRect'] = maskRect;
			this.addChild(maskRect);
			line.mask = maskRect;
			maskRect.x = line.x;
			maskRect.y = line.y;
		}
		this.oriResultY = this.resultGroup.y;
		this.ShowInit();
		this.initLineIcon();
		for(let icon of this.fliconArrLeft) {
			icon.bright();
		}
	}
	
	private fruit1_1:FruitIcon;
	private fruit1_2:FruitIcon;
	private fruit1_3:FruitIcon;
	private fruit2_1:FruitIcon;
	private fruit2_2:FruitIcon;
	private fruit2_3:FruitIcon;
	private fruit3_1:FruitIcon;
	private fruit3_2:FruitIcon;
	private fruit3_3:FruitIcon;
	private fruit4_1:FruitIcon;
	private fruit4_2:FruitIcon;
	private fruit4_3:FruitIcon;
	private fruit5_1:FruitIcon;
	private fruit5_2:FruitIcon;
	private fruit5_3:FruitIcon;

	private line1:eui.Image;
	private line2:eui.Image;
	private line3:eui.Image;
	private line4:eui.Image;
	private line5:eui.Image;
	private line6:eui.Image;
	private line7:eui.Image;
	private line8:eui.Image;
	private line9:eui.Image;

	private fruitHorMap: { [key: string]: Array<FruitIcon>; } ;
	private fruitVerMap: { [key: string]: Array<FruitIcon>; } ;
	private lines:Array<eui.Image>;
	private fruitRoll1:FruitRoll;
	private fruitRoll2:FruitRoll;
	private fruitRoll3:FruitRoll;
	private fruitRoll4:FruitRoll;
	private fruitRoll5:FruitRoll;

	private fruitRolls:Array<FruitRoll>;
	private showLines:Array<game.sgj.WinLineInfo>;
	private curShowLineIndex:number = 0;
	private curShowLineStart:number = 0;

	private flicon_l1:FruitLineIcon;
	private flicon_l2:FruitLineIcon;
	private flicon_l3:FruitLineIcon;
	private flicon_l4:FruitLineIcon;
	private flicon_l5:FruitLineIcon;
	private flicon_l6:FruitLineIcon;
	private flicon_l7:FruitLineIcon;
	private flicon_l8:FruitLineIcon;
	private flicon_l9:FruitLineIcon;

	private flicon_r1:FruitLineIcon;
	private flicon_r2:FruitLineIcon;
	private flicon_r3:FruitLineIcon;
	private flicon_r4:FruitLineIcon;
	private flicon_r5:FruitLineIcon;
	private flicon_r6:FruitLineIcon;
	private flicon_r7:FruitLineIcon;
	private flicon_r8:FruitLineIcon;
	private flicon_r9:FruitLineIcon;

	private fliconArrLeft:Array<FruitLineIcon>;
	private fliconArrRight:Array<FruitLineIcon>;

	private resultGroup:eui.Group;
	private resultContentGroup:eui.Group;
	private oriResultY:number = 0;
	private isinit: boolean;

	private initLineIcon():void {
		for(let i=0;i<this.fliconArrLeft.length;i++) {
			this.fliconArrLeft[i].showLine((i+1), true);
		}
		for(let i=0;i<this.fliconArrRight.length;i++) {
			this.fliconArrRight[i].showLine((i+1), true);
		}
		for(let i=0;i<this.lines.length;i++) {
			this.lines[i].visible = true;
		}
	}

	public showLine(linenumber:number):void {
		for(let i=0;i<this.fliconArrLeft.length;i++) {
			this.fliconArrLeft[i].showLine((i+1), i < linenumber);
		}
		for(let i=0;i<this.fliconArrRight.length;i++) {
			this.fliconArrRight[i].showLine((i+1), i < linenumber);
		}
		for(let i=0;i<this.lines.length;i++) {
			this.lines[i].visible = i < linenumber;
			this.lines[i].mask.width = this.lines[i].width;
		}
	}

	public ShowInit():void {
		this.isinit = true;
		if(!this.lines || !this.lines[0]) return;
		for(let fruitRoll of this.fruitRolls) {
			fruitRoll.visible = false;
		}
		for(let line of this.lines) {
			line.visible = true;
		}
		for(let fruitKey in this.fruitHorMap) {
			for(let fruitIcon of this.fruitHorMap[fruitKey]) {
				if(fruitKey == "1") {
					fruitIcon.showFruit(6);
				}
				if(fruitKey == "2") {
					fruitIcon.showFruit(5);
				}
				if(fruitKey == "3") {
					fruitIcon.showFruit(4);
				}
			}
		}
	}

	private hideAllLines():void {
		for(let line of this.lines) {
			line.visible = false;
			line.mask.width = 0;
		}
	}

	
	public showAllLines():void {
		for(let line of this.lines) {
			line.visible = false;
		}
	}

	private hideAllFruit():void {
		for(let i=0;i<3;i++) {
			for(let j=0;j<5;j++) {
				this.fruitHorMap[(i+1)][j].visible = false;
			}	
		}
	}

	public startRoll(gameResult:game.sgj.FruitGameResult):void {
		this.isinit = false;
		this.hideAllLines();
		this.hideAllFruit();
		let index:number = 0;
		let curArr:Array<number> = [];
		
		for(let fruitRoll of this.fruitRolls) {
			curArr = [];
			for(let f of this.fruitVerMap[(index + 1)]) {
				curArr.push(f.fruitIndex);
			}
			fruitRoll.visible = true;
			fruitRoll.showRoll(gameResult.getTargetFruitArr(index),curArr, index);
			fruitRoll.roll();
			fruitRoll.rollIndex = index;
			index++;
		}
	}

	public forceStopRoll() {
		for(let fruitRoll of this.fruitRolls) {
			fruitRoll.stop();
		}
	}

	public showFruit(gameResult:game.sgj.FruitGameResult, rollIndex:number, fruitIcons:Array<FruitIcon>):void {
		for(let i=0;i<3;i++) {
			let fruitData = gameResult.fruitsInfos[rollIndex + i * 5];
			this.fruitVerMap[(rollIndex + 1)][i].showFruit(fruitData.fruitIndex, fruitData.position);
			let globalPos:egret.Point = fruitIcons[i].localToGlobal(0,0);
			let pos :egret.Point = this.fruitVerMap[(rollIndex + 1)][i].parent.globalToLocal(globalPos.x, globalPos.y);
			this.fruitVerMap[(rollIndex + 1)][i].x = pos.x;
			this.fruitVerMap[(rollIndex + 1)][i].y = pos.y;
		}
	}

	public showReuslt(gameResult:game.sgj.FruitGameResult, f:Function, fCaller:any) {
		this.resultContentGroup.removeChildren();
		let width = 0;
		for(let winresultinfo of gameResult.winResult) {
			let fruitResultIcon = new FruitResultIcon();
			this.resultContentGroup.addChild(fruitResultIcon);
			fruitResultIcon.showResult(winresultinfo.configId, winresultinfo.count);
			width += fruitResultIcon.width + 6;
		}
		this.resultGroup.visible = true;
		this.resultGroup.alpha = 0;
		this.resultGroup.y = this.oriResultY;
		this.resultContentGroup.width = width;
		this.resultGroup.width = this.resultContentGroup.width + 30;
		egret.Tween.get(this.resultGroup).to({alpha:1,y:this.oriResultY - 100}, 500);
		if(f) {
			f.call(fCaller);
		}
	}

	public hideResult() {
		this.resultGroup.visible = false;
		egret.Tween.removeTweens(this.resultGroup);
	}

	public startShowLines(tempGameResult:game.sgj.FruitGameResult, f:Function, fCaller:any):void {
		this.setFruitStateGray();
		let linesArr:Array<game.sgj.WinLineInfo> = tempGameResult.winLines
		this.showLines = linesArr;
		for(let i=0;i<linesArr.length;i++) {
			let line = linesArr[i];
			let l = this.lines[line.winLine - 1]
			l.visible = true;
			l['maskRect'].width = 0;
			// 对应端点亮起来
			let licon = this.fliconArrLeft[line.winLine - 1];
			let ricon = this.fliconArrRight[line.winLine - 1];
			licon.bright();
			ricon.bright();
			if(i == linesArr.length - 1) {
				egret.log("l mask witdh : " +l['maskRect'].width);
				egret.Tween.get(l['maskRect']).to({width:l.width}, 350).call(()=>{
					this.showReuslt(tempGameResult,null,null);
					this.refreshFruitState(linesArr);
					if(f) {
						f.call(fCaller);
					}
				}, this);
			} else {
				egret.log("l mask witdh : " +l['maskRect'].width);
				egret.Tween.get(l['maskRect']).to({width:l.width}, 350).call(()=>{
				}, this)
			}
		}
	}

	private setFruitStateGray() {
		for(let k in this.fruitVerMap) {
			for(let f of this.fruitVerMap[k]) {
				f.showUnrewardState();
			}
		}
	}

	private refreshFruitState(linesArr:Array<game.sgj.WinLineInfo>) {
		let totalArr:Array<number> = [];
		for(let line of linesArr) {
			for(let p of line.postion) {
				totalArr.push(p);
			}
		}
		for(let k in this.fruitVerMap) {
			for(let f of this.fruitVerMap[k]) {
				if(totalArr.indexOf(f.position) < 0) {
					f.showUnrewardState();
				} else {
					f.playFruitRewardAnim();
				}
			}
		}
	}

	public stopReward() {
		this.stopShowLines();
		this.resultGroup.visible = false;
		for(let k in this.fruitVerMap) {
			for(let f of this.fruitVerMap[k]) {
				f.showNormal();
			}
		}
	}

	private playFruiAnim(posArr:Array<number>) {
		for(let k in this.fruitVerMap) {
			for(let f of this.fruitVerMap[k]) {
				if(posArr.indexOf(f.position) >= 0) {
					f.playFruitRewardAnim();
				}
			}
		}
	}

	private updateLineShow(timestamp:number):boolean {
		if(timestamp - this.curShowLineStart > 1000) {
			this.curShowLineStart = timestamp;
			this.curShowLineIndex = (this.curShowLineIndex + 1) % this.showLines.length;
			this.hideAllLines();
			this.lines[this.showLines[this.curShowLineIndex].winLine - 1].visible = true;
			this.playFruiAnim(this.showLines[this.curShowLineIndex].postion);
			egret.log("winline------------" + this.showLines[this.curShowLineIndex].winLine)
		}
		return false;
	}

	public stopShowLines():void {
		this.hideAllLines();
		this.clear();
		egret.stopTick(this.updateLineShow, this);
	}

	public clear() {
		for(let f of this.fliconArrLeft) {
			f.stopBright();
		}
		for(let f of this.fliconArrRight) {
			f.stopBright();
		}
	}
	
}

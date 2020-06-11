module game.by {
	export class BYTrackShowUI extends eui.Component{
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/by/byTrackUI.exml";
		}

		private fishGroup:eui.Group;
		private trackInput:EditText;
		private trackGroup:eui.Group;
		private curFish:NFish | NFishRing;
		private debugGroup:eui.Group;
		private saveBtn:eui.Button;
		private operGroup:eui.Group;
		private speedInput:EditText;
		private clearBtn:eui.Button;
		private curShowTrackIdsLabel:eui.Label;
		private showAllBtn:eui.Button;
		private existGroup:eui.Group;
		private selectGroup:eui.Group;
		private selectBtn:eui.Button;
		private downloadBtn:eui.Button;

		public splitValue:number = 20;

		private curTrackCfg:NTrackCfg;
		private curSelectTrackId:number = 0;
		private deleteBtn:eui.Button;
		private repaintBtn:eui.Button;
		private drawMode:eui.Group;
		private exitBtn:eui.Button;
		private fixBtn:eui.Button;
		private timeInput:EditText;
		private fishTestBtn:eui.Button;
		private fishRingTestBtn:eui.Button;

		protected createChildren() {
			super.createChildren();
			this.saveBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onSave, this);
			this.selectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelect, this);
			this.repaintBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRepaint, this);
			this.deleteBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDelete, this);
			this.fixBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFix, this);
			this.exitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExit, this);
			this.downloadBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDownload, this);
			this.fishTestBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFishTest, this);
			this.fishRingTestBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFishRingTest, this);
			this.onOpen();
		}

		protected onOpen() {
			egret.startTick(this.update, this);
			ByEditorData.instance.loadFromStorage();
			this.trackInput.editInput.text = "";
			this.onShowAll();
			this.showOneLevelMenu();
			this.drawMode.visible = false;
			let lastId = ByEditorData.instance.getLastTrackId();
			this.timeInput.editInput.text = "50";
			egret.log("read last track id : " + lastId);
			if(lastId > 0) {
				let last = ByEditorData.instance.getLastTrackCfg();
				if(last) {
					this.trackInput.editInput.text = lastId.toFixed(0);
					this.curSelectTrackId = lastId;
					this.onSelect();
				}
			}
			
		}

		private showOneLevelMenu() {
			this.selectBtn.visible = true;
			this.deleteBtn.visible = false;
			this.saveBtn.visible = false;
			this.downloadBtn.visible = false;
			this.repaintBtn.visible = false;
		}

		protected onLeave() {
			egret.stopTick(this.update, this);
		}

		private onSelect() {
			if(this.trackInput.editInput.text == "") {
				TipsUtils.showTipsFromCenter("请先输入需要选择的路径Id")
				return;
			}
			let trackId = Number(this.trackInput.editInput.text);
			let trackCfg = ByEditorData.instance.getTrackCfg(trackId);
			this.selectGroup.removeChildren();
			this.curSelectTrackId = trackId;
			if(trackCfg) {
				this.curTrackCfg = trackCfg;
				this.deleteBtn.visible = true;
				this.saveBtn.visible = true;
				this.downloadBtn.visible = true;
				this.repaintBtn.visible = true;
				this.showSelect();
			} else {
				this.deleteBtn.visible = true;
				this.saveBtn.visible = true;
				this.downloadBtn.visible = true;
				this.repaintBtn.visible = true;
			}
			
		}

		private onShowAll() {
			this.fishGroup.removeChildren();
			for(let i=0;i<ByEditorData.instance.trackIds.length;i++) {
				let trackId = ByEditorData.instance.trackIds[i];
				let trackCfg = ByEditorData.instance.trackMap.get("record_trackid_" + trackId);
				if(trackCfg) {
					for(let j=0;j<trackCfg.trackItems.length;j++) {
						let item = trackCfg.trackItems[j];
						let shape = new egret.Shape();
						this.fishGroup.addChild(shape);
						let g = shape.graphics;
						g.clear();
						g.beginFill(0xFFE4B5);
						g.drawCircle(0,0,3);
						g.endFill();
						shape.x = item.x;
						shape.y = item.y;
					}
					let lineShape = new egret.Shape();
					this.fishGroup.addChild(lineShape);
					lineShape.x = 0;
					lineShape.y = 0;
					let g = lineShape.graphics;
					g.clear();
					g.lineStyle( 2, 0xFFE4B5 );
					g.moveTo(trackCfg.trackItems[0].x, trackCfg.trackItems[0].y)
					for(let j=1;j<trackCfg.trackItems.length;j++) {
						let item = trackCfg.trackItems[j];
						g.lineTo(item.x, item.y);
					}
					g.endFill();
				}
			}
			this.curShowTrackIdsLabel.text = "所有路径:" + ByEditorData.instance.trackIds.join(",");
		}

		private showSelect() {
			this.selectGroup.removeChildren();
			if(this.curTrackCfg) {
				for(let item of this.curTrackCfg.trackItems) {
					let shape = new egret.Shape();
					this.selectGroup.addChild(shape);
					let g = shape.graphics;
					g.clear();
					g.beginFill(0xff0000);
					g.drawCircle(0,0,4);
					g.endFill();
					shape.x = item.x;
					shape.y = item.y;
				}
			}
		}

		private update(timestamp:number):boolean {
			if(this.curFish) {
				this.curFish.update(timestamp)
				this.curFish.updateMotion(timestamp)
			}
			return false;
		}

		private onRepaint() {
			this.selectGroup.removeChildren();
			this.debugGroup.removeChildren();
			this.trackCfg = new NTrackCfg();
			this.trackPointArr = [];
			this.enterDrawMode();
			if(this.curFish) {
				if(this.curFish.parent) {
					this.curFish.parent.removeChild(this.curFish);
				}
				this.curFish.stopMotion();
				this.curFish = null;
			}
			
		}

		private onTrackLoad(fishTrackCfgAssets:game.by.FishTrackCfgAssets) {
			this.trackGroup.removeChildren();
			for(let item of fishTrackCfgAssets.trackCfg.trackItems) {
				let shape = new egret.Shape();
				this.trackGroup.addChild(shape);
				let g = shape.graphics;
				g.clear();
				g.beginFill(0xff00ff);
				g.drawCircle(0,0,3);
				g.endFill();
				shape.x = item.x;
				shape.y = Global.designRect.y - item.y;
			}
		}

		private createPointShow(x:number, y:number) {
			let shape = new egret.Shape();
			this.debugGroup.addChild(shape);
			let g = shape.graphics;
			g.clear();
			g.beginFill(0xff00ff);
			g.drawCircle(0,0,3);
			g.endFill();
			shape.x = x;
			shape.y = y;
		}

		private trackCfg:NTrackCfg;
		private trackPointArr:Array<egret.Point> = [];
		private onBegin(e:egret.TouchEvent) {
			if(!this.trackCfg) {
				egret.log("begin===================== no track cfg");
				return;
			}

			this.drawMode.visible = false;
			let p = this.fishGroup.globalToLocal(e.stageX, e.stageY);
			this.trackCfg.addTrackItem(p);
			this.createPointShow(e.stageX, e.stageY);
			this.trackPointArr.push(new egret.Point(e.stageX, e.stageY));
			this.debugGroup.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
		}

		private onClear() {
			this.trackPointArr = [];
			this.trackCfg = new NTrackCfg();
			this.debugGroup.removeChildren();
		}

		private onEnd(e:egret.TouchEvent) {
			this.drawMode.visible = true;
			if(this.trackCfg) {
				this.trackCfg.genRotation();
			}
			this.debugGroup.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
		}

		private onSave(e:egret.TouchEvent) {
			if(this.curSelectTrackId > 0) {
				if(this.trackCfg && this.trackCfg.trackItems.length > 0) {
					this.curTrackCfg = this.trackCfg;
				}
				ByEditorData.instance.saveTrack(this.curSelectTrackId, this.curTrackCfg);
			}
			this.onShowAll();
			this.debugGroup.removeChildren();
			this.showSelect();
		}

		private onDownload() {
			if(this.curTrackCfg) {
				downloadContent("track_" + this.curSelectTrackId, JSON.stringify(this.curTrackCfg));
			}
		}

		private onMove(e:egret.TouchEvent) {
			let lastPoint = this.trackPointArr[this.trackPointArr.length - 1];
			let curPoint = egret.Point.create(e.stageX, e.stageY);
			let distance = egret.Point.distance(lastPoint, curPoint);
			if(distance >= this.splitValue) {
				// 超出部分需要补点
				let deltaPoint = egret.Point.create(curPoint.x - lastPoint.x, curPoint.y - lastPoint.y);
				deltaPoint.normalize(1);
				for(let i=0;i < distance / this.splitValue;i++) {
					let point = egret.Point.create(lastPoint.x + deltaPoint.x * this.splitValue *(i+1), 
						lastPoint.y + deltaPoint.y * this.splitValue *(i+1))
					this.createPointShow(point.x, point.y);
					this.trackPointArr.push(point);
					let p = this.fishGroup.globalToLocal(point.x, point.y);
					this.trackCfg.addTrackItem(p);
				}
			}
			
		}

		private onExit() {
			this.operGroup.visible = true;
			this.drawMode.visible = false;
			// this.fishGroup.visible = true;
			this.debugGroup.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
			this.debugGroup.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
			this.debugGroup.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onEnd, this);
			this.debugGroup.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEnd, this);
		}

		private enterDrawMode() {
			this.operGroup.visible = false;
			this.drawMode.visible = true;
			// this.fishGroup.visible = false;

			this.debugGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
			this.debugGroup.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
			this.debugGroup.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onEnd, this);
			this.debugGroup.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEnd, this);
		}

		private onDelete() {
			if(this.curSelectTrackId > 0) {
				ByEditorData.instance.delete(this.curSelectTrackId);
			}
			this.onShowAll();
			this.debugGroup.removeChildren();
			this.selectGroup.removeChildren();
		}

		private onFix() {
			this.trackCfg.fix();
			this.debugGroup.removeChildren();
			for(let item of this.trackCfg.trackItems) {
				let p = this.fishGroup.localToGlobal(item.x, item.y);
				this.createPointShow(p.x, p.y);
			}
		}

		private onFishTest() {
			if(this.curFish && this.curFish.parent) {
				this.curFish.parent.removeChild(this.curFish);
			} 
			if(!this.curTrackCfg) {
				return ;
			}
			this.curTrackCfg.genRotation();
			this.curFish = new NFish("1",2,0,0,0);
			this.curFish.setTrackCfg(this.curSelectTrackId, this.curTrackCfg);
			this.fishGroup.addChild(this.curFish);
			let time = Number(this.timeInput.editInput.text);
			this.curFish.speed = this.curTrackCfg.getTrueDistance() / time;
			this.curFish.startMotion();
		}

		private onFishRingTest() {
			if(this.curFish && this.curFish.parent) {
				this.curFish.parent.removeChild(this.curFish);
			} 
			if(!this.curTrackCfg) {
				return ;
			}
			this.curTrackCfg.genRotation();
			this.curFish = new NFishRing("1",2,1,0,0,0,[2,2,2]);
			this.curFish.setTrackCfg(this.curSelectTrackId, this.curTrackCfg);
			this.fishGroup.addChild(this.curFish);
			let time = Number(this.timeInput.editInput.text);
			this.curFish.speed = this.curTrackCfg.getTrueDistance() / time;
			this.curFish.startMotion();
		}
	}
}
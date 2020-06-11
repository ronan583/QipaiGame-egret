module game {

	// 描述两个点生成线段
	export class PLine {
		public bPoint: egret.Point;
		public ePoint: egret.Point;
		private k: number = 0;
		private b: number = 0;
		private calcKB() {
			if(this.ePoint.y == this.bPoint.y) {
				this.k = 0;
				this.b = this.ePoint.y;
			} else {
				if(this.ePoint.x == this.bPoint.x) {
					this.ePoint.x = this.bPoint.x - 1;
				}
				this.k = (this.ePoint.y - this.bPoint.y) / (this.ePoint.x - this.bPoint.x);
				this.b = this.bPoint.y - this.bPoint.x * this.k;
			}
		}

		public calcYValueByX(x:number):number | boolean{
			let minx = Math.min(this.bPoint.x, this.ePoint.x);
			let maxx = Math.max(this.bPoint.x, this.ePoint.x);
			if(x < minx || x > maxx) return false;
			return this.k * x + this.b;
		}

		public static genLine(p1: egret.Point, p2: egret.Point): PLine {
			let line: PLine = new PLine();
			line.bPoint = p1;
			line.ePoint = p2;
			line.calcKB();
			return line;
		}
	}
	// 方形下注区域
	export class StakeArea {
		public group:eui.Group;
		public flag:number = 0;
		public randomPoint(space:number):egret.Point{
			let w = this.group.width;
			let h = this.group.height;
			return new egret.Point(
				this.group.x + space / 2 + Math.random() * (w - space),
				this.group.y + space / 2 + Math.random() * (h - space)
			);
		}

		public randomGlobalPoint(space:number):egret.Point{
			let p = this.randomPoint(space);
			return this.group.parent.localToGlobal(p.x, p.y);
		}

		public static convertFromGroup(group:eui.Group):StakeArea {
			let area:StakeArea = new StakeArea();
			area.group = group;
			return area;
		}
	}

	export class Section {
		public x:number;
		public uy:number;
		public dy:number;
		public weight:number;
		public randomPoint():egret.Point {
			return new egret.Point(this.x + CommonUtil.RandomRangeInt(0,20), CommonUtil.RandomRangeInt(this.dy, this.uy));
		}
	}

	export class SectionList {
		public sections:Array<Section> = [];
		public totalWeight:number = 0;
		public addSection(section:Section):void {
			this.sections.push(section);
			section.weight = section.uy - section.dy;
			this.totalWeight += section.weight;
		}

		public randomSection():Section{
			let t = 0;
			let r = CommonUtil.RandomRangeInt(0, this.totalWeight);
			for(let section of this.sections) {
				t += section.weight;
				if(r < t) {
					return section;
				}
			}
			return null;
		}
	}

	export class PolyStakeArea {
		public constructor() {
		}

		private pLineList:Array<PLine>;
		private minX:number = Number.MAX_VALUE;
		private maxX:number = 0;
		public sectionList:SectionList = new SectionList();

		public initByDisplayObjNodes(nodes:Array<egret.DisplayObject>) {
			let parr = new Array<egret.Point>();
			for(let node of nodes) {
				parr.push(new egret.Point(node.x + node.width / 2, node.y + node.height / 2));
			}
			this.initByNodes(parr);
		}

		public initByNodes(parr:Array<egret.Point>) {
			this.pLineList = [];
			for(let i=0;i < parr.length;i++) {
				if(i == parr.length - 1) {
					this.pLineList.push(PLine.genLine(parr[i], parr[0]));
				} else {
					this.pLineList.push(PLine.genLine(parr[i], parr[i + 1]));
				}
				if(parr[i].x < this.minX) {
					this.minX = parr[i].x;
				}
				if(parr[i].x > this.maxX) {
					this.maxX = parr[i].x;
				}
			}
			// 按照X 20像素分隔成区域
			let curX = this.minX + 10;
			while(curX < this.maxX) {
				let section:Section = new Section();
				section.x = curX;
				let miny = Number.MAX_VALUE;
				let maxy = Number.MIN_VALUE;
				for(let line of this.pLineList) {
					let y = line.calcYValueByX(curX);
					if(y) {
						let v = <number>y
						if(v < miny) {
							miny = v;
						}
						if(v > maxy) {
							maxy = v;
						}
					}
				}
				section.uy = maxy;
				section.dy = miny;
				this.sectionList.addSection(section);
				curX += 20;
			}
		}

		public randomPoint():egret.Point{
			let section = this.sectionList.randomSection();
			return section.randomPoint();
		}

		public randomPointInContainer():egret.Point{
			let section = this.sectionList.randomSection();
			let p = section.randomPoint();
			return p;
		}

		public segmentsIntr(a, b, c, d): any {
			/** 1 解线性方程组, 求线段交点. **/
			// 如果分母为0 则平行或共线, 不相交 
			var denominator = (b.y - a.y) * (d.x - c.x) - (a.x - b.x) * (c.y - d.y);
			if (denominator == 0) {
				return false;
			}
			// 线段所在直线的交点坐标 (x , y) 
			var x = ((b.x - a.x) * (d.x - c.x) * (c.y - a.y)
				+ (b.y - a.y) * (d.x - c.x) * a.x
				- (d.y - c.y) * (b.x - a.x) * c.x) / denominator;
			var y = -((b.y - a.y) * (d.y - c.y) * (c.x - a.x)
				+ (b.x - a.x) * (d.y - c.y) * a.y
				- (d.x - c.x) * (b.y - a.y) * c.y) / denominator;

			/** 2 判断交点是否在两条线段上 **/
			if (
				// 交点在线段1上 
				(x - a.x) * (x - b.x) <= 0 && (y - a.y) * (y - b.y) <= 0
				// 且交点也在线段2上 
				&& (x - c.x) * (x - d.x) <= 0 && (y - c.y) * (y - d.y) <= 0
			) {

				// 返回交点p 
				return new egret.Point(x, y);
			}
			// 否则不相交 
			return false
		}

	}
}
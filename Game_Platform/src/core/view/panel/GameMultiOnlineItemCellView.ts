class GameMultiOnlineItemCellData {
	// 因为一行要显示3个 所以三个一组
	public dataArr:Array<any> = [];

	public gameType:game.ChildGameType;

	public add(d:any, trueIndex:number) {
		this.dataArr.push(d);
		d['flag'] = trueIndex
	}
}


class GameMultiOnlineItemCellView extends eui.Component implements  eui.UIComponent, eui.IItemRenderer {
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

	public selected: boolean;
	public itemIndex:number;
	private viewList:Array<egret.DisplayObject> = [];

	private _data:GameMultiOnlineItemCellData;
	public set data(cellData:GameMultiOnlineItemCellData) {
		this._data = cellData;
		this.updateView(cellData);
	}

	public get data():GameMultiOnlineItemCellData {
		return this._data;
	}

	private contentGroup:eui.Group;

	public updateView(cellData:GameMultiOnlineItemCellData):void {
		if(cellData.gameType == game.ChildGameType.BRNN) {
			for(let i = 0; i < cellData.dataArr.length; i++)
			{
				let rankItem = new BrnnRankItemNew();
				this.contentGroup.addChild(rankItem);
				rankItem.init(cellData.dataArr[i], cellData.dataArr[i]['flag']);
			}
		}
	}
	
}
class ScrollerList extends eui.Component implements  eui.UIComponent {
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
		this.init();
	}
	

	private scroller:eui.Scroller;
	private dataListView:eui.List;

	private init() {
		if (this.scroller.horizontalScrollBar != null) {
			this.scroller.horizontalScrollBar.autoVisibility = false;
			this.scroller.horizontalScrollBar.visible = false;
			this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
		}
		if (this.scroller.verticalScrollBar != null) {
			this.scroller.verticalScrollBar.autoVisibility = false;
			this.scroller.verticalScrollBar.visible = false;
		}
		this.scroller.viewport = this.dataListView;
		this.dataListView.itemRenderer = GameMultiOnlineItemCellView;
	}

	public initByData(dataList:Array<any>, gameType:game.ChildGameType, itemRenderType:any) {
		// dataList 按3个一组 进行分组
		/*
		let datas:Array<GameMultiOnlineItemCellData> = [];
		let lastGid = -1;
		let cellData:GameMultiOnlineItemCellData = null;
		for(let i=0;i < dataList.length;i++) {
			let gid = Math.floor(i / 3);
			if(gid != lastGid) {
				cellData = new GameMultiOnlineItemCellData();
				cellData.gameType = gameType
				datas.push(cellData);
				lastGid = gid;
			}
			cellData.add(dataList[i], i);
		}
		*/
		for(let i=0;i<dataList.length;i++) {
			dataList[i]['flag'] = i
		}
		let listDataProvider = new eui.ArrayCollection(dataList);
		this.dataListView.dataProvider = listDataProvider;
		this.dataListView.itemRenderer = itemRenderType;
		this.dataListView.updateRenderer = this.itemCell.bind(this);

		let tileLayout:eui.TileLayout = <eui.TileLayout>this.dataListView.layout;
		if(gameType == game.ChildGameType.BRNN) {
			tileLayout.horizontalGap = 93;
			tileLayout.verticalGap = 15;
			tileLayout.paddingLeft = 100;
		}

		if(gameType == game.ChildGameType.BJL) {
			tileLayout.horizontalGap = 93;
			tileLayout.verticalGap = 15;
			tileLayout.paddingLeft = 100;
		}
		if(gameType == game.ChildGameType.HHDZ) {
			tileLayout.horizontalGap = 60;
			tileLayout.verticalGap = 15;
			tileLayout.paddingLeft = 60;
			tileLayout.requestedColumnCount = 4;
		}

		if(gameType == game.ChildGameType.DiceBao) {
			tileLayout.horizontalGap = 93;
			tileLayout.verticalGap = 15;
			tileLayout.paddingLeft = 30;
		}
		if(gameType == game.ChildGameType.FQZS) {
			tileLayout.horizontalGap = 100;
			tileLayout.verticalGap = 15;
			tileLayout.paddingLeft = 100;
		}
		if(gameType == game.ChildGameType.LHDZ) {
			tileLayout.horizontalGap = 70;
			tileLayout.verticalGap = 40;
			tileLayout.paddingLeft = 120;
			tileLayout.requestedColumnCount = 4;
		}
		if(gameType == game.ChildGameType.BCBM) {
			tileLayout.horizontalGap = 65;
			tileLayout.verticalGap = 40;
			tileLayout.paddingLeft = 100;
		}
	}

	private itemCell(renderer: eui.IItemRenderer, itemIndex: number, data: any) : eui.IItemRenderer{
		renderer.data = data;
		renderer.itemIndex = itemIndex;
		return renderer;
	}

}
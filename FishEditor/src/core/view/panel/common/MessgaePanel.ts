module game {
	export class MessgaePanel extends eui.Component {
		  public constructor() {
            super();
            this.skinName = "resource/eui_skins/common/MessageSkin.exml";
            this.addEventListener(eui.UIEvent.COMPLETE , this.createCompleteEvent, this);
        }

        public createCompleteEvent(event:eui.UIEvent):void{
            this.removeEventListener(eui.UIEvent.COMPLETE , this.createCompleteEvent, this);
        }

        public closeBtn: eui.Button;
        public infoText: eui.Label;
        
        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName, instance);
        }
	}
}
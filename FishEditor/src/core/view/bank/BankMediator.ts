module game
{
	export class BankMediator extends BaseMediator {

		public static NAME: string = "BankMediator";

        public constructor(viewComponent: any = null) {
            super(BankMediator.NAME, viewComponent);
        }

        private bankUI: BankWithdrawUI = null;
        private bankUIMap:HashMap = new HashMap();

        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.OPEN_BANK_UI,
                ResponseModify.SUCCESS_OPERATORMONEY_RESPONSE
            ];
        }
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
			switch (notification.getName()) {
                case PanelNotify.OPEN_BANK_UI: 
                    let  bankUI:any = null;
                    if(this.bankUIMap.contains("bank" + data)) {
                        bankUI = this.bankUIMap.get("bank" + data);
                    } else {
                        bankUI = new BankWithdrawUI(data);
                        this.bankUIMap.put("bank" + data, bankUI);
                    }
                    this.bankUI = bankUI;
                    PopUpManager.addPopUp(this.bankUI, true, 0, 0, 1);
                break;
                case ResponseModify.SUCCESS_OPERATORMONEY_RESPONSE:
                    if(this.bankUI) {
                        this.bankUI.refresh();
                    }
                break;
			}
		}
	}
}
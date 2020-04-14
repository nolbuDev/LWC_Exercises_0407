import { LightningElement } from "lwc";

export default class Challenge_currentDateTime extends LightningElement {
	currentDate = new Date();
	updateDate(event) {
		console.log(event.target);
		this.currentDate = new Date();
	}

	connectedCallback() {
		setInterval(() => {
			this.currentDate = new Date();
		}, 3000);
	}
}

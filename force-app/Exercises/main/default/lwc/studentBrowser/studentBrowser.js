import { LightningElement, track, wire } from "lwc";
import getStudents from "@salesforce/apex/StudentBrowser.getStudents";

export default class StudentBrowser extends LightningElement {
	selectedDeliveryId = "";
	selectedInstructorId = "";

	@wire(getStudents, { instructorId: "$selectedInstructorId", courseDeliveryId: "$selectedDeliveryId" })
	students;

	constructor() {
		super();
	}

	handleFilterChange(event) {
		this.selectedDeliveryId = event.detail.deliveryId;
		this.selectedInstructorId = event.detail.instructorId;
	}
}

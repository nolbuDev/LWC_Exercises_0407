import { LightningElement, track, wire } from "lwc";
import getStudents from "@salesforce/apex/StudentBrowser.getStudents";

export default class StudentBrowser extends LightningElement {
	@wire(getStudents, { instructorId: "", courseDeliveryId: "" })
	students;

	constructor() {
		super();
	}
}

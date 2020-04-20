import { LightningElement, track, wire } from "lwc";
import getStudents from "@salesforce/apex/StudentBrowser.getStudents";
import { fireEvent } from "c/pubsub";
import { CurrentPageReference } from "lightning/navigation";

export default class StudentBrowser extends LightningElement {
	selectedDeliveryId = "";
	selectedInstructorId = "";

	@wire(CurrentPageReference) pageRef;

	@wire(getStudents, { instructorId: "$selectedInstructorId", courseDeliveryId: "$selectedDeliveryId" })
	students;

	constructor() {
		super();
	}

	handleFilterChange(event) {
		this.selectedDeliveryId = event.detail.deliveryId;
		this.selectedInstructorId = event.detail.instructorId;
	}

	handleStudentSelected(event) {
		const studentId = event.detail.studentId;
		this.updateSelectedStudent(studentId);
	}

	updateSelectedStudent(studentId) {
		fireEvent(this.pageRef, "studentChange", { studentId });
	}
}

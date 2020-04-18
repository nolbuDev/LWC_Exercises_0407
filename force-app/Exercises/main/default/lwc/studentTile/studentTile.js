import { LightningElement, api } from "lwc";

export default class StudentTile extends LightningElement {
	@api student = {
		Name: "Nolbu",
		PhotoUrl: "/services/images/photo/003B0FakePictId"
	};

	@api selectedStudentId = "";

	get tileSelected() {
		console.log("tileSelected", this.selectedStudentId, this.student.Id);
		return this.selectedStudentId === this.student.Id ? "tile selected" : "tile";
	}

	studentClick() {
		const evt = new CustomEvent("studentselected", {
			detail: { studentId: this.student.Id }
		});
		this.dispatchEvent(evt);
	}
}

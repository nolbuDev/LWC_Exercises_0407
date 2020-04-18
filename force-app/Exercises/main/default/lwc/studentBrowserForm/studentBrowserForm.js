import { LightningElement, track, wire } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { encodeDefaultFieldValues } from "lightning/pageReferenceUtils";
import getInstructors from "@salesforce/apex/StudentBrowserForm.getInstructors";
import getDeliveriesByInstructor from "@salesforce/apex/StudentBrowserForm.getDeliveriesByInstructor";

export default class StudentBrowserForm extends NavigationMixin(LightningElement) {
	selectedInstructorId = "";
	selectedDeliveryId = "";
	error;
	isButtonDisabled = true;

	@track deliveries = [];
	@track instructors = [];

	@wire(getInstructors)
	wired_getInstructors({ error, data }) {
		this.instructors = [];
		if (data) {
			this.instructors.push({
				value: "",
				label: "Select an instructor"
			});
			data.forEach((instructor) => {
				this.instructors.push({
					value: instructor.Id,
					label: instructor.Name
				});
			});
		} else if (error) {
			this.error = error;
		}
	}

	@wire(getDeliveriesByInstructor, { instructorId: "$selectedInstructorId" })
	wire_getDeliveriesByInstructor({ error, data }) {
		this.deliveries = [];
		if (data && data.length) {
			this.deliveries.push({
				value: "",
				label: "Any Delivery"
			});
			data.forEach((delivery) => {
				this.deliveries.push({
					value: delivery.Id,
					label: `${delivery.Start_Date__c} ${delivery.Location__c} ${delivery.Attende_Count__c} students`
				});
			});
		} else if (error) {
			this.error = error;
		}
	}

	onInstructorChange(event) {
		this.selectedDeliveryId = "";
		this.selectedInstructorId = event.target.value;
		this.isButtonDisabled = this.selectedInstructorId === "";
		this.notifyParent();
	}

	onDeliveryChange(event) {
		this.selectedDeliveryId = event.target.value;
		this.notifyParent();
	}

	onAddNewDelivery() {
		let pageInfo = {
			type: "standard__objectPage",
			attributes: {
				objectApiName: "Course_Delivery__c",
				actionName: "new"
			},
			state: {
				defaultFieldValues: encodeDefaultFieldValues({
					Instructor__c: this.selectedInstructorId
				})
			}
		};
		this[NavigationMixin.Navigate](pageInfo);
	}

	notifyParent() {
		const evt = new CustomEvent("filterchange", {
			detail: {
				instructorId: this.selectedInstructorId,
				deliveryId: this.selectedDeliveryId
			}
		});
		this.dispatchEvent(evt);
	}
}

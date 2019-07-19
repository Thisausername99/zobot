import { Injectable } from '@angular/core';

import { triggerHanlderData, messageHanlderData, contextHanlderData , failHanlderData } from './formData.model';
import { WorkflowService } from '../build-flow/workflow.service';
import { STEPS } from '../build-flow/workflow.model';

@Injectable()
export class FormDataService {

    private formData: FormData = new FormData();
    private triggerStorage : triggerHanlderData;
    private isPersonalFormValid: boolean = false;
    private isWorkFormValid: boolean = false;
    private isAddressFormValid: boolean = false;

    constructor(private workflowService: WorkflowService) {
    }

    getTriggerData(): triggerHanlderData {
        // Return the Personal data
        let triggerData: triggerHanlderData = {
            welcome: this.triggerStorage.welcome,
            suggestion : this.triggerStorage.suggestion
        };
        return triggerData;
    }

    setPersonal(data: triggerHanlderData) {
        // Update the Personal data only when the Personal Form had been validated successfully
        this.isPersonalFormValid = true;
        this.triggerStorage.welcome = data.welcome;
        this.triggerStorage.suggestion = data.suggestion;
        // Validate Personal Step in Workflow
        this.workflowService.validateStep(STEPS.triggerCreate);
    }

    /*getWork() : string {
        // Return the work type
        return this.formData.message;
    }

    setWork(data: string) {
        // Update the work type only when the Work Form had been validated successfully
        this.isWorkFormValid = true;
        this.formData.work = data;
        // Validate Work Step in Workflow
        this.workflowService.validateStep(STEPS.work);
    }

    getAddress() : Address {
        // Return the Address data
        var address: Address = {
            street: this.formData.street,
            city: this.formData.city,
            state: this.formData.state,
            zip: this.formData.zip
        };
        return address;
    }

    setAddress(data: Address) {
        // Update the Address data only when the Address Form had been validated successfully
        this.isAddressFormValid = true;
        this.formData.street = data.street;
        this.formData.city = data.city;
        this.formData.state = data.state;
        this.formData.zip = data.zip;
        // Validate Address Step in Workflow
        this.workflowService.validateStep(STEPS.address);
    }

    getFormData(): FormData {
        // Return the entire Form Data
        return this.formData;
    }

    resetFormData(): FormData {
        // Reset the workflow
        this.workflowService.resetSteps();
        // Return the form data after all this.* members had been reset
        this.formData.clear();
        this.isPersonalFormValid = this.isWorkFormValid = this.isAddressFormValid = false;
        return this.formData;
    }*/

    isFormValid() {
        // Return true if all forms had been validated successfully; otherwise, return false
        return this.isPersonalFormValid &&
                this.isWorkFormValid &&
                this.isAddressFormValid;
    }
}

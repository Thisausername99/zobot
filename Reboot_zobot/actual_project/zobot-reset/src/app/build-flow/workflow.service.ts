import { Injectable } from '@angular/core';
import { STEPS } from '../build-flow/workflow.model';

@Injectable()
export class WorkflowService {
    private workflow = [
        { step: STEPS.triggerCreate, valid: false },
        { step: STEPS.msgHandlerCreate, valid: false },
        { step: STEPS.ctxtHanlderCreate, valid: false },
        { step: STEPS.failHanlderCreate, valid: false }
    ];

    validateStep(step: string) {
        // If the state is found, set the valid field to true
        var found = false;
        for (var i = 0; i < this.workflow.length && !found; i++) {
            if (this.workflow[i].step === step) {
                found = this.workflow[i].valid = true;
            }
            else
              alert("stop");
        }
    }

    resetSteps() {
        // Reset all the steps in the Workflow to be invalid
        this.workflow.forEach(element => {
            element.valid = false;
        });
    }

    getFirstInvalidStep(step: string) : string {
        // If all the previous steps are validated, return blank
        // Otherwise, return the first invalid step
        var found = false;
        var valid = true;
        var redirectToStep = '';
        for (var i = 0; i < this.workflow.length && !found && valid; i++) {
            let item = this.workflow[i];
            if (item.step === step) {
                found = true;
                redirectToStep = '';
            }
            else {
                valid = item.valid;
                redirectToStep = item.step
            }
        }
        return redirectToStep;
    }
}

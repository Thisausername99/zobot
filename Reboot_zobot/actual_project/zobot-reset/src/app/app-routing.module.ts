import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TriggerHandlerComponent} from './trigger-handler/trigger-handler.component';
import {MessageHandlerComponent} from './message-handler/message-handler.component';
import { WorkflowGuard } from './build-flow/workflow-guard.service';
import { WorkflowService } from './build-flow/workflow.service';
import { AppComponent } from './app.component';


const appRoutes: Routes = [
  //{ path : '', component: AppComponent , canActivate: [WorkflowGuard]},
  { path: 'trigger', component: TriggerHandlerComponent, canActivate: [WorkflowGuard]},
   { path: 'message', component: MessageHandlerComponent, canActivate: [WorkflowGuard]},
   { path: 'trigger/edit', component: MessageHandlerComponent, canActivate: [WorkflowGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false, // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [WorkflowGuard , WorkflowService]
})
export class AppRoutingModule { }

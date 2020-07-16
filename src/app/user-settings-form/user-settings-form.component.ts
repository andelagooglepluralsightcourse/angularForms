import { Component, OnInit } from '@angular/core';
import { UserSettings } from '../data/user-settings';
import { NgForm } from '@angular/forms';

import { DataService } from '../data/data.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {

  originalUserSettings: UserSettings = {
    name: null,
    emailOffers: null,
    interfaceStyleType:null,
    subscriptionType: null,
    notes: null

  }

  userSettings: UserSettings = {...this.originalUserSettings}
  postError = false;
  postErrorMessage = '';
  subscriptionTypes: Observable<string[]>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.subscriptionTypes =  this.dataService.getSubscriptionTypes()
  }

  onHttpError(errorResponse: any) {
    console.log('error', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;

  }

  onSubmit(form: NgForm){
    console.log('in onSubmit: ', form.valid );
    if (form.valid) {
      this.dataService.postUserSettingForm(this.userSettings).subscribe(
        result => console.log(result),
        error => this.onHttpError(error)
      )
    } else {
      this.postError =  true;
      this.postErrorMessage = "Please fix the above errors"
    }

  }

  onBlur(field: NgForm ){
    console.log('in onBlur: ', field.valid)
  }

}

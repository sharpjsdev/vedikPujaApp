import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private formData: any;
  private count: any;

  constructor() { }

  setFormData(data: any) {
    this.formData = data;
  }

  getFormData() {
    return this.formData;
  }

  setNoteCount(count:any) {
    this.count = count;
  }
  getNoteCount() {
    return this.count;
  }

}

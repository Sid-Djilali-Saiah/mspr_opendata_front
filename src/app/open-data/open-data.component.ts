import { Component, OnInit } from '@angular/core';
import { OpenDataService } from '../core/services/open-data.service';
import { Observable } from 'rxjs';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import { AngularFileUploaderConfig } from 'angular-file-uploader';

@UntilDestroy()
@Component({
  selector: 'app-recipe-page',
  templateUrl: './open-data.component.html',
  styleUrls: ['./open-data.component.scss'],
})
export class OpenDataComponent implements OnInit {

  afuConfig: AngularFileUploaderConfig = {
    multiple: false,
    formatsAllowed: ".csv",
    maxSize: 5,
    uploadAPI:  {
      url:"https://api-opendata.nonstopintegration.ml/api/opendata/import",
      method:"POST",
      responseType: 'application/json'
    }
  };
  data$: Observable<any>;
  selectedOptions = [];

  constructor(private openDataService: OpenDataService) {}

  ngOnInit(): void {
    this.data$ = this.openDataService.list();
  }

  download(): void {
    if (this.selectedOptions.length > 0) {
      this.openDataService.download(this.selectedOptions).pipe(
        untilDestroyed(this),
      ).subscribe(data => {
        const link: HTMLAnchorElement = window.document.createElement('a');
        link.href = URL.createObjectURL(data);
        link.target = '_blank';
        link.download = 'data.pdf';
        link.click();
      });
    }
  }
}

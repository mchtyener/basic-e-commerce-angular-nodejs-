import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient, private endpointService: EndpointService) { }

  uploadsFile(files: File[]): Observable<any> {
    const uploadFormData: FormData = new FormData();

    files.forEach(file => {
      uploadFormData.append('file', file);
    });

    const url = this.endpointService.buildUrl('upload');
    return this.http.post<any>(url, uploadFormData)
  }
}


import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DifferentialService {
  apiEndPoint = "http://localhost:3000/api";
  differentialResults;
  constructor(private http: HttpClient) {}

  calculateDifferential(formData) {
    let headers = new HttpHeaders();
    /** In Angular 5, including the header Content-Type can invalidate your request */
    headers.append("Content-Type", "multipart/form-data");
    headers.append("Accept", "application/json");
    let options = { headers: headers };
    return this.http.post(
      `${this.apiEndPoint}/differential`,
      formData,
      options
    );
  }
}

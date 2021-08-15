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
    headers.append("Content-Type", "multipart/form-data");
    headers.append("Accept", "application/json");
    let options = { headers: headers };
    return this.http.post(
      `${this.apiEndPoint}/differential`,
      formData,
      options
    );
  }
  sort(list, selectedSort) {
    return list.sort((a, b) => {
      if (typeof a[selectedSort] === "string") {
        return a[selectedSort].localeCompare(b[selectedSort]);
      }
      if (typeof a[selectedSort] === "number") {
        return b[selectedSort] - a[selectedSort];
      }
    });
  }
}

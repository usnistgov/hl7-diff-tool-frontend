import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DifferentialService {
  apiEndPoint = environment.api_url;

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
  calculateVerificationDifferential(formData) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");
    headers.append("Accept", "application/json");
    let options = { headers: headers };
    return this.http.post(
      `${this.apiEndPoint}/differential/verification`,
      formData,
      options
    );
  }
  sort(list, selectedSort) {
    // return list.sort(this.customSort(selectedSort));

    if (selectedSort === "globalPath") {
      console.log("---", selectedSort);
      return list.sort(this.customSort(selectedSort));
    } else {
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
  // Custom sorting function
  customSort = (fieldName: string) => (a, b) => {
    const pathA = String(a[fieldName]).split(".").map(Number);
    const pathB = String(b[fieldName]).split(".").map(Number);

    const minLength = Math.min(pathA.length, pathB.length);

    for (let i = 0; i < minLength; i++) {
      if (pathA[i] < pathB[i]) {
        return -1;
      }

      if (pathA[i] > pathB[i]) {
        return 1;
      }
    }

    if (pathA.length < pathB.length) {
      return -1;
    }

    if (pathA.length > pathB.length) {
      return 1;
    }

    return 0;
  };
}

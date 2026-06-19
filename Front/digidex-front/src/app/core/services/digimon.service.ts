import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { DigimonOption } from "../../shared/interfaces/digimon-option.interface";
import { environment } from "../../../environments/environment";
import { Digimon } from "../../shared/interfaces/digimon.interface";

@Injectable({
  providedIn: 'root'
})
export class DigimonService {

  private readonly http = inject(HttpClient);

  private readonly api =
  `${environment.apiUrl}/digimons`;

  findAll() {
    return this.http.get<DigimonOption[]>(
      this.api
    );
  }

  listDigimon() {

    return this.http.get<Digimon[]>(
      `${this.api}/buscar-listaDigimon`
    );
  }

  findById(id: string) {
    return this.http.get<DigimonDetail>(
      `${this.api}/${id}`
    );
  }

  create(formData: FormData) {
    console.log(formData);
    return this.http.post<string>(
        this.api,
        formData
    );
  }
}
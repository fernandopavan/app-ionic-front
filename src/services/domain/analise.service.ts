import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { AnaliseDTO } from "../../models/analise.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class AnaliseService {

    constructor(public http: HttpClient) {
    }

    findAll(): Observable<AnaliseDTO[]> {
        return this.http.get<AnaliseDTO[]>(`${API_CONFIG.baseUrl}/analises`);
    }

    findAllPaginate(page: number = 0, linesPerPage: number = 20) {
        return this.http.get(`${API_CONFIG.baseUrl}/analises/?page=${page}&linesPerPage=${linesPerPage}`);
    }

    novaAnalise() {
        return this.http.get(`${API_CONFIG.baseUrl}/analises/iniciar`);
    }
}

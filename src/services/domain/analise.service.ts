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

    findByUser(usuario_id: number, page: number = 0, linesPerPage: number = 24) {
        return this.http.get(`${API_CONFIG.baseUrl}/analises/?usuario=${usuario_id}&page=${page}&linesPerPage=${linesPerPage}`);
    }
}

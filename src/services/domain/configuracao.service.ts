import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { ConfiguracaoDTO } from "../../models/configuracao.dto";

@Injectable()
export class ConfiguracaoService {

    constructor(public http: HttpClient) {
    }

    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/configuracao/${id}`);
    }

    insert(obj: ConfiguracaoDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/configuracao`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    put(obj: ConfiguracaoDTO) {
        return this.http.put(
            `${API_CONFIG.baseUrl}/configuracao/1`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}

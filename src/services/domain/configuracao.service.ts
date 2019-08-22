import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { ConfiguracaoDTO } from "../../models/configuracao.dto";

@Injectable()
export class ConfiguracaoService {

    constructor(public http: HttpClient) {
    }

    insert(obj: ConfiguracaoDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/analises`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}

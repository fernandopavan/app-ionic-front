import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UsuarioDTO } from "../../models/usuario.dto";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class UsuarioService {

    constructor(
        public http: HttpClient) {
    }

    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/usuarios/${id}`);
    }
    
    findByEmail(email: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/usuarios/email?value=${email}`);
    }

    insert(obj : UsuarioDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/usuarios`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnaliseService } from '../../services/domain/analise.service';
import { VisaoGeralDTO } from '../../models/visao_geral.dto';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-visao-geral',
  templateUrl: 'visao-geral.html',
})
export class VisaoGeralPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: VisaoGeralDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public analiseService: AnaliseService) {
  }

  ionViewDidLoad() {
    this.analiseService.findAll()
      .subscribe(response => {
        this.items = response;
      },
      error => {});
  }

  showAnalises(tipo : string) {
    this.navCtrl.push('AnalisePage', {tipo: tipo});    
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ConfiguracaoDTO } from '../../models/configuracao.dto';
import { ConfiguracaoService } from '../../services/domain/configuracao.service';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-configuracao',
  templateUrl: 'configuracao.html',
})
export class ConfiguracaoPage {

  configuracao: ConfiguracaoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public configuracaoService: ConfiguracaoService,
    public sanitizer: DomSanitizer) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    // let localUser = this.storage.getLocalUser();

    // if (localUser && localUser.email) {
    //   this.configuracaoService.find(localUser.email)
    //     .subscribe(response => {
    //       this.configuracao = response as ConfiguracaoDTO;
    //     },
    //     error => {
    //       if (error.status == 403) {
    //         this.navCtrl.setRoot('HomePage');
    //       }
    //     });
    // }
    // else {
    //   this.navCtrl.setRoot('HomePage');
    // }    
  }

}

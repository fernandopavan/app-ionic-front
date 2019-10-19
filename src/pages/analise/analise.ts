import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnaliseDTO } from '../../models/analise.dto';
import { ConfiguracaoDTO } from '../../models/configuracao.dto';
import { AnaliseService } from '../../services/domain/analise.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ConfiguracaoService } from '../../services/domain/configuracao.service';

@IonicPage()
@Component({
  selector: 'page-analise',
  templateUrl: 'analise.html',
})
export class AnalisePage {

  configuracao: ConfiguracaoDTO;
  items: AnaliseDTO[] = [];
  page: number = 0;
  tipo: string;
  titulo: string;
  temAquecedor: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public analiseService: AnaliseService,
    public loadingCtrl: LoadingController,
    public configuracaoService: ConfiguracaoService) {

    this.tipo = this.navParams.get('tipo');
    if (this.tipo == 'ph') {
      this.titulo = "pH";
    } else if (this.tipo == 'temperatura') {
      this.titulo = "Temperatura";
    } else if (this.tipo == 'turbidez') {
      this.titulo = "Turbidez";
    } else {
      this.titulo = "Cloro";
    }
  }

  ionViewDidLoad() {
    this.loadConfiguracao();
    this.loadData();
  }

  loadData() {
    let loader = this.presentLoading();
    this.analiseService.findAllPaginate(this.page, 10)
      .subscribe(response => {
        this.items = this.items.concat(response['content']);
        loader.dismiss();
      },
        error => {
          loader.dismiss();
        });
  }

  loadConfiguracao() {
    this.configuracaoService.findById("1").subscribe(response => {
      this.configuracao = response as ConfiguracaoDTO;
      this.temAquecedor = this.configuracao.temAquecedor;
    },
      error => {
      });
  }

  aquecer() {
    this.analiseService.aquecerPiscina()
      .subscribe(response => {
        this.notify('Aquecimento da piscina em andamento');
      },
        error => { });
  }

  notify(msg: string) {
    let alert = this.alertCtrl.create({
      title: 'Aviso!',
      message: msg,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}

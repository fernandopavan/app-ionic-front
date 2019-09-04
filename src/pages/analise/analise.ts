import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnaliseDTO } from '../../models/analise.dto';
import { AnaliseService } from '../../services/domain/analise.service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@IonicPage()
@Component({
  selector: 'page-analise',
  templateUrl: 'analise.html',
})
export class AnalisePage {

  items: AnaliseDTO[] = [];
  page: number = 0;
  tipo: string;
  titulo: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public analiseService: AnaliseService,
    public loadingCtrl: LoadingController) {

    this.tipo = this.navParams.get('tipo');
    if (this.tipo == 'ph') {
      this.titulo = "pH";
    }else if (this.tipo == 'temperatura') {
      this.titulo = "Temperatura";
    } else if (this.tipo == 'turbidez') {
      this.titulo = "Turbidez";
    } else {
      this.titulo = "Cloro";
    }
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let usuario_id = 1;
    console.log(this.tipo);

    let loader = this.presentLoading();
    // this.analiseService.findByUser(usuario_id, this.page, 10)
    this.analiseService.findAll()
      .subscribe(response => {
        // this.items = this.items.concat(response['content']);
        this.items = this.items.concat(response);
        loader.dismiss();
      },
        error => {
          loader.dismiss();
        });
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

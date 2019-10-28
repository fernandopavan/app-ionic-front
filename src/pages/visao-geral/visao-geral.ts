import { Component, ViewChild, ElementRef, LOCALE_ID } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnaliseService } from '../../services/domain/analise.service';
import { VisaoGeralDTO } from '../../models/visao_geral.dto';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Chart } from "chart.js";
import { DatePipe, registerLocaleData  } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@IonicPage()
@Component({
  selector: 'page-visao-geral',
  templateUrl: 'visao-geral.html',
  providers: [DatePipe, { provide: LOCALE_ID, useValue: "pt" }]
})
export class VisaoGeralPage {

  @ViewChild("phCanvas") phCanvas: ElementRef;
  @ViewChild("cloroCanvas") cloroCanvas: ElementRef;
  @ViewChild("turbidezCanvas") turbidezCanvas: ElementRef;
  @ViewChild("temperaturaCanvas") temperaturaCanvas: ElementRef;

  graficoDados: VisaoGeralDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public analiseService: AnaliseService,
    public datePipe: DatePipe) {
  }

  ionViewDidLoad() {    
    this.loadData();
  }

  loadData(){
    this.analiseService.findAllPaginate(0, 5)
      .subscribe(response => {
        this.graficoDados = response['content'];
        this.carregaGrafico();
      },
        error => {
          this.notify('Não foi possível carregar os dados');
        });
  }

  showAnalises(tipo: string) {
    this.navCtrl.push('AnalisePage', { tipo: tipo });
  }

  iniciarTratamento() {
    this.analiseService.novaAnalise()
      .subscribe(response => {
        this.notify('Novo tratamento em andamento');
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

  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 3000);
  }

  carregaGrafico() {
    this.phCanvas = new Chart(this.phCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: this.graficoDados.map(a => a.dataLeitura ? a.dataLeitura.substring(0,5) + " " + a.dataLeitura.substring(11,16) : ''),
        datasets: [
          {
            label: "",
            data: this.graficoDados.map(a => a.ph),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });

    this.cloroCanvas = new Chart(this.cloroCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: this.graficoDados.map(a => a.dataLeitura ? a.dataLeitura.substring(0,5) + " " + a.dataLeitura.substring(11,16) : ''),
        datasets: [
          {
            label: "",
            data: this.graficoDados.map(a => a.condutividade),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1
          }
        ]
      }
    });

    this.turbidezCanvas = new Chart(this.turbidezCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: this.graficoDados.map(a => a.dataLeitura ? a.dataLeitura.substring(0,5) + " " + a.dataLeitura.substring(11,16) : ''),
        datasets: [
          {
            label: "",
            data: this.graficoDados.map(a => a.turbidez),
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1
          }
        ]
      }
    });

    this.temperaturaCanvas = new Chart(this.temperaturaCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: this.graficoDados.map(a => a.dataLeitura ? a.dataLeitura.substring(0,5) + " " + a.dataLeitura.substring(11,16) : ''),
        datasets: [
          {
            label: "",
            data: this.graficoDados.map(a => a.temperaturaNovo != null ? a.temperaturaNovo : a.temperatura),
            backgroundColor: "rgba(255, 159, 64, 0.2)",
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 1
          }
        ]
      }
    });
  }


}

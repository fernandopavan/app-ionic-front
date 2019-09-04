import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnaliseService } from '../../services/domain/analise.service';
import { VisaoGeralDTO } from '../../models/visao_geral.dto';
import { API_CONFIG } from '../../config/api.config';
import { Chart } from "chart.js";

@IonicPage()
@Component({
  selector: 'page-visao-geral',
  templateUrl: 'visao-geral.html',
})
export class VisaoGeralPage implements OnInit {
  
  @ViewChild("phCanvas") phCanvas: ElementRef;
  @ViewChild("cloroCanvas") cloroCanvas: ElementRef;
  @ViewChild("turbidezCanvas") turbidezCanvas: ElementRef;
  @ViewChild("temperaturaCanvas") temperaturaCanvas: ElementRef;

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: VisaoGeralDTO[];
  // private phCanvas: Chart;
  // private cloroCanvas: Chart;
  // private turbidezCanvas: Chart;
  // private temperaturaCanvas: Chart;

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
  
  ngOnInit() {
    this.phCanvas = new Chart(this.phCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: ["11/06", "16/06", "23/06", "30/06", "10/07"],
        datasets: [
          {
            label: "",
            data: [12, 19, 3, 5, 2, 3],
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
        labels: ["11/06", "16/06", "23/06", "30/06", "10/07"],
        datasets: [
          {
            label: "",
            data: [12, 19, 3, 5, 2, 3],
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
        labels: ["11/06", "16/06", "23/06", "30/06", "10/07"],
        datasets: [
          {
            label: "",
            data: [12, 19, 3, 5, 2, 3],
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
        labels: ["11/06", "16/06", "23/06", "30/06", "10/07"],
        datasets: [
          {
            label: "",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: "rgba(255, 159, 64, 0.2)",
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 1
          }
        ]
      }
    });
  }


}

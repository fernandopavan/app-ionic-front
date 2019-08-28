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
  
  @ViewChild("barCanvas") barCanvas: ElementRef;

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: VisaoGeralDTO[];
  private barChart: Chart;

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
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
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
  }
}

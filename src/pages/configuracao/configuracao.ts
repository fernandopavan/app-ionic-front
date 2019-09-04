import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfiguracaoDTO } from '../../models/configuracao.dto';
import { ConfiguracaoService } from '../../services/domain/configuracao.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@IonicPage()
@Component({
  selector: 'page-configuracao',
  templateUrl: 'configuracao.html',
})
export class ConfiguracaoPage {

  formGroup: FormGroup;
  configuracao: ConfiguracaoDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public configuracaoService: ConfiguracaoService,
    public sanitizer: DomSanitizer) {

    this.formGroup = this.formBuilder.group({
      capacidadeLitros: ['', [Validators.required]],
      periodoRepeticao: ['', [Validators.required]],
      horarioPrevisto: ['', [Validators.required]],
    });
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    this.configuracaoService.findById("1")
      .subscribe(response => {
        this.configuracao = response as ConfiguracaoDTO;
        
        let periodo = '';
        if (this.configuracao.periodoRepeticao == 'UM_AO_DIA') {
          periodo = '0';
        } else if (this.configuracao.periodoRepeticao == 'TRES_POR_SEMANA') {
          periodo = '1';
        } else {
          periodo = '2';
        }

        this.formGroup = this.formBuilder.group({
          capacidadeLitros: [this.configuracao.capacidadeLitros, [Validators.required]],
          periodoRepeticao: [periodo, [Validators.required]],
          horarioPrevisto: [this.configuracao.horarioPrevisto, [Validators.required]],
        });
      },
        error => {
        });

  }

  save() {
    this.configuracaoService.insert(this.formGroup.value)
      .subscribe(response => {
        this.success();
      },
        error => { });
  }

  update() {
    this.configuracaoService.put(this.formGroup.value)
      .subscribe(response => {
        this.success();
      },
        error => { });
  }

  success() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('ConfiguracaoPage');
          }
        }
      ]
    });
    alert.present();
  }

}

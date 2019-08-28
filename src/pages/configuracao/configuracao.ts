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
      capacidadeLitros: ['1', [Validators.required ]],
      periodoRepeticao: ['2', [Validators.required ]],
      horarioPrevisto : ['3', [Validators.required ]],
    });
  }

  //new Date().toISOString()
  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    this.configuracaoService.findById("1")
      .subscribe(response => {
        this.configuracao = response as ConfiguracaoDTO;
      },
        error => {
        });
  
  }

  save() {
    this.configuracaoService.insert(this.formGroup.value)
      .subscribe(response => {
        this.success();
      },
      error => {});
  }

  update() {
    this.configuracaoService.put(this.formGroup.value)
      .subscribe(response => {
        this.success();
      },
      error => {});
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
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

}

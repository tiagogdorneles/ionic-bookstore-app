import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonItemSliding, ToastController } from '@ionic/angular';
import { Livro } from './livro.model';
import { LivroService } from './livro.service';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.page.html',
  styleUrls: ['./livros.page.scss'],
})
export class LivrosPage implements OnInit {

  livros: Livro[];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private livroService: LivroService,
    private routerService: Router
  ) { }

  ngOnInit() {
  }

  listar() {
    this.livroService
      .getLivros()
      .subscribe(
        (dados) => {
          this.livros = dados;
        },
        (erro) => {
          console.error(erro);
        }
      );
  }

  confirmarExclusao(livro: Livro) {

    this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o livro ${livro.titulo}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.excluir(livro);
          }
        },
        'Não'
      ]
    }).then(alerta => alerta.present());

  }

  editar(livro: Livro, itemSliding: IonItemSliding) {
    this.routerService.navigate(['./livros/edicao', livro.id]);
    itemSliding.close();
  }

  private excluir(livro: Livro) {
    this.livroService
      .excluir(livro.id)
      .subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController.create({
            message: `Não foi possível excluir o livro ${livro.titulo}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger'
          }).then(t => t.present());
        }
      );
    
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.listar();
  }
  
  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
  }

  ionViewDidLeave(){
    console.log('ionViewDidLeave');
  }

}

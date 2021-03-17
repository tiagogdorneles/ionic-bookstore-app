import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Autor } from './autor.model';
import { AutorService } from './autor.service';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.page.html',
  styleUrls: ['./autores.page.scss'],
})
export class AutoresPage implements OnInit {

  autores: Autor[];

  constructor(
    private alertController: AlertController,
    private autorService: AutorService
  ) {
    this.listar();
  }

  ngOnInit() {
  }

  listar() {
    this.autores = this.autorService.getAutores();
  }

  confirmarExclusao(autor: Autor) {

    this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o autor ${autor.nome}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.excluir(autor);
          }
        },
        'Não'
      ]
    }).then(alerta => alerta.present());

  }

  private excluir(autor: Autor) {
    this.autorService.excluir(autor.id);
    this.listar();
  }

}

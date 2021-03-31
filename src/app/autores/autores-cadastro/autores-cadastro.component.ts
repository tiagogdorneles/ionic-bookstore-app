import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Autor } from '../autor.model';
import { AutorService } from '../autor.service';
import { Genero } from '../genero.enum';

@Component({
  selector: 'app-autores-cadastro',
  templateUrl: './autores-cadastro.component.html',
  styleUrls: ['./autores-cadastro.component.scss'],
})
export class AutoresCadastroComponent implements OnInit {

  autor: Autor;
  mesesAbreviados = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];
  meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ];

  autoresForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private autorService: AutorService
  ) {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.autor = this.autorService.getAutor(id);
    } else {
      this.autor = {
        id: null,
        nome: '',
        dataNascimento: null,
        genero: Genero.FEMININO
      }
    }

    this.autoresForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
      dataNascimento: new FormControl(null),
      genero: new FormControl('F', Validators.required)
    });
   }

  ngOnInit() {}

  salvar() {
    console.log(this.autor);
    console.log(this.autoresForm.value);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Autor } from 'src/app/autores/autor.model';
import { AutorService } from 'src/app/autores/autor.service';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livros-cadastro',
  templateUrl: './livros-cadastro.component.html',
  styleUrls: ['./livros-cadastro.component.scss'],
})
export class LivrosCadastroComponent implements OnInit {

  private autores: Autor[];
  livroId: number;
  livrosForm: FormGroup;

  constructor(
    private autorService: AutorService,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private livroService: LivroService,
    private router: Router,
  ) {
    
    let livro = {
      id: null,
      titulo: ' ',
      isbn: ' ',
      numeroPaginas: null,
      autores: [],
      preco: null,
      logoUrl:' '
    };
    this.inicializaFormulario(livro);
   }

   ngOnInit() {
     const id = this.activatedRoute.snapshot.paramMap.get('id');
     this.autorService.getAutores().subscribe(autores => this.autores = autores);
     if (id) {
        this.livroId = parseInt(id);
        this.livroService
         .getLivro(this.livroId)
         .subscribe((livro) => {
           this.inicializaFormulario(livro);
         });
     }
   }

  

  inicializaFormulario(livro: Livro) {
    this.livrosForm = new FormGroup({
      titulo: new FormControl(livro.titulo, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
      isbn: new FormControl(livro.isbn, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
      numeroPaginas: new FormControl(livro.numeroPaginas, Validators.required),
      autores: new FormControl(livro.autores, Validators.required),
      preco: new FormControl(livro.preco, [Validators.required, Validators.min(0.01)]),
      logoUrl: new FormControl(livro.logoUrl, [Validators.required, Validators.minLength(7)])
    });
  }

  salvar() {
    const livro = {...this.livrosForm.value, id: this.livroId};
    this.livroService.salvar(livro).subscribe(
      () => this.router.navigate(['livros']),
      (erro) => {
        console.error(erro);
        this.toastController.create({
          message: `Não foi possível salvar o livro ${livro.titulo}`,
          duration: 5000,
          keyboardClose: true,
          color: 'danger'
        }).then(t => t.present());
      }
    );
    
  }

  get nome() {
    return this.livrosForm.get('titulo');
  }

}

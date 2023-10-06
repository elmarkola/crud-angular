import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {

  form= this.formBuilder.group({
    name:[''],
    category:['']
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location){
    //this.form
   }

   /*ngOnInit(): void {}

   onSubmit(){
    this.service.save(this.form.value);
    this.onCancel();
}*/

onSubmit() {
  this.service.save(this.form.value).subscribe(
    (response) => {
      // Trate a resposta do servidor com sucesso aqui
      this.onSuccess();
    },
    (error) => {
      // Trate os erros da solicitação aqui
      this.onError();
    }
  );
}


   onCancel(){
    this.location.back();
   }

   private onSuccess(){
    this._snackBar.open("salvo com sucesso",'',{duration:3000});
    this.onCancel();
  }

   private onError(){
    this._snackBar.open("erro ao salvar",'',{duration:3000});
   }
}

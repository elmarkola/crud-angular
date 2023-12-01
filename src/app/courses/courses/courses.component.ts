import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/components/error-dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  courses$: Observable<Course[]>;
  //displayedColumns = ['name', 'category','actions'];

  //coursesService: CoursesService;

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    //this.courses=[];
    // this.coursesService= new CoursesService();
    this.courses$ = this.coursesService.list().pipe(
      catchError((error) => {
        this.onError('erro ao carregar');
        return of([]);
      })
    );
  }

  refresh(){
    this.courses$ = this.coursesService.list().pipe(
      catchError((error) => {
        this.onError('erro ao carregar');
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  onAdd(){

    this.router.navigate(['new'],{relativeTo:this.route});
  }

  onEdit(course: Course){
    this.router.navigate(['edit',course.id],{relativeTo:this.route});
  }

  onRemove(course: Course){

      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: 'deseja remover esse curso?',
      });

      dialogRef.afterClosed().subscribe((result : boolean) => {
        if(result){
          this.coursesService.remove(course.id).subscribe(
            ()=>{
              this.refresh()
              this.snackBar.open('curso removido com sucesso',"X",{
                duration:3000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
              });
            },
            ()=>this.onError('erro ao remover curso')
              );
        }
      });


   }
}

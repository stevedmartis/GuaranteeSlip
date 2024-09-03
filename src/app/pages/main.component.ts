import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SingletonModel } from '@models/singleton.model';
import { UserContextService } from '../shared/services/user-context.service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public singletonModel: SingletonModel;

  constructor(
    private readonly userContextService: UserContextService,
    private router: Router
  ) {
    this.singletonModel = SingletonModel.getInstance();
  }

  ngOnInit() {
    this.getUserContext().then();
  }

  private async getUserContext() {
    await firstValueFrom(this.userContextService.refresh()).then((response) => {
      this.navigateToStep();
    }, (error) => {
      console.error("Error al obtener datos del contexto:", error);
    });
  }


  private navigateToStep(): void {
    this.router.navigate([`/boleta-garantia/stepA`], { queryParamsHandling: 'preserve' }).then();
  }
}
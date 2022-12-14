import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ParamsDetail } from '../model/state.models';
import { Vacanca } from '../model/vacanca.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { I18nService } from '../services/i18n.service';
import { VacancesService } from '../services/vacances.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnDestroy {

  vacances: Vacanca[] = []
  title: string = '';

  // subscription: Subscription;

  constructor(private vacancesService: VacancesService,
    private userService: UserService,
    private router: Router,
    private translateService: TranslateService,
    private i18nService: I18nService) {
      this.title = this.translateService.instant('list_vacanca');
      // this.subscription = this.translateService.get('list_vacanca').subscribe((text) => {
      //   this.title = text;
      // })
    }

  ionViewWillEnter() {
    this.vacancesService.getVacances().then((res) => {
      this.vacances = res;
      console.log(this.vacances);      
    });
    this.userService.getUser().then((user) => {
      console.log(user);
      this.userService.updateUserToken('test2');
    });
  }

  showDetails(vacanca: Vacanca) {
      const params: ParamsDetail = {
        id: vacanca.id!
      }
      this.vacancesService.setParamsDetail(params);
//    this.router.navigate([`/detail-vacanca/${vacanca.id}`]);
//    this.router.navigate([`/detail-vacanca`, {state: {data: vacanca}}]);
      this.router.navigate([`/detail-vacanca`]);
}

  goToNew() {
    this.router.navigate(['/new-vacanca'], { replaceUrl: true });
  }

  handleChange(lng: any) {
    console.log(lng);
    this.i18nService.setLanguage(lng.detail.value).subscribe(() => {
      this.title = this.translateService.instant('list_vacanca');
    });
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

}

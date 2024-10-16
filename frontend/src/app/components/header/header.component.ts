import { AsyncPipe, JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ROLES, RoleType } from '../../data/role';
import { NavbarItem } from '../../models/navbar';
import { AccountModalService } from '../../services/account-modal.service';
import { AuthService } from '../../services/auth.service';
import { BaskerModalService } from '../../services/basker-modal.service';
import { HeaderData, HeaderService } from '../../services/header.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, NgClass, NgIf, AsyncPipe, RouterLink, JsonPipe, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  navbarItems: NavbarItem[] = [];
  headers$!: Observable<HeaderData[]>;

  constructor(
    private headerService: HeaderService,
    public translateService: TranslateService,
    private accountModalService: AccountModalService,
    public userService: UserService,
    private basketModalService: BaskerModalService,
    private authService: AuthService) {
    let x: RoleType = this.userService.userInformation()?.role ?? ROLES.ROLE_DEFAULT
    this.headers$ = this.headerService.getHeadersByRole(x);
    this.translateService.addLangs(['en', 'tr',]);
    this.translateService.setDefaultLang('tr');
    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang?.match(/en|tr/) ? browserLang : 'tr');
  }

  setActive(item: any) {
    this.navbarItems.forEach(navItem => navItem.active = false);
    item.active = true;
  }

  openLoginModal() {
    this.accountModalService.openLoginModal()
  }
  openRegisterModal() {
    this.accountModalService.openRegisterModal()
  }

  logout() {
    this.authService.logout().subscribe()
  }

  openCart() {
    this.basketModalService.openModal()
  }

  openMyAccount() {
    this.basketModalService.openMyAccountModal()
  }

}

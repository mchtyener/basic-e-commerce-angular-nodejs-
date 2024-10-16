import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ROLES, RoleType } from '../data/role';

export interface SubHeaderData {
  title: string;
  subtitle: string;
  url: string;
}

export interface HeaderData {
  role: RoleType;
  title: string;
  subtitle: string;
  url: string;
  subHeaders?: SubHeaderData[];
}

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private headerData: HeaderData[] = [
    {
      role: ROLES.ROLE_ADMIN,
      title: 'Product',
      subtitle: 'Product',
      url: '/admin/product',
      subHeaders: [
        { title: 'System Settings', subtitle: 'Configure system settings', url: '/admin/dashboard/system-settings' },
        { title: 'User Preferences', subtitle: 'Set user preferences', url: '/admin/dashboard/user-preferences' }
      ]
    },
    {
      role: ROLES.ROLE_ADMIN,
      title: 'Restaurant',
      subtitle: 'Restaurant',
      url: '/admin/restaurant',
      subHeaders: [
        { title: 'System Settings', subtitle: 'Configure system settings', url: '/admin/dashboard/system-settings' },
        { title: 'User Preferences', subtitle: 'Set user preferences', url: '/admin/dashboard/user-preferences' }
      ]
    },
    {
      role: ROLES.ROLE_ADMIN,
      title: 'User',
      subtitle: 'Manage users and roles',
      url: '/admin/users',
      subHeaders: [
        { title: 'Add User', subtitle: 'Create a new user', url: '/admin/users/add' },
        { title: 'Role Assignments', subtitle: 'Assign roles to users', url: '/admin/users/roles' }
      ]
    },
    /*
  {
    role: ROLES.ROLE_USER,
    title: 'User Profile',
    subtitle: 'View and edit your profile',
    url: '/user/profile',
    subHeaders: [
      { title: 'Edit Profile', subtitle: 'Change your profile details', url: '/user/profile/edit' },
      { title: 'Change Password', subtitle: 'Update your password', url: '/user/profile/change-password' }
    ]
  },
  {
    role: ROLES.ROLE_USER,
    title: 'Orders',
    subtitle: 'Check your order history',
    url: '/user/orders',
    subHeaders: [
      { title: 'Order History', subtitle: 'View past orders', url: '/user/orders/history' },
      { title: 'Track Order', subtitle: 'Track your current orders', url: '/user/orders/track' }
    ]
  },
 
  {
    role: ROLES.ROLE_DEFAULT,
    title: 'Product',
    subtitle: 'Welcome to the platform',
    url: '/',
    subHeaders: []
  },
  {
    role: ROLES.ROLE_DEFAULT,
    title: 'Contact Us',
    subtitle: 'Reach out for support',
    url: '/contact',
    subHeaders: []
  }
    */
  ];


  private currentHeaderSubject: BehaviorSubject<HeaderData[]> = new BehaviorSubject<HeaderData[]>(this.headerData);
  currentHeader$: Observable<HeaderData[]> = this.currentHeaderSubject.asObservable();


  constructor() {

  }

  getHeadersByRole(role: RoleType): Observable<HeaderData[]> {
    return this.currentHeader$.pipe(
      map(headers => headers.filter(header => header.role === role))
    );
  }
}

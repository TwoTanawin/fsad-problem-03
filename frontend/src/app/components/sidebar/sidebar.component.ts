import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  navigation = [
    { name: 'Dashboard', icon: 'home', href: '#', current: true },
    { name: 'Team', icon: 'users', href: '#', current: false },
    { name: 'Projects', icon: 'folder', href: '#', current: false },
    { name: 'Calendar', icon: 'calendar', href: '#', current: false },
    { name: 'Documents', icon: 'document', href: '#', current: false },
    { name: 'Reports', icon: 'chart', href: '#', current: false },
  ];

  teams = [
    { name: 'Heroicons', initial: 'H' },
    { name: 'Tailwind Labs', initial: 'T' },
    { name: 'Workcation', initial: 'W' },
  ];

  classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }
}

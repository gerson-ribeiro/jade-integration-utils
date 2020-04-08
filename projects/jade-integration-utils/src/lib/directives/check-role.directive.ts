import { ElementRef, Directive, Input, Renderer2 } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Directive({
  selector: '[jiuCheckRole]'
})
export class CheckRoleDirective {
  @Input('checkRole') roles: string;

  constructor(el: ElementRef, renderer: Renderer2) {
    let user: any = StorageService.getSession('user');

    setTimeout(() => {
        if (user !== null && this.roles.indexOf(user.role.sigla) == -1) {
            renderer.setStyle(el.nativeElement, 'display', 'none');
        }
    }, 100);
  }
}

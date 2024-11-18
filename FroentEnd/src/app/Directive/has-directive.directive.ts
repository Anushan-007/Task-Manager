import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appHasDirective]',
  standalone: true
})
export class HasDirectiveDirective {

  private CurrentRole  = '';

  constructor(private templeteRef: TemplateRef<any>, private viewConatiner:ViewContainerRef ) {}

  @Input()set appHasRole(role:string){
    this.CurrentRole = role;
    this.updateView();
}

private updateView(){
  let Role = localStorage.getItem("Role");
  if (Role == this.CurrentRole) {
    this.viewConatiner.createEmbeddedView(this.templeteRef)
  }else{
    this.viewConatiner.clear();
  }
}

}

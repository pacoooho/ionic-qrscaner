import { Component, OnInit } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  componentes :  any[]=[];

  constructor(
    public dataLocal: DataLocalService,
    private dataService: DataLocalService
  ) {
 
  }
  ngOnInit(){
  this.dataService.getMenuOpts().subscribe(a=>{
    this.componentes=a;
     console.log(this.componentes[0][1][0].documentChange.document.fields.name.stringValue);
     console.log(this.componentes[0][1][0].documentChange.
      document.fields.rations.arrayValue.values[0].mapValue.fields.price.stringValue); 
  });
 
}

  enviarCorreo(){
    console.log('enviando correo');
 this.dataLocal.enviarCorreo();
  }

  abrirRegistro(registro){
    console.log('Registro ' ,registro);
 this.dataLocal.abrirRegistro(registro);
  }
}

import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { browser } from 'protractor';
import { File } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { HttpClient } from '@angular/common/http'
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  guardados: Registro[] = [];


  constructor(private storage: Storage,
    private navCtrl: NavController,
    private iab: InAppBrowser,
    private file: File,
    private emailComposer: EmailComposer,
    private http: HttpClient
    ) {
    // this.storage.get('registros').then(registros =>{
    //   this.guardados=registros || [];
    // }) 
    this.cargarStorage();
  }

  getMenuOpts() {
    return  this.http.get<any[]>('/assets/data/json2.json');
  }
///////////////////////////////////////////////////////////////////////
  async cargarStorage() {
    this.guardados = await this.storage.get('registros') || [];
  }

  async guardarRegistro(format: string, text: string) {

    await this.cargarStorage();

    const nuevoRegistro = new Registro(format, text);
    this.guardados.unshift(nuevoRegistro);

    console.log(this.guardados);
    this.storage.set('registros', this.guardados);
    // this.navCtrl.navigateForward('/tabs/tabs2');
    this.abrirRegistro(nuevoRegistro);

  }



  abrirRegistro(registro: Registro) {
    this.navCtrl.navigateForward('/tabs/tab2');
    console.log(registro.type);
    switch (registro.type) {
      case 'http':
        console.log('http');

        const browser = this.iab.create(registro.text, '_system');


        //   browser.on('loadstart').subscribe(event => {
        //     browser.insertCSS({ code: "body{color: red;" });
        //     console.log('CSS');
        //  });
        break;

      case 'geo':
        console.log('geo');
        this.navCtrl.navigateForward('/tabs/tab2/mapa/' + registro.text);
        break;
    }
  }

  enviarCorreo() {
    const arrTemp = [];
    const titulos = 'Tipo, Formato, Creado en, Texto\n';
    arrTemp.push(titulos);
    this.guardados.forEach(registro => {
      const linea = `${registro.type}, ${registro.format}, ${registro.created}, ${registro.text.replace(',', ' ')}\n`;
      arrTemp.push(linea);
    });
  


    this.crearArchivoFisico(arrTemp.join(''));

  }

  crearArchivoFisico(text: string) {
    this.file.checkFile(this.file.externalRootDirectory, 'registros.csv')
      .then(existe => {
        console.log('Existe archivo? ', existe);
        return this.escribirArchivo(text);

      })
      .catch(e => {
        return this.file.createFile(this.file.externalRootDirectory, 'registros.csv', false)
          .then(creado => {
            this.escribirArchivo(text);
          })
          .catch(e2 => {
            console.log(e2);
          })
      });
  }

  async escribirArchivo(text: string) {
    await this.file.writeExistingFile(this.file.externalRootDirectory, 'registros.csv', text);
    // console.log('archivo creado');
    const archivo = `${this.file.externalRootDirectory}/registros.csv`
    console.log(archivo);
    const email = {
      to: 'pacoooh@gmail.com',
      // cc: 'erika@mustermann.de',
      // bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        archivo
      ],
      subject: 'Backup de scans',
      body: 'Aqui tienen sus backups de los scans- <strong>ScanApp</strong>',
      isHtml: true
    };

    // Send a text message using default options
   this.emailComposer.open(email)
    ;
  }  
}

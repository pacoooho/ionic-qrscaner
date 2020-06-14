import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  swiperOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  }
  constructor(private barcodeScanner: BarcodeScanner,
    private dataLocal: DataLocalService
  ) { }


  ionViewDidEnter() {
    // console.log('viewDidEnter');
  }

  ionViewDidLeave() {
    // console.log('viewDidLeave');
  } 
  ionViewWillEnter() {
    // this.scan();
    // console.log('ViewWillEnter');
  }
  ionViewWillLeave() {
    // console.log('viewWillLeave');
  }

  scan() {

    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if (!barcodeData.cancelled) {
        this.dataLocal.guardarRegistro(barcodeData.format, barcodeData.text)
      }

    }).catch(err => {
      console.log('Error', err);
      this.dataLocal.guardarRegistro('QRCode', 'https://ionicframework.com/docs/v3/api/navigation/NavController/#viewDidLeave')

    });
  }

}

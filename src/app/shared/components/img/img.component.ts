import { Component, Input, Output, EventEmitter, OnChanges, OnInit, AfterViewInit, OnDestroy, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent/* implements OnChanges, OnInit, AfterViewInit, OnDestroy*/{

 // img:string = ' ';

 /**  @Input()
  set imgValue(img: string) {
    this.img = img; ---> escucha cambios especificos
    console.log('change just img => ', this.img)
  }*/

  @Input() img = '';
  @Output() loaded = new EventEmitter<string>();
  imgeDefault = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';
  //counter = 0;
  //counterFn: number | undefined;


  constructor() {
  //  console.log('constructor', 'imgValue =>', this.img);
   }

  //ngOnChanges(changes: SimpleChanges): void {
    //before render
    //console.log('ngOnChanges', 'imgValue =>', this.img);
    //console.log('changes', changes);
 // }

  /*ngOnInit(): void {
    //before render
    //async - fetch -- once time
   // console.log('ngOnInit', 'imgValue =>', this.img);
    /*this.counterFn = window.setInterval(() => {
      this.counter++;
      console.log('run counter');
    }, 1000);
  }*/

  //ngAfterViewInit(): void {
    //after render
   // console.log('ngAfterViewInit');
 // }

 // ngOnDestroy(): void {
    //before destroy
 //   console.log('ngOnDestroy');
    //window.clearInterval(this.counterFn);
 // }

  imgError() {
    this.img = this.imgeDefault;
  }

  imgLoaded(){
   // console.log('loaded hijo');
    this.loaded.emit(this.img);
  }
}

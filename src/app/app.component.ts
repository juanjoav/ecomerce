import { Component } from '@angular/core';

import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { FileService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  /* products: Product[] = [
    {
      id: '1',
      name: 'Product 1',
      image: 'https://picsum.photos/200/300',
      price: 100
    },
    {
      id: '2',
      name: 'Product 2',
      image: 'https://picsum.photos/200/300',
      price: 200
    },
    {
      id: '3',
      name: 'Product 3',
      image: 'https://picsum.photos/200/300',
      price: 300
    }
  ];*/
  token = '';
  imgRta = '';

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private fileService: FileService
  ) {}

  onLoaded(img: string) {
    console.log('loaded padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.usersService
      .create({
        name: 'juan',
        email: 'juan@gmail.com',
        password: '123456',
      })
      .subscribe((user) => {
        //console.log(user);
      });
  }

  login() {
    this.authService.login('test@gmail.com', '123456').subscribe((rta) => {
      this.token = rta.access_token;
      //console.log('token -->', this.token);
    });
  }
  /*
  getProfile () {
    this,this.authService.profile(this.token).subscribe((profile => {
      console.log("profile -->",profile);

    }));
  }*/

  downloadFile() {
    this.fileService
      .getFile(
        'my.pdf',
        'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
        'application/pdf'
      )
      .subscribe();
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.fileService.uploadFile(file).subscribe((rta) => {
        this.imgRta = rta.location;
      });
    }
  }
}

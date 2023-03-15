import { Component, OnInit} from '@angular/core';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{

  activeMenu = false;
  counter = 0;
 // token = '';
  profile: User | null = null;

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  constructor(public storeService: StoreService,
    private authService: AuthService) { }


  ngOnInit(): void {
        this.storeService.myCart$.subscribe(products => {
        this.counter = products.length;
    });
  }

  login() {
    this.authService.loginAndGet('john@mail.com', 'changeme')
    .subscribe((user) => {

      //this.token = rta.access_token;
     // console.log("token -->",this.token);
      this.profile = user;
    });
  }

  /*getProfile () {
    this,this.authService.profile(this.token).subscribe((profile => {
      console.log("profile -->",profile);
        this.profile = profile;
    }));
  }
*/
 /* ngOninit() : void{

  }*/
}

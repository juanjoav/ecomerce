import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { AuthService } from '../../../services/auth.service';
import { User } from 'src/app/models/user.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  activeMenu = false;
  counter = 0;
  // token = '';
  profile: User | null = null;
  categories: Category[] = [];

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  constructor(
    public storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
    this.getAllCategories();
  }

  login() {
    this.authService
      .loginAndGet('admin@mail.com', 'admin123')
      .subscribe((user) => {
        //this.token = rta.access_token;
        console.log("token -->",user);
        this.profile = user;
      });
  }

  getAllCategories() {
    this.categoriesService.getAll().subscribe((data) => {
      this.categories = data;
    });
  }

  logout() {
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
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

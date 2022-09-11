import { Injectable } from '@angular/core';
import { User } from 'src/app/authentication/user';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  users: User[] = [
    { username: "Varisha Ajaz", password: '1' }]

  user: object[]

  constructor() { }

  authenticateUser(credentials) {
    this.user = this.users.filter(
      items => items.username == credentials.username && items.password == credentials.password
    );
    console.log(this.user)
    if (this.user[0]) {
      localStorage.setItem('currentUser', "loggedin");
      return true;
    }
    else {
      return false;
    }
  }

  registerUser(user) {
    this.users.push({ username: user.username, password: user.password });
    console.log(this.users, 'users')
  }
}

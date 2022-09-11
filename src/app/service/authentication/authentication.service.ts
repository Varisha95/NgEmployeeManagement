import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  users = [
    { username: "Varisha Ajaz", password: 1 },
    { username: "User2", password: 2 },
    { username: "User3", password: 3 }]

  user: object[]

  constructor() { }

  authenticateUser(credentials) {
    debugger
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

  registerUser(user){
this.users.push({username: user.username, password:user.password});
console.log(this.users,'users')
  }
}

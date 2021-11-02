import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  /** 
   * Usage: 
   * 
   * let user1:User = new User('Peter', 'peter@gmail.com');
   * this.userService.currentUser.next(user1);
   * 
   * Elsewhere:
   * 
   * this.userService.currentUser.subscribe((user) => {
   *    console.log('Current user', user.name);
   * })
  */
  currentUser: Subject<User> = new BehaviorSubject<User>(new User());

  public setCurrentUser(newUser: User){
    this.currentUser.next(newUser);
  }
}

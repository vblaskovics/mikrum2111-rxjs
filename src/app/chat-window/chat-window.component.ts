import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { Message } from '../message/message.model';
import { MessagesService } from '../message/messages.service';
import { Thread } from '../thread/thread.model';
import { ThreadService } from '../thread/thread.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
})
export class ChatWindowComponent implements OnInit, OnDestroy {
  messages: Observable<any>;
  currentThread: Thread;
  currentUser: User;

  draftMessage: Message;
  unSubNotifier = new Subject(); 

  constructor(
    public messagesService: MessagesService,
    public threadService: ThreadService,
    public userService: UserService,
    public el: ElementRef
  ) {
    this.currentThread = new Thread();
    this.currentUser = new User();
    this.draftMessage = new Message();

    this.messages = this.threadService.currentThreadMessages;

    this.threadService.currentThread
      .pipe(
        takeUntil(this.unSubNotifier),
        tap(() => {
          setTimeout(() => {
            this.scrollToBottom();
          });
        })
      )
      .subscribe((thread: Thread) => {
        this.currentThread = thread;
      });

    this.userService.currentUser.pipe(
      takeUntil(this.unSubNotifier),
    ).subscribe((user: User) => {
      this.currentUser = user;
    });

    // this.messages.subscribe((message:Message) => {
    //   setTimeout(() => {
    //     this.scrollToBottom();
    //   })
    // })

    // Scroll down when a new message arrives
    this.messagesService.newMessages
      .pipe(
        filter(
          (message: Message) => message?.thread?.id === this.currentThread?.id
        )
      )
      .subscribe((message: Message) => {
        setTimeout(() => {
          this.scrollToBottom();
        });
      });
  }

  ngOnInit(): void {}
  
  ngOnDestroy(): void {
    this.unSubNotifier.next();
    this.unSubNotifier.complete();
  }

  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }

  sendMessage(): void {
    const m: Message = this.draftMessage;
    m.author = this.currentUser;
    m.thread = this.currentThread;
    m.isRead = true;
    this.messagesService.addMessage(m);
    this.draftMessage = new Message();
  }

  scrollToBottom(): void {
    const scrollPane: any = this.el.nativeElement.querySelector(
      '.msg-container-base'
    );
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }
}

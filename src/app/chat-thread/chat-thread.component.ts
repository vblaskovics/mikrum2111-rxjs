import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Thread } from '../thread/thread.model';
import { ThreadService } from '../thread/thread.service';

@Component({
  selector: 'app-chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.css'],
})
export class ChatThreadComponent implements OnInit, OnDestroy {
  @Input() thread!: Thread;
  selected: boolean = false;
  currentThreadSubscription!: Subscription;

  constructor(public threadService: ThreadService) {}

  ngOnInit(): void {
    this.currentThreadSubscription = this.threadService.currentThread.subscribe(
      (currentThread: Thread) => {
        this.selected = currentThread?.id === this.thread?.id;
      }
    );
  }

  ngOnDestroy(): void {
    this.currentThreadSubscription.unsubscribe();
  }

  clicked(event: any): void {
    this.threadService.setCurrentThread(this.thread);
    event.preventDefault();
  }
}

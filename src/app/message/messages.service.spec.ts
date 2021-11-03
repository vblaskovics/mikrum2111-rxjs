import { TestBed } from '@angular/core/testing';
import { Thread } from '../thread/thread.model';
import { User } from '../user/user.model';
import { Message } from './message.model';

import { MessagesService } from './messages.service';

describe('MessagesService', () => {
  let service: MessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('custom test', () => {
    const user: User = new User('Ferenc', '');
		const thread: Thread = new Thread('t1', 'Ferenc', '');
		const m1: Message = new Message({
			author: user,
			text: 'Helló!',
			thread: thread
		});

		const m2: Message = new Message({
			author: user,
			text: 'Viszlát!',
			thread: thread
		});

    const messageService:MessagesService = new MessagesService();

    messageService.newMessages.subscribe((message:Message) => {
      console.log('newMessages, message.text:', message.text);
    });
    
    messageService.addMessage(m1);
    messageService.addMessage(m2);
    
    messageService.messages.subscribe((messages:Message[]) => {
      console.log('messages, messages.length:', messages.length);
    })
    



    expect(service).toBeTruthy();
  });
});

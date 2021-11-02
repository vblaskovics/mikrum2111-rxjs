import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChatNavBarComponent } from './chat-nav-bar/chat-nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatNavBarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

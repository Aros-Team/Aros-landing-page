import { Component } from '@angular/core';
import { Project } from './project/project';
import { TopBar } from './top-bar/top-bar';
import { Collaborator } from './collaborator/collaborator';
import { Chat } from './chat/chat';

@Component({
  selector: 'app-root',
  imports: [ Project, TopBar, Collaborator, Chat],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Aros';
}


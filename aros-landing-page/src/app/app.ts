import { Component } from '@angular/core';
import { Project } from './project/project';
import { TopBar } from './top-bar/top-bar';

@Component({
  selector: 'app-root',
  imports: [ Project, TopBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Aros';
}


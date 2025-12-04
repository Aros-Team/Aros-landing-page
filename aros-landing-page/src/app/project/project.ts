import { Component } from '@angular/core';

@Component({
  selector: 'app-project',
  imports: [],
  templateUrl: './project.html',
  styleUrl: './project.css',
})
export class Project {
  projects = [
    {
      name: "Restaurant order system",
      images: ["/Proyecto-muestra.jpeg"],
      description:
        "This is a software dedicated to managing restaurant orders efficiently. It allows waitstaff to take orders directly from tables using tablets or mobile devices, which are then sent to the kitchen in real-time. The system includes features such as menu management, order tracking, and billing, enhancing the overall dining experience for both customers and staff."
    }
  ];
}

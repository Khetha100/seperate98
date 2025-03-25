// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { WebSocketService } from "../../services/web-socket-service.service";
// import { Subscription } from 'rxjs';
// import { CommonModule } from '@angular/common';
// // import { Task } from '../../types/task.interface';
// import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { communityMessage } from '../../types/communityMessage.interface';

// @Component({
//   selector: 'app-web-socket-component',
//   imports: [CommonModule, FormsModule, ReactiveFormsModule],
//   templateUrl: './web-socket.component.html',
//   styleUrl: './web-socket.component.css',
// })
// export class WebSocketComponent implements OnInit {
//   title = 'real-dashboard-client';

//   // tasks: Task[] = [];
//   messages: communityMessage[] = [];

//   form: FormGroup = new FormGroup({
//     name: new FormControl<string>('', Validators.required),
//     days: new FormControl<number>(0, Validators.required),
//   });

//   constructor(private webSocketService: WebSocketService) {}
//   // ngOnDestroy(): void {
//   //   throw new Error('Method not implemented.');
//   // }

//   ngOnInit(): void {
//     // this.webSocketService.listen((task) => {
//     this.webSocketService.listen((message) => {
//       // this.tasks.push(task);
//       this.messages.push(message);
//     }, this.webSocketService.communityChannel);
//   }

//   add(name: string, days: number): void {
//     // const task: Task = {
//     //   name: name,
//     //   days: days,
//     // };

//     const message: communityMessage = {
//       senderId: 1,
//       content: name,
//       date: Date.now(),
//       communityId: days,
//     };
//     console.log(name);
//     console.log(days);
//     this.webSocketService.send(message);
//   }

//   click(): void {
//     console.log(this.form.value.name);
//     console.log(this.form.value.days);
//     this.add(this.form.value.name, this.form.value.days);
//     // console.log("form submited!");
//     // this.form.reset({});
//   }
// }

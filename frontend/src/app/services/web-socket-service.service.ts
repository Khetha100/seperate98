import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { CompatClient, Stomp, StompSubscription } from '@stomp/stompjs';
import { communityMessage } from '../types/communityMessage.interface';
import { environment } from '../../environments/environment.development';
import { CommunityDiscussion } from '../types/communityDiscussion.interface';

// // export type ListenerCallBack = (message: Task) => void;
export type ListenerCallBack = (message: communityMessage) => void;

@Injectable({
  providedIn: 'root',
})
export class WebSocketService implements OnDestroy {
  private connection: CompatClient | undefined = undefined;
  apiUrl: string = environment.SERVER;

  communityChannel: string = '/topic/greetings';


  private subscription: StompSubscription | undefined;

  constructor(private http: HttpClient) {

  }

  initializeConnection() {
    console.log('About to connect to a socket');
    this.connection = Stomp.client('http://localhost:8080/websocket');
    this.connection.connect({}, () => {});
  }

  // public send(task: Task): void {
  public send(message: communityMessage): void {
    if (this.connection && this.connection.connected) {
      this.connection.send('/hello', {}, JSON.stringify(message));
    }
  }

  // public allPrevious(): Observable<communityMessage[]> {
  //   return this.http.get<communityMessage[]>(this.apiUrl + '/hellos');
  // }

  //Get all previous messages specific to that community


  //'/topic/greetings'  - All channels subscibed here
  public listen(fun: ListenerCallBack, channelToSubscribe: string): void {
    if (this.connection) {
      this.connection.connect({}, () => {
        this.subscription = this.connection!.subscribe(
          channelToSubscribe,
          (message) => fun(JSON.parse(message.body))
        );
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}

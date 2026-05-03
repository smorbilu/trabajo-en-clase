import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

export interface DatabaseChangeEvent {
  table: string;
  operation: string;
  column: string;
  oldValue: string | null;
  newValue: string | null;
}

@Injectable({ providedIn: 'root' })
export class SocketService implements OnDestroy {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  onDatabaseChange(): Observable<DatabaseChangeEvent> {
    return new Observable((observer) => {
      this.socket.on('database-change', (data: DatabaseChangeEvent) => {
        observer.next(data);
      });
      return () => this.socket.off('database-change');
    });
  }

  ngOnDestroy(): void {
    this.socket.disconnect();
  }
}

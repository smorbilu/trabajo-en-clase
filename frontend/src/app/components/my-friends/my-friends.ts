import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';
import { SocketService, DatabaseChangeEvent } from '../../services/socket.service';

interface MyFriend {
  id: number;
  name: string;
  gender: string;
}

@Component({
  selector: 'app-my-friends',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatChipsModule,
  ],
  templateUrl: './my-friends.html',
  styleUrl: './my-friends.css',
})
export class MyFriendsComponent implements OnInit, OnDestroy {
  friends: MyFriend[] = [];
  events: DatabaseChangeEvent[] = [];
  displayedColumns = ['id', 'name', 'gender'];
  eventColumns = ['table', 'operation', 'column', 'oldValue', 'newValue'];

  private sub!: Subscription;
  private readonly apiUrl = 'http://localhost:3000/my-friends';

  constructor(
    private http: HttpClient,
    private socketService: SocketService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadFriends();

    this.sub = this.socketService.onDatabaseChange().subscribe((event) => {
      this.events = [event, ...this.events];
      this.cdr.detectChanges();
      this.loadFriends();
    });
  }

  private loadFriends(): void {
    this.http.get<MyFriend[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.friends = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error cargando my_friends:', err),
    });
  }

  clearEvents(): void {
    this.events = [];
    this.cdr.detectChanges();
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}

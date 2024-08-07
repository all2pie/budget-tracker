import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [MatButtonModule, CommonModule],
})
export class HeaderComponent implements OnInit {
  @Input({ required: true })
  title = '';

  @Input()
  buttonLabel?: string;

  @Output() buttonClicked = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}
}

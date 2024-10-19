import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() valueChanged = new EventEmitter<string>();
  searchValue: string = '';

  onSearchValueChanged() {
    this.valueChanged.emit(this.searchValue);
  }
}

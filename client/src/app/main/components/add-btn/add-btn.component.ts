import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-btn',
  templateUrl: './add-btn.component.html',
  styleUrls: ['./add-btn.component.scss']
})
export class AddBtnComponent implements OnInit {
  @Output() clicked = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }


  onClick() {
    this.clicked.emit();
  }
}

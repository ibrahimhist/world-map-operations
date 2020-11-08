import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Country } from '../../models/country.model';

@Component({
  selector: 'app-add-note-dialog',
  templateUrl: './add-note-dialog.component.html',
  styleUrls: ['./add-note-dialog.component.scss'],
})
export class AddNoteDialogComponent implements OnInit {
  note: string;

  constructor(public ref: DynamicDialogRef) {}

  ngOnInit(): void {}

  onClickAddNote(): void {
    this.ref.close(this.note);
  }
}

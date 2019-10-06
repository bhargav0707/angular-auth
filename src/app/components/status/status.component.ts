import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../stores/app.states';
import { GetStatus } from '../../stores/actions/auth.actions';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new GetStatus);
  }

}
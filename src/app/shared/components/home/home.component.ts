import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private appService: CommonService) {}

  ngOnInit() {
    this.appService.setUiInfo({ title: 'Home' });
  }
}

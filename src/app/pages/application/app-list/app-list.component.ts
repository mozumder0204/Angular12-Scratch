import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { AsyncService } from 'src/app/shared/services/async.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss'],
})
export class AppListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  resultsLength = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private commonService: CommonService,
    private asyncService: AsyncService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.commonService.setUiInfo({
      refresh: this.adminList,
      addNewPath: '/application/add',
      title: 'Application List',
    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  adminList = (): void => {};
}

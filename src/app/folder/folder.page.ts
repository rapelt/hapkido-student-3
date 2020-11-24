import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { config, environment } from '../../environments/environment';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public env = config.ionicEnvName;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

}

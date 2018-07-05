import { Component, OnInit, Input } from '@angular/core';
import { StarWarsService } from '../services/star-wars.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() character;
  swService: StarWarsService;

  constructor(swService: StarWarsService) {
    this.swService = swService;
  }

  ngOnInit() {
  }

  chooseSide(side) {
    this.swService.assignSide({name: this.character.name, side: side});
  }

}

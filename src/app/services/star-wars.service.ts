import { LogService } from './log.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class StarWarsService {
  private characters = [];
  private logService: LogService;
  private http: Http;
  public charactersChanged = new Subject<void>();

  constructor(lgServ: LogService, http: Http) {
    this.logService = lgServ;
    this.http = http;
  }

  assignSide(charInfo) {
    const pos = this.characters.findIndex(char => {
      return char.name === charInfo.name;
    });
    this.characters[pos].side = charInfo.side;
    this.charactersChanged.next();
    this.logService.log('Assigned ' + this.characters[pos].name + ' to side ' + charInfo.side);
  }

  getCharacters(chosenSide) {
    if (chosenSide === 'all') {
      return this.characters.slice();
    }
    return this.characters.filter(char => {
      return char.side === chosenSide;
    });
  }

  createCharacter(name, side) {
    const pos = this.characters.findIndex(char => {
      return char.name === name;
    });
    if (pos !== -1) {
      return;
    }
    this.characters.push({name: name, side: side});
    this.logService.log('Created character: ' + name);
  }

  fetchCharacters() {
    this.http.get('https://swapi.co/api/people')
      .map( (response: Response) => {
        const data = response.json();
        return data.results.map((char) => {
          return { name: char.name, side: ''};
        });
      })
      .subscribe(data => {
        this.characters = data;
        this.charactersChanged.next();
      });
  }
}

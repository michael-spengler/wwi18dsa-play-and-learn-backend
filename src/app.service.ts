import { Injectable } from '@nestjs/common';
import * as fs from 'fs-sync';
import * as path from 'path';
import uuidv1 = require('uuid/v1');

@Injectable()
export class AppService {
  private assetsFileId: any = path.join(__dirname, './../assets/assets.json');
  private assets = fs.readJSON(this.assetsFileId);

  public getAsset(id: string): any {
    this.assets = fs.readJSON(this.assetsFileId);
    return this.assets.filter((entry) => entry.id === id)[0];
  }

  public addAsset(content: any) {
    const randomAssetId = this.getNewRandomAssetId(7);
    const entry = {
      id: randomAssetId,
      type: 'JSON',
      content,
    };

    this.assets = fs.readJSON(this.assetsFileId);
    this.assets.push(entry);
    fs.write(this.assetsFileId, JSON.stringify(this.assets));
    return {randomAssetId};
  }

  public updateAsset(id: string, content: any) {
    const randomAssetId = uuidv1().substr(0, 7);
    this.assets = fs.readJSON(this.assetsFileId);
    const relevantEntry = this.assets.filter((entry) => entry.id === id)[0];
    if (relevantEntry === undefined) {
      throw new Error('could not find and entry for this asset id');
    }
    relevantEntry.content = content;
    fs.write(this.assetsFileId, JSON.stringify(this.assets));
    return {randomAssetId};
  }

  private getNewRandomAssetId(length: number) {
    const newId = uuidv1().substr(0, length);
    const potentialDuplicate = this.assets.filter((entry) => entry.id === newId)[0];
    if (potentialDuplicate === undefined) {
      return newId;
    } else {
      throw new Error('You should increase the length of the id');
    }
  }
}

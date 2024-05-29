
import { _decorator, Component, JsonAsset, Node, resources } from 'cc';
import { Level } from './Constants';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = LevelsManager
 * DateTime = Tue May 28 2024 14:54:55 GMT+0500 (Pakistan Standard Time)
 * Author = ArsamMughal
 * FileBasename = LevelsManager.ts
 * FileBasenameNoExtension = LevelsManager
 * URL = db://assets/Scripts/LevelsManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('LevelsManager')
export class LevelsManager extends Component {

    levels: Level[] = []
    levelsPlayed: number = 0
    currentLevel: number = 0

    // [2]
    // @property
    // serializableDummy = 0;

    start() {
        resources.load('levelsData', (err, jsonAsset: JsonAsset) => {
            if (err) {
                console.error('Failed to load levels data:', err);
                return;
            }
            this.levels = jsonAsset.json as Level[];
            GameManager.instance.uIManager.CreateLevels()
        });
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    GetLevelData(levelNumber: number): Level {
        for (let index = 0; index < this.levels.length; index++) {
            if (this.levels[index].levelId === levelNumber) return this.levels[index]
        }
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
 */

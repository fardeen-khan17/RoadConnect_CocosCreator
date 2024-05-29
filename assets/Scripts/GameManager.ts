
import { _decorator, Component, Enum, Node, ResolutionPolicy, view } from 'cc';
import { UIManager } from './UIManager';
import { SoundsManager } from './SoundsManager';
import { Language } from './Constants';
import { LevelsManager } from './LevelsManager';
import { PuzzleManager } from './PuzzleManager';
const { ccclass, property } = _decorator;
Enum(Language)

/**
 * Predefined variables
 * Name = GameManager
 * DateTime = Tue May 28 2024 14:08:39 GMT+0500 (Pakistan Standard Time)
 * Author = ArsamMughal
 * FileBasename = GameManager.ts
 * FileBasenameNoExtension = GameManager
 * URL = db://assets/Scripts/GameManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('GameManager')
export class GameManager extends Component {

    private static _instance: GameManager
    static get instance() {
        return this._instance;
    }
    static set instance(instance: GameManager) {
        this._instance = instance;
    }

    @property(UIManager) uIManager: UIManager = null
    @property(SoundsManager) soundsManager: SoundsManager = null
    @property(LevelsManager) levelsManager: LevelsManager = null
    @property(PuzzleManager) puzzleManager: PuzzleManager = null
    @property({ type: Language }) public Language: Language = Language.EN

    protected onLoad(): void {
        GameManager.instance = this

        this.SetCameraAspect()
        view.on("canvas-resize", function () {
            console.log("canvas-resize")
            this.SetCameraAspect()
        }, this)
    }

    start() {
        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    SetCameraAspect(): void {
        let scaleX = view.getVisibleSize().width / (1080)
        let scaleY = view.getVisibleSize().height / (1920)
        if (scaleX > scaleY) view.setDesignResolutionSize(1080, 1920, ResolutionPolicy.FIXED_HEIGHT)
        else if (scaleX < scaleY) view.setDesignResolutionSize(1080, 1920, ResolutionPolicy.FIXED_WIDTH)
        else view.setDesignResolutionSize(1080, 1920, ResolutionPolicy.FIXED_WIDTH)
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

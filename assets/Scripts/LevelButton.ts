
import { _decorator, Button, Color, color, Component, Label, Node, Sprite, SpriteFrame, Vec3 } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = LevelButton
 * DateTime = Tue May 28 2024 16:43:15 GMT+0500 (Pakistan Standard Time)
 * Author = ArsamMughal
 * FileBasename = LevelButton.ts
 * FileBasenameNoExtension = LevelButton
 * URL = db://assets/Scripts/LevelButton.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('LevelButton')
export class LevelButton extends Component {

    levelNumber: number
    image: Sprite = null
    button: Button = null

    @property(SpriteFrame) buttonSprite: SpriteFrame = null
    @property(Label) level: Label = null

    protected onLoad(): void {
        this.image = this.node.getComponent(Sprite)
        this.button = this.node.getComponent(Button)
    }

    start() {
        this.SetButton()
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    SetButton() {
        this.level.string = this.levelNumber.toString()
        if (this.levelNumber <= GameManager.instance.levelsManager.levelsPlayed + 1) {
            this.image.color = new Color(255, 255, 255, 255)
            this.image.spriteFrame = this.buttonSprite
            this.button.normalSprite = this.buttonSprite
            this.button.interactable = true
        }
    }

    buttonClick() {
        GameManager.instance.soundsManager.PlayDefaultClick()
        GameManager.instance.levelsManager.currentLevel = this.levelNumber
        GameManager.instance.puzzleManager.LoadPuzzle(this.levelNumber)
        GameManager.instance.uIManager.levelSelectScreen.active = false
        GameManager.instance.uIManager.levelScreen.active = true
        let LevelNumberText: Node = GameManager.instance.uIManager.levelScreenNumber.node
        LevelNumberText.setPosition(new Vec3(0, LevelNumberText.position.y, LevelNumberText.position.z))
        GameManager.instance.uIManager.levelScreenNumber.string = "LEVEL " + this.levelNumber
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


import { _decorator, CCInteger, Component, Node, Sprite, tween, Vec3 } from 'cc';
import { Piece } from './Constants';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = PuzzlePiece
 * DateTime = Tue May 28 2024 18:07:01 GMT+0500 (Pakistan Standard Time)
 * Author = ArsamMughal
 * FileBasename = PuzzlePiece.ts
 * FileBasenameNoExtension = PuzzlePiece
 * URL = db://assets/Scripts/PuzzlePiece.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('PuzzlePiece')
export class PuzzlePiece extends Component {

    rotating: boolean = false
    pieceId: number = 0
    startRotation: number = 0
    targetRotation: number = 0
    resolved: boolean = false

    // start() {
    //     [3]
    // }

    // update (deltaTime: number) {
    //     // [4]
    // }

    SetData(data: Piece): void {
        this.pieceId = data.pieceId
        this.startRotation = data.startRotation
        this.targetRotation = data.targetRotation
        this.node.angle = this.startRotation
        if (this.targetRotation === this.startRotation) this.resolved = true
        if ((this.pieceId === 1 || this.pieceId === 5) && (this.targetRotation === 180 && this.node.angle === 0 || this.targetRotation === 0 && this.node.angle === 180)) this.resolved = true
        this.LoadImage()
    }

    LoadImage(): void {
        this.node.getComponent(Sprite).spriteFrame = GameManager.instance.puzzleManager.puzzleSprites[this.pieceId]
    }

    click(): void {
        if (this.rotating) return
        GameManager.instance.soundsManager.PlayRotateShape()
        this.rotating = true
        tween(this.node).to(0.15, { angle: this.node.angle - 90 })
            .call(() => {
                this.rotating = false
                if (Math.abs(this.node.angle) === 360) this.node.angle = 0
                if (this.node.angle === -90) this.node.angle = 270
                if (Math.abs(this.node.angle) === this.targetRotation) this.resolved = true
                else this.resolved = false
                if ((this.pieceId === 1 || this.pieceId === 5) && (this.targetRotation === 180 && this.node.angle === 0 || this.targetRotation === 0 && this.node.angle === 180)) this.resolved = true
                GameManager.instance.puzzleManager.CheckIfPuzzleIsComplete()
            })
            .start()
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


import { _decorator, Component, instantiate, Node, Prefab, SpriteFrame, tween, Vec3 } from 'cc';
import { GameManager } from './GameManager';
import { Level } from './Constants';
import { PuzzlePiece } from './PuzzlePiece';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = PuzzleManager
 * DateTime = Tue May 28 2024 17:31:54 GMT+0500 (Pakistan Standard Time)
 * Author = ArsamMughal
 * FileBasename = PuzzleManager.ts
 * FileBasenameNoExtension = PuzzleManager
 * URL = db://assets/Scripts/PuzzleManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('PuzzleManager')
export class PuzzleManager extends Component {

    rows: number = 4
    columns: number = 4
    cellSpacing: number = 128
    puzzleGrid: Vec3[][] = []

    @property(Node) puzzle: Node = null
    @property(Prefab) puzzlePiece: Prefab = null
    @property([SpriteFrame]) puzzleSprites: SpriteFrame[] = []

    start() {
        this.CreatePuzzleGrid()
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    CreatePuzzleGrid(): void {
        const startY = (this.rows - 1) * this.cellSpacing / 2
        const startX = (this.columns - 1) * this.cellSpacing / 2
        for (let row = 0; row < this.rows; row++) {
            this.puzzleGrid[row] = []
            for (let column = 0; column < this.columns; column++) {
                this.puzzleGrid[row][column] = new Vec3(column * this.cellSpacing - startX, startY - row * this.cellSpacing)
            }
        }
    }

    LoadPuzzle(puzzleNumber: number): void {
        let puzzleData: Level = GameManager.instance.levelsManager.GetLevelData(puzzleNumber)
        for (let index = 0; index < puzzleData.pieces.length; index++) {
            if (puzzleData.pieces[index].pieceId !== -1) {
                let puzzlePiece: Node = instantiate(this.puzzlePiece)
                this.puzzle.addChild(puzzlePiece)
                puzzlePiece.getComponent(PuzzlePiece).SetData(puzzleData.pieces[index])
                puzzlePiece.setPosition(this.puzzleGrid[Math.floor(index / this.columns)][index % this.columns])
                puzzlePiece.scale = Vec3.ZERO
            }
        }
        this.ShowPuzzle()
    }

    ShowPuzzle(): void {
        for (let index = 0; index < this.puzzle.children.length; index++) {
            tween(this.puzzle.children[index])
                .delay(0.2)
                .call(() => {
                    GameManager.instance.soundsManager.PlayShapeAppear()
                })
                .to(0.1, { scale: Vec3.ONE })
                .start()
        }
    }

    CheckIfPuzzleIsComplete(): void {
        for (let index = 0; index < this.puzzle.children.length; index++) {
            if (!this.puzzle.children[index].getComponent(PuzzlePiece).resolved) return
        }
        this.ClearPuzzle()
        if (GameManager.instance.levelsManager.currentLevel > GameManager.instance.levelsManager.levelsPlayed) GameManager.instance.levelsManager.levelsPlayed = GameManager.instance.levelsManager.currentLevel
        GameManager.instance.levelsManager.currentLevel++
        if (GameManager.instance.levelsManager.currentLevel <= GameManager.instance.levelsManager.levels.length) {
            GameManager.instance.uIManager.UpdateLevels()
            GameManager.instance.uIManager.ShowNextLevelScreen()
            GameManager.instance.soundsManager.PlayLevelComplete()
        } else {
            GameManager.instance.uIManager.endScreen.active = true
            GameManager.instance.uIManager.levelScreenNumber.string = "level 00";

        }
    }

    ClearPuzzle(): void {
        for (let index = 0; index < this.puzzle.children.length; index++) {
            tween(this.puzzle.children[index])
                .to(0.1, { scale: Vec3.ZERO })
                .call(() => {
                    if (index === this.puzzle.children.length - 1) this.puzzle.destroyAllChildren()
                })
                .start()
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

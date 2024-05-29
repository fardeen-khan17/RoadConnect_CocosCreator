
import { _decorator, Component, instantiate, Label, Node, Prefab, Sprite, tween, Vec3, view } from 'cc';
import { GameManager } from './GameManager';
import { LevelButton } from './LevelButton';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = UIManager
 * DateTime = Tue May 28 2024 14:10:52 GMT+0500 (Pakistan Standard Time)
 * Author = ArsamMughal
 * FileBasename = UIManager.ts
 * FileBasenameNoExtension = UIManager
 * URL = db://assets/Scripts/UIManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('UIManager')
export class UIManager extends Component {

    buttonpressed: boolean = false

    @property(Node) roadConnect: Node = null
    @property(Node) playButton: Node = null
    @property(Node) mainScreen: Node = null
    @property(Node) levelSelectScreen: Node = null
    @property(Node) levelScreen: Node = null
    @property(Node) levelsButtonHolder: Node = null
    @property(Prefab) levelButton: Prefab = null
    @property(Label) levelScreenNumber: Label = null
    @property(Node) endScreen: Node = null

    start() {
        this.playButton.scale = Vec3.ZERO
        this.AnimateRoadConnectLabels()
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    AnimateRoadConnectLabels(): void {
        let roadText: Node = this.roadConnect.children[0]
        let connectText: Node = this.roadConnect.children[1]
        roadText.setPosition(new Vec3(-view.getVisibleSize().width - 200, roadText.position.y, roadText.position.z))
        connectText.setPosition(new Vec3(view.getVisibleSize().width + 200, connectText.position.y, connectText.position.z))
        tween(roadText).to(0.6, { position: new Vec3(0, roadText.position.y, roadText.position.z) }).start()
        tween(connectText).to(0.6, { position: new Vec3(0, connectText.position.y, connectText.position.z) }).call(() => { this.ShowPlayButton() }).start()
    }

    ShowPlayButton(): void {
        tween(this.playButton).to(0.4, { scale: Vec3.ONE }).start()
    }

    PlaybuttonClick(): void {
        if (this.buttonpressed) return
        GameManager.instance.soundsManager.PlayDefaultClick()
        this.buttonpressed = true
        setTimeout(() => {
            this.mainScreen.active = false
            this.levelSelectScreen.active = true
        }, 100);
    }

    CreateLevels(): void {
        for (let index = 0; index < GameManager.instance.levelsManager.levels.length; index++) {
            let levelButton: Node = instantiate(this.levelButton)
            this.levelsButtonHolder.addChild(levelButton)
            levelButton.getComponent(LevelButton).levelNumber = index + 1
        }
    }

    UpdateLevels(): void {
        for (let index = 0; index < GameManager.instance.uIManager.levelsButtonHolder.children.length; index++) {
            GameManager.instance.uIManager.levelsButtonHolder.children[index].getComponent(LevelButton).SetButton()
        }
    }

    ShowLevelScreen(): void {
        GameManager.instance.soundsManager.PlayDefaultClick()
        this.levelSelectScreen.active = true
        this.levelScreen.active = false
        GameManager.instance.puzzleManager.ClearPuzzle()
        this.endScreen.active = false
    }

    ShowNextLevelScreen(): void {
        tween(this.levelScreenNumber.node)
            .to(0.2, { position: new Vec3(-view.getVisibleSize().width - 100, this.levelScreenNumber.node.position.y, this.levelScreenNumber.node.position.z) })
            .call(() => {
                this.levelScreenNumber.node.position = new Vec3(view.getVisibleSize().width + 100, this.levelScreenNumber.node.position.y, this.levelScreenNumber.node.position.z)
                tween(this.levelScreenNumber.node)
                    .to(0.2, { position: new Vec3(0, this.levelScreenNumber.node.position.y, this.levelScreenNumber.node.position.z) })
                    .call(() => {
                        GameManager.instance.puzzleManager.LoadPuzzle(GameManager.instance.levelsManager.currentLevel)
                        let LevelNumberText: Node = GameManager.instance.uIManager.levelScreenNumber.node
                        LevelNumberText.setPosition(new Vec3(0, LevelNumberText.position.y, LevelNumberText.position.z))
                        GameManager.instance.uIManager.levelScreenNumber.string = "LEVEL " + GameManager.instance.levelsManager.currentLevel
                    })
                    .start()
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

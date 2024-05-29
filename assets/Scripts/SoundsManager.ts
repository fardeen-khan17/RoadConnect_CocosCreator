
import { _decorator, assert, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = SoundsManager
 * DateTime = Tue May 28 2024 14:14:53 GMT+0500 (Pakistan Standard Time)
 * Author = ArsamMughal
 * FileBasename = SoundsManager.ts
 * FileBasenameNoExtension = SoundsManager
 * URL = db://assets/Scripts/SoundsManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('SoundsManager')
export class SoundsManager extends Component {

    audioSource: AudioSource = null

    @property(AudioSource)
    defaultClick: AudioSource = null
    @property(AudioSource)
    levelComplete: AudioSource = null
    @property(AudioSource)
    RotateShape: AudioSource = null
    @property(AudioSource)
    ShapeAppear: AudioSource = null

    onLoad() {
        const audioSource: AudioSource = this.node.getComponent(AudioSource)!
        assert(audioSource)
        this.audioSource = audioSource
    }

    // start() {}

    // update (dt) {}

    PlayDefaultClick() {
        this.defaultClick.play()
    }

    PlayLevelComplete() {
        this.levelComplete.play()
    }

    PlayRotateShape() {
        this.RotateShape.play()
    }

    PlayShapeAppear() {
        this.ShapeAppear.play()
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

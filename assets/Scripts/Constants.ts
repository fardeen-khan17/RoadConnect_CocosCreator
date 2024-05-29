

/**
 * Predefined variables
 * Name = Constants
 * DateTime = Tue May 28 2024 14:15:11 GMT+0500 (Pakistan Standard Time)
 * Author = ArsamMughal
 * FileBasename = Constants.ts
 * FileBasenameNoExtension = Constants
 * URL = db://assets/Scripts/Constants.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

export enum Language {
    AR,
    EN
}

export interface Piece {
    pieceId: number
    startRotation: number
    targetRotation: number
}

export interface Level {
    levelId: number
    pieces: Piece[]
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

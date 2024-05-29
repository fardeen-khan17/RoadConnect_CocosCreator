# Road Connect Game

## Overview
**Road Connect** is a puzzle game developed using Cocos Creator and TypeScript. The objective of the game is to connect road pieces in the correct orientation to complete the path. The game consists of multiple levels, each containing a set of pieces that need to be rotated to match the target configuration.

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [File Structure](#file-structure)
4. [Detailed Module Descriptions](#detailed-module-descriptions)
5. [Contributing](#contributing)
6. [License](#license)

## Installation
1. **Clone the repository:**
    ```sh
    git clone https://github.com/yourusername/road-connect.git
    ```
2. **Navigate to the project directory:**
    ```sh
    cd road-connect
    ```
3. **Install dependencies:**
    ```sh
    npm install
    ```
4. **Open the project in Cocos Creator:**
    - Launch Cocos Creator.
    - Open the project by selecting the `road-connect` directory.

## Usage
1. **Start the Cocos Creator development server:**
    - Open Cocos Creator.
    - Click on the `Play` button to run the project.

2. **Build the project for deployment:**
    - Open Cocos Creator.
    - Go to `Project` > `Build...`.
    - Select the desired platform and build the project.

## File Structure
ROADCONNECT/
│
├── assets/
│ ├── scripts/
│ │ ├── Constants.ts
│ │ ├── GameManager.ts
│ │ ├── LevelsManager.ts
│ │ ├── PuzzleManager.ts
│ │ ├── UIManager.ts
│ │ ├── SoundsManager.ts
│ │ ├── LevelButton.ts
│ │ └── PuzzlePiece.ts
│ └── ...
│
├── packages/
├── build/
├── library/
├── local/
├── settings/
└── project.json


## Detailed Module Descriptions

### 1. Constants.ts
**Purpose**: Contains essential data structures and enums used throughout the game.
- **Language Enum**: Defines supported languages (AR for Arabic, EN for English).
- **Piece Interface**: Represents a puzzle piece with `pieceId`, `startRotation`, and `targetRotation`.
- **Level Interface**: Represents a game level with `levelId` and an array of `Piece` objects.

### 2. GameManager.ts
**Purpose**: Manages the overall state of the game and provides global access to various managers.
**Key Functionalities**:
- **Singleton Implementation**: Ensures a single instance of `GameManager`.
- **References to Managers**: Holds references to `UIManager`, `SoundsManager`, `LevelsManager`, and `PuzzleManager`.
- **Camera Aspect Ratio Adjustment**: Adjusts the camera to maintain the correct aspect ratio across different devices.

**Methods**:
- `onLoad()`: Initializes the singleton instance and sets up camera aspect ratio adjustments.
- `SetCameraAspect()`: Calculates and sets the appropriate design resolution based on the device's aspect ratio.

### 3. LevelsManager.ts
**Purpose**: Manages level data, including loading and providing level information.
**Key Functionalities**:
- **Loading Level Data**: Loads level data from a JSON file.
- **Managing Level State**: Tracks the current level, the highest level played, and provides level data.

**Methods**:
- `start()`: Loads level data and initializes levels.
- `GetLevelData(levelNumber: number)`: Retrieves data for a specified level.

### 4. PuzzleManager.ts
**Purpose**: Handles the logic and mechanics of the puzzle gameplay.
**Key Functionalities**:
- **Creating Puzzle Grid**: Generates a grid layout for puzzle pieces.
- **Loading and Displaying Puzzles**: Loads puzzle data for a level and positions pieces accordingly.
- **Checking Puzzle Completion**: Verifies if the puzzle is completed and handles transitions.

**Methods**:
- `CreatePuzzleGrid()`: Sets up the positions for puzzle pieces in a grid.
- `LoadPuzzle(puzzleNumber: number)`: Loads the puzzle for a given level and places pieces in the grid.
- `CheckIfPuzzleIsComplete()`: Checks if all pieces are correctly oriented and handles the completion logic.

### 5. UIManager.ts
**Purpose**: Manages the user interface elements and transitions between different screens.
**Key Functionalities**:
- **Animating Main Screen**: Handles animations for the main screen elements.
- **Managing Screen Transitions**: Switches between the main menu, level selection, level screen, and end screen.
- **Creating and Updating Level Buttons**: Generates buttons for levels and updates their states.

**Methods**:
- `AnimateRoadConnectLabels()`: Animates the title labels on the main screen.
- `ShowPlayButton()`: Displays the play button with an animation.
- `CreateLevels()`: Instantiates level buttons based on the number of levels.
- `UpdateLevels()`: Updates the state of level buttons according to the player's progress.

### 6. SoundsManager.ts
**Purpose**: Manages audio playback for game events.
**Key Functionalities**:
- **Playing Sounds**: Plays specific sounds for button clicks, level completion, piece rotation, and piece appearance.

**Methods**:
- `PlayDefaultClick()`: Plays the default click sound.
- `PlayLevelComplete()`: Plays the level completion sound.
- `PlayRotateShape()`: Plays the shape rotation sound.
- `PlayShapeAppear()`: Plays the shape appearance sound.

### 7. LevelButton.ts
**Purpose**: Manages the behavior of level buttons on the level selection screen.
**Key Functionalities**:
- **Setting Button Appearance**: Updates the button's appearance and interactability based on the player's progress.
- **Handling Button Click**: Loads the corresponding level and updates the UI when the button is clicked.

**Methods**:
- `SetButton()`: Configures the button's appearance based on the level number.
- `buttonClick()`: Handles the button click event to load the selected level.

### 8. PuzzlePiece.ts
**Purpose**: Manages individual puzzle pieces, including their rotation and state.
**Key Functionalities**:
- **Setting Piece Data**: Initializes the piece with its ID, start rotation, and target rotation.
- **Handling Rotation**: Rotates the piece in response to user interaction.
- **Checking State**: Determines if the piece is correctly oriented and updates its resolved state.

**Methods**:
- `SetData(data: Piece)`: Sets the piece's data and initial state.
- `LoadImage()`: Loads the appropriate image for the piece.
- `click()`: Handles the click event to rotate the piece and check its state.

## Contributing
1. **Fork the repository.**
2. **Create a new branch:**
    ```sh
    git checkout -b feature-branch
    ```
3. **Make your changes and commit them:**
    ```sh
    git commit -m 'Add some feature'
    ```
4. **Push to the branch:**
    ```sh
    git push origin feature-branch
    ```
5. **Submit a pull request.**

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
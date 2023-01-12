import React from "react";
import _ from "lodash";

// TODO:
// präsentabel machen
// in cvat packen

interface EnergizerProps {
  showLeaderboard?: (show: boolean) => void;
  width?: number;
  height?: number;
}

interface State {
  speed: number;
  direction: string;
  size: number;
  position: number[][];
  apple: number[];
}

const initialState: State = {
  speed: 200,
  direction: "right",
  size: 10,
  position: [
    [6, 0],
    [5, 0],
    [4, 0]
  ],
  apple: [0, 0]
};

const width = 200;
const height = 200;
const timeLimit = 60000;

const getSurfaceWidth = (): number => {
  return width / initialState.size;
};

const getSurfaceHeight = (): number => {
  return height / initialState.size;
};

const getSnakeDirection = (position: number[][]): string => {
  const [first, second] = position;
  if (first[0] < second[0]) return "left";
  else if (first[0] > second[0]) return "right";
  else if (first[1] < second[1]) return "up";
  else if (first[1] > second[1]) return "down";
};

export default class Snake extends React.Component<EnergizerProps, State> {
  // canvasRef: HTMLCanvasElement;
  private canvas: HTMLCanvasElement;
  private gameLoopInterval: ReturnType<typeof setInterval>;
  private inputRef: React.RefObject<HTMLInputElement>;
  private time: number;
  private timerInterval: ReturnType<typeof setInterval>;
  private startTime: number;
  private gameOver: boolean;

  constructor(props: EnergizerProps) {
    super(props);
    this.state = initialState;
    // this.canvasRef = React.createRef();
    // this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    // let canvas = document.getElementById("canvas") as HTMLCanvasElement;
    // let context = canvas.getContext("2d");
    let context = null;
    console.log("context: " + context);
    this.context = context;

    this.inputRef = React.createRef();
  }

  componentDidMount() {
    // this.context = this.canvas.getContext("2d");
    console.log("in componentDidMount");
    let a: any = this.refs.canvas;
    this.context = a.getContext("2d");
    this.init();
    console.log("context :" + this.context);
  }

  componentWillUnmount() {
    clearInterval(this.gameLoopInterval);
    clearInterval(this.timerInterval);
  }

  getContainerSize = () => {
    const { width, height } = this.props;
    return {
      width: width || window.innerWidth,
      height: height || window.innerHeight
    };
  };

  calcPosition = (direction: string, pos: number[]) => {
    // const size = this.getContainerSize();
    const surfaceWidth: number = getSurfaceWidth();
    const surfaceHeight: number = getSurfaceHeight();
    // console.log("surfaceWidth: " + surfaceWidth);
    // console.log("size.width: " + size.width);
    // console.log("this.state.size: " + this.state.size);

    switch (direction) {
      case "left":
        if (pos[0] - 1 === -1) {
          return [surfaceWidth - 1, pos[1]];
        }
        return [pos[0] - 1, pos[1]];
      case "up":
        if (pos[1] - 1 === -1) {
          return [pos[0], surfaceHeight - 1];
        }
        return [pos[0], pos[1] - 1];
      case "right":
        if (pos[0] + 1 > surfaceWidth - 1) {
          return [0, pos[1]];
        }
        return [pos[0] + 1, pos[1]];
      case "down":
        if (pos[1] + 1 > surfaceHeight - 1) {
          return [pos[0], 0];
        }
        return [pos[0], pos[1] + 1];
      default:
        return pos;
    }
  };

  timer = () => {
    var delta = Date.now() - this.startTime;
    var time = timeLimit - delta;
    // console.log(time);

    if (!(time > 0)) this.gameOver = true;

    // if (!(time > 0)) {
    //   console.log("timeout");
    //   this.setState({
    //     ...this.state,
    //     gameOver: true,
    //   });
    //   // this.setState(state => ({...state, gameOver: true}));
    //   console.log(this.state.gameOver);
    // }

    time = Math.round(time / 1000);
    document.getElementById("timer").innerHTML = String("Time: " + time);
  };

  init = () => {
    this.focusInput();
    this.setState({
      ...initialState,
      apple: this.generateApplePosition()
    });
    this.gameOver = false;
    this.startTime = Date.now();

    this.timerInterval = setInterval(() => this.timer(), 1000);

    this.gameLoopInterval = setInterval(this.gameLoop, this.state.speed);
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    event.preventDefault();
    const keys: any = {
      37: "left",
      38: "up",
      39: "right",
      40: "down"
    };

    const direction = keys[event.which];

    if (direction) {
      if (
        (this.state.direction === "left" && direction === "right") ||
        (this.state.direction === "up" && direction === "down") ||
        (this.state.direction === "right" && direction === "left") ||
        (this.state.direction === "down" && direction === "up")
      ) {
        return;
      }
      const snakeDirection = getSnakeDirection(this.state.position);
      if (
        (snakeDirection === "left" && direction === "right") ||
        (snakeDirection === "up" && direction === "down") ||
        (snakeDirection === "right" && direction === "left") ||
        (snakeDirection === "down" && direction === "up")
      ) {
        return;
      }
      this.setState({ ...this.state, direction });
    }
  };

  focusInput = () => {
    this.inputRef.current!.focus();
    // this.refs.input.focus();
  };

  drawApple = () => {
    const { size, apple } = this.state;

    this.context.save();
    this.context.fillStyle = "#6DC983";
    this.context.beginPath();
    const radius = size / 2;
    const x = apple[0] * size + radius;
    const y = apple[1] * size + radius;
    this.context.arc(x, y, radius, 0, Math.PI * 2);
    this.context.fill();
    this.context.restore();
  };

  drawElement = (position: number[]) => {
    const { size } = this.state;

    const x = size * position[0];
    const y = size * position[1];
    // this.context.fillRect(x, y, size, size);
    this.context.beginPath();
    this.context.roundRect(x, y, size, size, 2);
    this.context.stroke();
  };

  drawSnake = () => {
    const { position } = this.state;

    this.context.save();
    this.context.fillStyle = "#7377CF";

    position.forEach(this.drawElement);

    this.context.restore();
  };

  drawCleanUpSnake = (last_element: number[]) => {
    this.context.save();
    this.context.fillStyle = "#000000";
    this.drawElement(last_element);
    this.context.restore();
  };

  generateApplePosition = () => {
    // const size = this.getContainerSize();
    // const surfaceWidth = parseInt(size.width / this.state.size, 10);
    // const surfaceHeight = parseInt(size.height / this.state.size, 10);
    const surfaceWidth = getSurfaceWidth();
    const surfaceHeight = getSurfaceHeight();

    var x = Math.floor(Math.random() * surfaceWidth);
    var y = Math.floor(Math.random() * surfaceHeight);

    const position = this.state.position;

    var applePos: number[] = [x, y];
    position.forEach((element) => {
      if (_.isEqual(applePos, element)) {
        // console.log("game should be over");
        console.log("generate apple conflict");
        console.log(applePos);
        console.log(position);
        applePos = this.generateApplePosition();

        // this.setState({ ...this.state, gameOver: true });
        // console.log("game over state: " + this.state.gameOver);
      }
    });

    return applePos;
  };

  advance = () => {
    // console.log("begin state position: " + this.state.position);

    const { direction } = this.state;
    const position = this.state.position.slice(
      0,
      this.state.position.length - 1
    );

    // console.log("local pos: " + position);
    const newPosition = this.calcPosition(direction, position[0]);
    // let isGameOver = this.state.gameOver;

    // console.log("new local pos: " + newPosition);

    if (_.isEqual(newPosition, this.state.apple)) {
      this.setState({
        ...this.state,
        apple: this.generateApplePosition(),
        position: [newPosition, ...this.state.position]
      });
    } else {
      position.forEach((element) => {
        if (_.isEqual(newPosition, element)) {
          // console.log("game should be over");
          this.gameOver = true;

          // this.setState({ ...this.state, gameOver: true });
          // console.log("game over state: " + this.state.gameOver);
        }
      });
      // console.log("state before :" + JSON.stringify(this.state));

      this.setState({
        ...this.state,
        position: [newPosition, ...position]
        // gameOver: isGameOver
      });

      // console.log("position after: " + JSON.stringify(this.state));
    }
  };

  gameLoop = () => {
    // const size = this.getContainerSize();
    // const surfaceWidth = parseInt(size.width, 10);
    // const surfaceHeight = parseInt(size.height, 10);
    const surfaceWidth = getSurfaceWidth();
    const surfaceHeight = getSurfaceHeight();
    const { size } = this.state;

    let a: any = this.refs.canvas;
    this.context = a.getContext("2d");

    let { position } = this.state;
    var last_element = position[position.length - 1];

    // console.log("gameloop");

    this.context.clearRect(0, 0, width, height);
    // console.log("context :" + JSON.stringify(this.context));
    this.advance();
    this.drawSnake();
    // this.drawCleanUpSnake(last_element);
    this.drawApple();

    // console.log("is game over? " + this.state.gameOver);
    if (this.gameOver) {
      // console.log("game is over");
      clearInterval(this.timerInterval);
      clearInterval(this.gameLoopInterval);
    }
  };

  render() {
    const size = this.getContainerSize();
    return (
      <div className={"snake"}>
        <input
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            outline: "0 !important",
            border: "none"
          }}
          ref={this.inputRef}
          type="text"
          onKeyDown={this.handleKeyDown}
        />
        {this.gameOver && (
          <div className={"game-over"}>
            <div>GAME OVER</div>
            <button onClick={this.init}>Reset</button>
            <div>Score: {this.state.position.length} </div>
          </div>
        )}
        <div className={"timer"} id="timer">
          Time: {timeLimit / 1000}
        </div>
        <canvas
          className={"playingField"}
          ref="canvas"
          onKeyDown={this.handleKeyDown}
          onClick={this.focusInput}
          width={width}
          height={height}
        />
      </div>
    );
  }
}

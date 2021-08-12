import React from "react";
import Grid from "./Components/Grid";

class App extends React.Component {
  state = {
    matrix: [
      ["", "", "", "r", "h3"],
      ["", "h2", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "h4", "t", ""],
      ["", "", "p", "", ""],
      ["", "r", "", "", ""],
      ["h1", "", "", "r", "h5"],
      ["", "", "", "", ""]
    ],
    besthouse: "",
  };
  getBestHouse = () => {
    let res = this.getBestHouseHelper(this.state.matrix);
    this.setState({ besthouse: res.length === 0? [0,"none"]:this.state.matrix[res[0]][res[1]] });
  };
  getBestHouseHelper(matrix) {
    let list = [];
    //storing house coordinates and minimum distance from all other places in list
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        if (matrix[i][j][0] === "h") {
          let curr = {
            key: [i, j],
            R: Number.MAX_VALUE,
            M: Number.MAX_VALUE,
            P: Number.MAX_VALUE,
            T: Number.MAX_VALUE,
            G: Number.MAX_VALUE,
          };
          list.push(curr);
        }
      }
    }
    //finding minimum distances from each place for each house
    for (let k = 0; k < list.length; k++) {
      for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
          if (matrix[i][j] !== "" && matrix[i][j][0] !== "h") {
            let type = matrix[i][j].toUpperCase();
            let value = Math.sqrt(
              Math.pow(Math.abs(list[k].key[1] - j), 2) +
                Math.pow(Math.abs(list[k].key[0] - i), 2)
            );
            let currMinDis = Math.min(value, list[k][type]);
            list[k][type] = currMinDis;
          }
        }
      }
    }
    
    let bestHouse = [];
    //finding house with minimum distance
    let mindist = Number.MAX_VALUE;
    for (let i = 0; i < list.length; i++) {
      let curr = 0;
      for (var key in list[i]) {
        if (key !== "key") {
          if (list[i][key] !== Number.MAX_VALUE) {
            curr += list[i][key];
          }
        }
      }
      if (curr < mindist) {
        mindist = curr;
        bestHouse = list[i].key;
      }
    }
    return bestHouse;
  }

  render() {
    const containerStyle = {
      height: "100%",
      width: "100%",
      margin: "10% auto",
      textAlign: "center",
    };
    const buttonStyle = {
      padding: "0.8em",
      margin: "10px auto",
      width: "auto",
      outline: "none",
      border: "none",
      cursor: "pointer",
      color: "#006308",
      fontWeight: '700'
    };
    const resultStyle={
      fontSize: "1.5em",
      color: '#006308',
      textTransform: "uppercase",
      fontWeight: "600",
    }
    return (
      <div style={containerStyle}>
        <Grid matrix={this.state.matrix} />
        <button style={buttonStyle} onClick={() => this.getBestHouse()}>
          Click to get the best house
        </button>
        {this.state.besthouse != "" && (
          <h4 style={resultStyle}>The best house is House number: {this.state.besthouse[1]}</h4>
        )}
      </div>
    );
  }
}

export default App;

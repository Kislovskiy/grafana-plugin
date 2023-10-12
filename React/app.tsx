import React from "react";
import ReactDOM from 'react-dom'
import LinePlot from "./LinePlot";

function App() {
    const data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]; // Replace with your data

    return (
        <div className="App">
            <h1>Line Plot Example</h1>
            <LinePlot
                data={data}
            />
        </div>
    );
}

ReactDOM.render(<App />, document.querySelector('#root'))

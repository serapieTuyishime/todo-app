import "./App.css";
import InputArea from "./components/InputArea";
import DisplayArea from "./components/DisplayArea";

function App() {
    return (
        <div className="main">
            <div className="gap-4 md:gap-8 p-5 md:p-10 overflow-y-hidden h-[80%] my-auto w-full sm:w-9/12 grid bg-gray-100 rounded-3xl content-start">
                <label className="font-bold text-gray-300 text-8xl">
                    todos
                </label>
                <InputArea />
                <DisplayArea />
            </div>
        </div>
    );
}

export default App;

import Button from "./Button.jsx";
import { Delete, Divide, Minus, Plus, X } from 'lucide-react'
import '../styles/Cal.css'
import { useState } from "react";
import { evaluate } from "mathjs";

const Cal = () => {
    const [display, setDisplay] = useState("0");
    const [expression, setExpression] = useState("");

    const handleDisplay = (click) => {
        setExpression("");
        if (click === "=") {
            handleResult();
            return;
        }

        if (display === "0") {
            setDisplay(click);
        } else {
            setDisplay(display + click);
        }

    };

    const handleResult = () => {
        if (!isNaN(Number(display))) {
            return;
        }

        const result = evaluate(display.replace(/÷/g, "/").replace(/x/g, "*"));

        setExpression(display);
        setDisplay(String(result));
    };

    const handleAC = () => {
        setDisplay("0");
        setExpression("");
    };

    const hanleDelete = () => {
        setExpression("");
        if (display.length === 1) {
            setDisplay("0");
        } else {
            setDisplay(display.slice(0, -1));
        }
    };

    const handlePlusMinus = () => {
        let m = display.match(/(-)([\d.]+)$/);
        if (m) {
            return setDisplay(display.slice(0, m.index) + '+' + m[2]);
        }

        m = display.match(/(\+)([\d.]+)$/);
        if (m) {
            return setDisplay(display.slice(0, m.index) + '-' + m[2]);
        }

        m = display.match(/(x|÷|%)([\d.]+)$/);
        if (m) {
            return setDisplay(display.slice(0, m.index + 1) + '(' + '-' + m[2] + ')');
        }
    }

    const handleDot = () => {
        if (display.includes(".")) {
            return;
        }
        setDisplay(display + ".");
    }

    return (
        <div className="calculator">

            <div className="display-cointer">
                <div className="expression">
                    {expression}
                </div>
                <div className="display">
                    {display}
                </div>
            </div>

            <div className="buttons">

                <Button type="function-btn" onClick={hanleDelete}>
                    <Delete />
                </Button>

                <Button type="function-btn" onClick={() => handleAC()}>
                    AC
                </Button>

                <Button type="function-btn" onClick={() => handleDisplay("%")}>
                    %
                </Button>

                <Button type="operator-btn" onClick={() => handleDisplay("÷")}>
                    <Divide />
                </Button>

                <Button type="number-btn" onClick={() => handleDisplay("7")}>
                    7
                </Button>

                <Button type="number-btn" onClick={() => handleDisplay("8")}>
                    8
                </Button>

                <Button type="number-btn" onClick={() => handleDisplay("9")}>
                    9
                </Button>

                <Button type="operator-btn" onClick={() => handleDisplay("x")}>
                    <X />
                </Button>

                <Button type="number-btn" onClick={() => handleDisplay("4")}>
                    4
                </Button>

                <Button type="number-btn" onClick={() => handleDisplay("5")}>
                    5
                </Button>

                <Button type="number-btn" onClick={() => handleDisplay("6")}>
                    6
                </Button>

                <Button type="operator-btn" onClick={() => handleDisplay("-")}>
                    <Minus />
                </Button>

                <Button type="number-btn" onClick={() => handleDisplay("1")}>
                    1
                </Button>

                <Button type="number-btn" onClick={() => handleDisplay("2")}>
                    2
                </Button>

                <Button type="number-btn" onClick={() => handleDisplay("3")}>
                    3
                </Button>

                <Button type="operator-btn" onClick={() => handleDisplay("+")}>
                    <Plus />
                </Button>

                <Button type="number-btn" onClick={handlePlusMinus}>
                    +/-
                </Button>

                <Button type="number-btn" onClick={() => handleDisplay("0")}>
                    0
                </Button>

                <Button type="number-btn" onClick={handleDot}>
                    ,
                </Button>

                <Button type="operator-btn" onClick={() => handleDisplay("=")}>
                    =
                </Button>
            </div>
        </div>
    )
}

export default Cal;
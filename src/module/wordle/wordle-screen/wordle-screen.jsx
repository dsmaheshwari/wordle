import {useEffect, useLayoutEffect, useMemo, useState} from "react";
import WordleWordRow from "../wordle-word-row/wordle-word-row.jsx";
import WordleKeyboard from "../wordle-keyboard/wordle-keyboard.jsx";

import reactLogo from '../../../assets/react.svg'
import '../wordle-screen/wordle-screen.css'

import WordleWordDef from "../wordle-word-def/wordle-word-def.jsx";
import RenderComponent from "../../../framework/jsx/Render-Component.jsx";
import Model from "./model.jsx";

function WordleScreenTemplate() {
    const [word, setWord] = useState("");
    const [wordDef, setWordDef] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [charList, setCharList] = useState([]);

    const [isKeyBoardDisabled, setIsKeyBoardDisabled] = useState(false);
    const [allRowsFilled, setAllRowsFilled] = useState(false);
    const [headerText, setHeaderText] = useState("Fetching Today's Wordle");

    const [wordMap, setWordMap] = useState({});
    const [count, setCount] = useState(0);``

    const fetchLength = 5;

    function fetchWordList() {
        return Model.fetchWordList(fetchLength);
    }

    function fetchWordDefinition(word) {
        return Model.fetchWordDefinition(word);
    }

    function renderRows() {
        const Row = [];

        for (let i = 0; i < (charList.length || fetchLength); i++) {

            Row.push(
                <WordleWordRow
                    key={i} index={i} rowCharList={charList[i]}>
                </WordleWordRow>
            )
        }

        return Row;
    }

    const memoizedRenderRows = useMemo(renderRows, [charList]);

    useLayoutEffect(() => {
        (async () => {
            const response = await fetchWordList();

            if (response.status === 200) {
                try {
                    const wordList = await response.data;
                    setWord(wordList[0]);
                    setHeaderText("Today's Wordle");
                } catch (error) {
                    console.error(error);
                    setHeaderText("No Word Today!")
                }
            } else {
                setHeaderText("No Word Today!")
            }

            setIsLoading(false);
        })();
    }, []);

    useEffect(() => {
        const rows = word.length || fetchLength;
        // Create unique instances per cell so updates don't leak across cells
        const charListArray = Array.from({length: rows}, () =>
            Array.from({length: rows}, () => ({char: "", className: ""}))
        );

        const l_wordMap = {};

        word.split("").forEach((char) => {
            if (l_wordMap[char]) {
                l_wordMap[char]++;
            } else {
                l_wordMap[char] = 1;
            }
        });

        setWordMap(l_wordMap);
        setCharList(charListArray);

        fetchWordDefinition(word.toLowerCase()).then(async (response) => {
            if (response.status === 200) {
                const definitions = await response.data;

                setWordDef(definitions?.["en"]);
            }
        }).catch(() => {
            setWordDef([]);
        });
    }, [word]);

    function onKeyPress(key) {
        const charListRow = Math.floor(count / fetchLength);
        const l_lastRowIndexFilled = (count % fetchLength) - 1;

        const l_charList = [...charList];

        if (key === "ENTER") {
            const rowToCheck = charListRow - 1;
            if (l_charList[rowToCheck].findIndex((e) => e.char === "") !== -1) return;

            // Local copy for this evaluation
            const localWordMap = {...wordMap};

            let correctPlacedCounter = 0;

            // First pass: mark greens (correct position)
            l_charList[rowToCheck].forEach((char, i) => {
                if (word.charAt(i) === char.char) {
                    char.className = "is-correct-placed no-back";
                    if (localWordMap[char.char] !== undefined) {
                        localWordMap[char.char]--;
                    }
                    correctPlacedCounter++;
                }
            });

            // Second pass: mark yellows (present but wrong position) or gray
            l_charList[rowToCheck].forEach((char) => {
                if (!char.className) {  // Not green
                    if (localWordMap[char.char] && localWordMap[char.char] > 0) {
                        char.className = "is-incorrect-placed no-back";
                        localWordMap[char.char]--;
                    } else {
                        char.className = "is-filled no-back";
                    }
                }
            });

            if ((correctPlacedCounter === l_charList[rowToCheck].length) || (count) === (fetchLength * fetchLength)) {
                setTimeout(() => {
                    setAllRowsFilled(true);
                    setIsKeyBoardDisabled(true);
                    setHeaderText(`Today's Wordle was ${word}`);
                }, 2000)
            } else {
                setIsKeyBoardDisabled(false);
            }

            setCharList([...l_charList]);
        } else if (key === "BACKSPACE") {
            if (count === 0) return;

            const targetCount = count - 1;
            const targetRow = Math.floor(targetCount / fetchLength);
            const targetCol = targetCount % fetchLength;

            if (!l_charList[targetRow][targetCol].className.includes("no-back")) {
                l_charList[targetRow][targetCol].char = "";
                setCount((prevState) => prevState - 1);
                setIsKeyBoardDisabled(false);
                setCharList([...l_charList]);
            }
        } else {
            l_charList[charListRow][l_lastRowIndexFilled + 1].char = key;

            setCount((prevState) => {
                if ((prevState + 1) % fetchLength === 0) {
                    setIsKeyBoardDisabled(true);
                }

                return prevState + 1
            });

            setCharList([...l_charList])
        }
    }


    return (
        <div>
            <h1>{headerText}</h1>
            {!allRowsFilled &&
                <>
                    {headerText !== "No Word Today!" &&
                        <>
                            {
                                isLoading ?
                                    <div>
                                        <img src={reactLogo} className="logo react" alt="React logo"/>
                                        <h2>With Love, from GHOST!</h2>
                                    </div>
                                    :
                                    <div>
                                        <div className="char-container">
                                            {memoizedRenderRows}
                                        </div>
                                        <WordleKeyboard disabled={isKeyBoardDisabled}
                                                        onKeyPress={onKeyPress}></WordleKeyboard>
                                    </div>
                            }
                        </>
                    }
                </>
            }

            {allRowsFilled && <WordleWordDef wordDef={wordDef}></WordleWordDef>}

        </div>
    );
}

function WordleScreen() {
    return RenderComponent(WordleScreenTemplate, {}, {});
}

export default WordleScreen;
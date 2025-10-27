import './wordle-word-row.css'

function WordleWordRow({index, rowCharList}) {
    const currentIndex = (index + 1).toString();
    const chars = Array.from(rowCharList || [], (char, i) => <div key={currentIndex + i.toString()} className={`char-box ${char?.className}`}>{char?.char}</div>);

    return (
        <div className="char-group">
            {
                chars
            }
        </div>
    )
}

export default WordleWordRow;
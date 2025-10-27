import parse from "html-react-parser"

function WordleWordDef({wordDef}) {
    return (
        <div>
            {
                wordDef.map((type, index) => (
                    <div key={index}>
                        <h3>{type["partOfSpeech"]}</h3>
                        <ol>
                            {type["definitions"]?.map((def, inner_index) => (
                                def.definition &&
                                <li key={inner_index}>
                                    <div>{parse(def.definition)}</div>
                                    {def.examples?.length > 0 &&
                                        <div>
                                            <h4>Example</h4>
                                            <ul>
                                                {def.examples.map((example, index) => (
                                                    <li key={index}>
                                                        {parse(example)}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    }
                                </li>
                            ))}
                        </ol>
                        <hr></hr>
                    </div>
                ))
            }
        </div>
    );
}

export default WordleWordDef;
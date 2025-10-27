import Services from "../../../framework/jsx/services.jsx";

function model() {
    const services = Services;

    return {
        fetchWordList: (fetchLength) => {
            return services.fetchResource(
                `https://random-word-api.vercel.app/api?length=${fetchLength}&type=uppercase&words=1`
            )
        },
        fetchWordDefinition: (word) => {
            return services.fetchResource(`https://en.wiktionary.org/api/rest_v1/page/definition/${word}?redirect=false`)
        }
    }
}

const WordleScreenModel = model();

export default WordleScreenModel;
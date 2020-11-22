const config = require('./Config/config.dev');
const consumeUri = require('./helper/consumeUri');

const start = async () => {
    let start = new Date().getTime();

    //get Top 10 words
    const top10Words = await getTopWord(10);

    // get synonyms
    const response = await getSynonymAndPos(top10Words);

    let end = new Date().getTime();

    console.log(response);
    console.log("\nTime to execute: " + Math.floor(((end - start) % (1000 * 60)) / 1000) + " seconds");
    return response
}


const getSynonymAndPos = async (topWords) => {
    let res = [];

    for(let item of topWords) {
        let uri = `${config.lookUpUrl}?key=${config.key}&lang=${config.lang}&text=${item.word}`;
        let response = await consumeUri(uri);

        res.push ({
            word: item.word,
            output: {
                count: item.count,
                synonyms: response.def[0] && response.def[0].tr,
                pos: response.def[0] && response.def[0].pos
            }
        });
    }

    return res;
}

const getTopWord = async (number) => {
    const bulKRawData = await consumeUri(config.bigTextUrl);
    const dict = {};
    const temparr = bulKRawData.split(' ');
    for(let i = 0; i < temparr.length; i++) {
        if(temparr[i] !== "") {
            if(dict[temparr[i]]){
                dict[temparr[i]]++;
            } else {
                dict[temparr[i]] = 1;
            }
        }
    }

    const keysSorted = Object.keys(dict).sort((a,b) => dict[b]-dict[a]);
    const temp = keysSorted.splice(0, number);

    let ret = []
    for(let key of temp) {
        ret.push({
            word: key,
            count: dict[key]
        });
    }

    return ret;
}


start();
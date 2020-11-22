const axios = require('axios');

module.exports = async (uri) => {
    const res = await axios.get(uri);
    return res.data;
}
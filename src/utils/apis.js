const axios = require('axios');

async function signup(payload) {
    const res = await axios.post(`${process.env.REACT_APP_DB_URL}/user/signup`, payload);
    return res;
};

module.exports = { signup, editNote };
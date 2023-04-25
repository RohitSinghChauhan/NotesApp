const axios = require('axios');

async function signup(payload) {
    const res = await axios.post(`https://notesapp-api-ygsd.onrender.com/user/signup`, payload);
    return res;
};

module.exports = { signup, editNote };
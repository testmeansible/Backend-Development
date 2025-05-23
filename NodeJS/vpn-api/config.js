const path = require('path'); // <== you MUST import 'path' first!

module.exports = {
    BASE_DIR: path.join(__dirname, 'ovpn_files'),    // .ovpn files are saved here
    CCD_DIR: path.join(__dirname, 'ccd'),             // CCD files are here
    SCRIPT_PATH: path.join(__dirname, 'scripts/generate-client.sh'), // Bash script path
    USERS_FILE: path.join(__dirname, 'db/users.json'), // database for tracking
    API_TOKEN: 'b8c2a3bd0dc3f8e9a456',                // SECRET TOKEN!
    SERVER_PORT: 8000                                 // Port number for your API
};

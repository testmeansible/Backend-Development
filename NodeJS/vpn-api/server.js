const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const morgan = require('morgan');
const { BASE_DIR, API_TOKEN, SERVER_PORT, CCD_DIR, SCRIPT_PATH, USERS_FILE } = require('./config');

const app = express();

app.use(express.json()); // Parse incoming JSON
app.use(morgan('combined')); // Log HTTP requests


// Ensure BASE_DIR and CCD_DIR exist
// if (!fs.existsSync(BASE_DIR)) {
//     fs.mkdirSync(BASE_DIR, { recursive: true });
// }
// if (!fs.existsSync(CCD_DIR)) {
//     fs.mkdirSync(CCD_DIR, { recursive: true });
// }


// Helper to read JSON database
function readJson(filePath) {
    if (!fs.existsSync(filePath)) {
        return {};
    }
    return JSON.parse(fs.readFileSync(filePath));
}

// Helper to write JSON database
function writeJson(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
}

// Middleware to check token
app.use((req, res, next) => {
    const token = req.headers['x-token'];
    if (!token || token !== API_TOKEN) {
        return res.status(403).json({ message: 'Forbidden: Invalid Token' });
    }
    next();
});

// API to generate VPN client
app.post('/generate', (req, res) => {
    const { team, member, subnet } = req.body;

    if (!team || !member || !subnet) {
        return res.status(400).json({ message: 'Missing required fields: team, member, subnet' });
    }

    const thirdOctet = subnet.split('.')[2]; // Extract team ID from subnet

    const username = `${team}-${member}`;

    const usersData = readJson(USERS_FILE);

    if (!usersData[team]) {
        usersData[team] = {
            teamId: thirdOctet,
            next_ip: 1,
            members: {}
        };
    }

    // Check if member already exists
    if (usersData[team].members[member]) {
        const assignedIp = usersData[team].members[member];
        const ovpnFilePath = path.join(BASE_DIR, `${username}.ovpn`);

        if (fs.existsSync(ovpnFilePath)) {
            console.log(`User ${username} already exists, sending existing file.`);
            return res.download(ovpnFilePath, `${username}.ovpn`);
        } else {
            console.log(`User record exists but .ovpn file missing. Regenerating...`);
            // Continue to regenerate below
        }
    }

    // Assign new IP
    const assignedIp = `10.8.${thirdOctet}.${usersData[team].next_ip}`;
    usersData[team].members[member] = assignedIp;
    usersData[team].next_ip += 1;

    // Save updated users data
    writeJson(USERS_FILE, usersData);

    const ccdFilePath = path.join(CCD_DIR, username);
    const ccdContent = `ifconfig-push ${assignedIp} 255.255.255.0
push "route 172.35.${thirdOctet}.0 255.255.255.0"
`;
    fs.writeFileSync(ccdFilePath, ccdContent);

    const ovpnFilePath = path.join(BASE_DIR, `${username}.ovpn`);

    // Run bash script to generate .ovpn file
    const command = `${SCRIPT_PATH} ${username}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error('Error executing script:', error);
            return res.status(500).json({ message: 'Error creating VPN config' });
        }

        if (!fs.existsSync(ovpnFilePath)) {
            return res.status(404).json({ message: 'VPN config not found after generation' });
        }

        res.download(ovpnFilePath, `${username}.ovpn`, (err) => {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    });
});

// Start server
app.listen(SERVER_PORT, () => {
    console.log(`VPN API server running on port ${SERVER_PORT}`);
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

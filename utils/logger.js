// utils/logger.js
const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    fgRed: "\x1b[31m",
    fgGreen: "\x1b[32m",
    fgYellow: "\x1b[33m",
    fgCyan: "\x1b[36m",
    fgWhite: "\x1b[37m",
    fgMagenta: "\x1b[35m"
};

const logCapture = (data) => {
    console.log(`\n${colors.fgYellow}================ TARGET CAPTURED ================${colors.reset}`);
    console.log(`${colors.fgCyan}Time:      ${colors.reset} ${data.time}`);
    console.log(`${colors.fgGreen}IP:        ${colors.reset} ${data.ip}`);
    
    // 🌍 Location & ISP
    console.log(`${colors.fgMagenta}Location:  ${colors.reset} ${data.location}`);
    console.log(`${colors.fgMagenta}ISP:       ${colors.reset} ${data.isp}`);
    
    console.log(`${colors.bright}Device:    ${colors.reset} ${data.device}`);
    console.log(`${colors.bright}OS:        ${colors.reset} ${data.os}`);
    console.log(`${colors.bright}Browser:   ${colors.reset} ${data.browser}`);
    
    // 🔋 Battery & Screen
    console.log(`${colors.fgCyan}Battery:   ${colors.reset} ${data.battery}`);
    console.log(`${colors.fgCyan}Screen:    ${colors.reset} ${data.screen}`);
    
    // 📶 Network Details
    console.log(`${colors.fgWhite}Network:   ${colors.reset} ${data.network}`);
    
    console.log(`${colors.fgYellow}=================================================${colors.reset}\n`);
};

module.exports = { logCapture };
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('Backup NutriApp.txt', 'utf8'));

const globalLog = data.history || [];
const bodyCompLog = data.bodyCompLog || [];
const dayFlags = data.dayFlags || {};
const userGarmin = data.garmin || {};

console.log('Total history entries:', globalLog.length);
console.log('Total bodyCompLog entries:', bodyCompLog.length);
console.log('dayFlags:', JSON.stringify(dayFlags));

function getPreviousDateStr(dateStr) {
    const [y, m, d] = dateStr.split('-').map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d));
    dt.setUTCDate(dt.getUTCDate() - 1);
    return dt.toISOString().split('T')[0];
}

// Check what days are in globalLog
const dailyKcalMap = {};
globalLog.forEach(item => {
    dailyKcalMap[item.date] = (dailyKcalMap[item.date] || 0) + (item.kcal || 0);
});

console.log('\n--- Daily Kcal in globalLog for Aug/Sep 2026 ---');
Object.keys(dailyKcalMap).sort().forEach(d => {
    if (d >= '2026-08-20') {
        console.log(d + ' : ' + Math.round(dailyKcalMap[d]) + ' kcal ' + (dayFlags[d]?.isIncomplete ? '(INCOMPLETE)' : ''));
    }
});

const sortedLogs = [...bodyCompLog].sort((a, b) => new Date(a.date) - new Date(b.date));

console.log('\n--- Evaluating bodyCompLog entries exactly like openGarminCalibrator() ---');
const validIndices = [];
let totalEatenKcal = 0;
let excludedDaysCount = 0;
const evaluatedDays = [];

sortedLogs.forEach((l, idx) => {
    const prevDate = getPreviousDateStr(l.date);
    const prevIncomplete = dayFlags[prevDate]?.isIncomplete;
    const currIncomplete = dayFlags[l.date]?.isIncomplete;
    
    if (prevIncomplete || currIncomplete) {
        excludedDaysCount++;
        console.log('Log [' + idx + '] ' + l.date + ': EXCLUDED because prevDate (' + prevDate + ') incomplete: ' + prevIncomplete + ', or currDate incomplete: ' + currIncomplete);
        return;
    }
    let dayLogs = globalLog.filter(i => i.date === prevDate);
    let usedDate = prevDate;
    if (!dayLogs.length) {
        dayLogs = globalLog.filter(i => i.date === l.date);
        usedDate = l.date;
    }
    if (!dayLogs.length) {
        excludedDaysCount++;
        console.log('Log [' + idx + '] ' + l.date + ': EXCLUDED because no logs found for ' + prevDate + ' nor ' + l.date);
        return;
    }
    let eaten = 0;
    dayLogs.forEach(i => eaten += (i.kcal || 0));
    if (eaten > 0) {
        validIndices.push(idx);
        totalEatenKcal += eaten;
        evaluatedDays.push({
            logIndex: idx,
            bodyCompDate: l.date,
            usedDate: usedDate,
            eaten: Math.round(eaten)
        });
        console.log('Log [' + idx + '] ' + l.date + ': INCLUDED using foods from ' + usedDate + ' -> ' + Math.round(eaten) + ' kcal');
    }
});

const k = validIndices.length;
console.log('\nTotal valid days (k):', k);
console.log('Excluded days count:', excludedDaysCount);
console.log('Total eaten kcal:', Math.round(totalEatenKcal));
console.log('avgEaten:', Math.round(totalEatenKcal / k));

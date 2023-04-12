const request = require('request');
const fs = require('fs');

const possibleChars = '0123456789abcdefghijklmnopqrstuvwxyz'; //-0123456789abcdefghijklmnopqrstuvwxyz
let checkedUrls = new Set();
let foundUrls = 0;
const targetAmount = 1;
const chunkSize = 10;

const checkUrl = (url) => {
  if (checkedUrls.has(url)) {
    return;
  }
  checkedUrls.add(url);
  request(`https://steamcommunity.com/id/${url}`, (error, response, body) => {
    if (error) {
      console.log(`An error occurred while checking ${url}. Skipping.`);
      return;
    }
    if (body.includes("The specified profile could not be found.")) {
      console.log(`${url} is available`);
      fs.appendFile('found_urls.txt', `${url}\n`, (err) => {
        if (err) throw err;
        console.log(`${url} is available and saved`);
      });
      foundUrls++;
      if (foundUrls === targetAmount) {
        console.log(`Found ${targetAmount} available URLs. Stopping.`);
        fs.writeFileSync('checked_urls.txt', [...checkedUrls].join('\n'));
        process.exit(0);
      }
    } else {
      console.log(`${url} is taken.`);
    }
  });
};

fs.readFile('checked_urls.txt', 'utf8', (err, data) => {
  if (err) {
    console.log('File not found, starting from scratch.');
  } else {
    checkedUrls = new Set(data.split('\n'));
  }

  const checkChunk = () => {
    if (foundUrls >= targetAmount) {
      console.log(`Found ${targetAmount} available URLs. Stopping.`);
      fs.writeFileSync('checked_urls.txt', [...checkedUrls].join('\n'));
      process.exit(0);
    }

    let newUrls = [];
    while (newUrls.length < chunkSize) {
      let currentUrl = Array.from({length: 3}, () => possibleChars[Math.floor(Math.random() * possibleChars.length)]).join('');
      if (!checkedUrls.has(currentUrl)) {
        newUrls.push(currentUrl);
      }
    }

    for (const url of newUrls) {
      console.log(`Checking ID/${url}`);
      checkUrl(url);
    }

    fs.writeFileSync('checked_urls.txt', [...checkedUrls].join('\n'));
    setTimeout(checkChunk, 2000);
  };

  checkChunk();
});


// if you want hyphen infront of combination or back do like this:
// For front use this
// let currentUrl = '-' + Array.from({length: 3}, () => possibleChars[Math.floor(Math.random() * possibleChars.length)]).join('');
// For back use this
// let currentUrl = Array.from({length: 3}, () => possibleChars[Math.floor(Math.random() * possibleChars.length)]).join('') + '-';
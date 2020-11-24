const report = require('./lighthouse-results.json');

const printreport = () => {
  const results = report.categories;
  for (const result in results) {
    if (results) {
      console.log(results[result].title + ' ' + Math.floor(results[result].score * 100));
      if (Math.floor(results[result].score * 100) < 10) {
        throw Error(results[result].title + ' score is to low in lighthouse audit. Score: ' + Math.floor(results[result].score * 100));
      }
    }
  }
};

printreport();


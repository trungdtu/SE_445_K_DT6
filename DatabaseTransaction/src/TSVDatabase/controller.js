const fs = require('fs');
const tsvJSON = (tsv) => {
  function hasOnlyWhitespace(s) {
    return /^[ \t\r]*$/.test(s);
  }
  const lines = tsv.split("\n");
  const result = [];
  const headers = lines[0].split("\t");
  for (let i = 1; i < lines.length; i++) {
    try {
      const obj = {};
      const currentline = lines[i].split("\t");
      if (!hasOnlyWhitespace(currentline)) {
        for (let j = 0; j < headers.length; j++) {
          if (j === headers.length - 1){
            obj[headers[j].slice(0, -1)] = i !== lines.length -1 ? currentline[j].slice(0, -1) : currentline[j]
          } else {
            obj[headers[j]] = currentline[j];
          }
        }
        result.push(obj);
      }
    } catch (_e) {
      result.push(null);
    }
  }
  return result;
}
class TSVController {
  getTSV = () => {
    try {
      const data = fs.readFileSync('D:/TichHopHeThong/DeTaiNhom/DatabaseTransaction/src/TSVDatabase/db.tsv', 'utf8');
      return tsvJSON(data);
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
module.exports = new TSVController();
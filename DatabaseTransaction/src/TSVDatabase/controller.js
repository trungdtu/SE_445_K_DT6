const fs = require('fs');
const tsvJSON = (tsv) => {
  const lines = tsv.split("\n");
  const result = [];
  const headers = lines[0].split("\t");

  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentline = lines[i].split("\t");

    for (let j = 0; j < headers.length; j++) {
      if (j === headers.length - 1){
        obj[headers[j].slice(0, -1)] = i !== lines.length -1 ? currentline[j].slice(0, -1) : currentline[j]
      } else {
        obj[headers[j]] = currentline[j];
      }
    }
    result.push(obj);
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
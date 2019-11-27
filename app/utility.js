const fs = require('fs');
const esconfig = require('./esConfig');
const client = esconfig.esClient;
const data = JSON.parse(fs.readFileSync(__dirname + '/dataToEs.json'));
const config = require('./config');


const index= config.es_index;
const type = config.es_type;


  async function writeCarDataToEs(index, data){
    for (let i = 0; i < data.length; i++ ) {
      await client.create({
        refresh: true,
        index: index,
        id: i,
        body: data[i]
      }, function(error, response) {
        if (error) {
          console.error("Failed to import data", error);
          return;
        }
        else {
          console.log("Successfully imported data", data[i]);
        }
      });
    }

};

async function createCarMapping (index, type) {
  const carSchema = {
      "Acceleration": {
        "type": "long"
      },
      "Cylinders": {
        "type": "long"
      },
      "Displacement": {
        "type": "long"
      },
      "Horsepower": {
        "type": "long"
      },
      "Miles_per_Gallon": {
        "type": "long"
      },
      "Name": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "Origin": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "Weight_in_lbs": {
        "type": "long"
      },
      "Year": {
        "type": "date"
    }
  }
  return client.indices.putMapping({index, type, body:{properties:carSchema}});
}

module.exports = {
async resetIndex(){
 if (client.indices.exists({ index })) {
      client.indices.delete({ index });
   }
 client.indices.create({ index });
 createCarMapping(client, index, type);
 writeCarDataToEs(index, data);
}
};











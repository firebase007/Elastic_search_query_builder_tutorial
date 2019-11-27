const esconfig = require('./esConfig');
const client = esconfig.esClient;
const config = require('./config');
const index = config.es_index;

const esb = require('elastic-builder'); //the builder


module.exports = {

  async search(){
    const requestBody = esb.requestBodySearch()
    .query(esb.matchAllQuery())
    .size(10)
    .from(1);
    return client.search({index: index, body: requestBody.toJSON()});
  },

  async filterCarsByYearMade(param) {
    const requestBody = esb.requestBodySearch()
                            .query(
                                esb.boolQuery()
                                    .must(esb.matchAllQuery())
                                    .filter(esb.rangeQuery('Year').gte(param).lte(param))

                            )
                            .from(1)
                            .size(5);
    return client.search({index: index, body: requestBody.toJSON()});
  },


async filterCarsByName(param) {
  const requestBody = esb.requestBodySearch()
  .query(
      esb.termQuery('Name', param))
      .sort(esb.sort('Year', 'asc')
  )
  .from(1)
  .size(10);
  return client.search({index: index, body: requestBody.toJSON()});

},

async fetchCarByName(param) {
  const requestBody = esb.requestBodySearch()
    .query(
      esb.boolQuery()
        .must(esb.matchPhraseQuery('Name', param))
    );
  return client.search({index: index, body: requestBody.toJSON()});
},

async fetchMatchMultipleQuery(origin, name,weight){
  const requestBody = esb.requestBodySearch()
      .query(
        esb.boolQuery()
          .must([
            esb.matchQuery(
              'Origin', origin,
            ),
            (
              esb.matchQuery(
                'Name', name,
              )
            ),
          ])
        .filter(esb.rangeQuery('Weight_in_lbs').gte(weight))
      )
      return client.search({index: index, body: requestBody.toJSON()});
},

async aggregateQuery(origin,cylinder,name,horsePower) {
const requestBody = esb.requestBodySearch()
.query(
    esb.boolQuery()
        .must(esb.matchQuery('Origin', origin))
        .filter(esb.rangeQuery('Cylinders').gte(cylinder))
        .should(esb.termQuery('Name', name))
        .mustNot(esb.rangeQuery('Horsepower').gte(horsePower))
        // .agg(esb.avgAggregation('avg_miles', 'Miles_per_Gallon'))
)
return client.search({index: index, body: requestBody.toJSON()});
},

};


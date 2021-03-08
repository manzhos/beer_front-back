const {Schema, model, Types} = require('mongoose'), privatePaths = require('mongoose-private-paths')

const schema = new Schema({
  name: {type: String, required: true},
  tagline: {type: String},
  first_brewed: {type: Date},
  description: {type: String},
  image_url: {type: String},
  abv: {type: Number},
  ibu: {type: Number, private: true},
  target_fg: {type: Number, private: true},
  target_og: {type: Number, private: true},
  ebc: {type: Number, private: true},
  srm: {type: Number, private: true},
  ph: {type: Number, private: true},
  attenuation_level: {type: Number, private: true},
  _volume: { 
    value: {type: Number}, 
    unit: {type: String}
  },
  _boil_volume: { 
    value: {type: Number}, 
    unit: {type: String} 
  },
  _method: {
    mash_temp: [
      { temp: { 
        value: {type: Number}, 
        unit: {type: String} 
      }, 
      duration: {type: Number} }
    ],
    fermentation: { 
      temp: { 
        value: {type: Number}, 
        unit: {type: String}, 
      } 
    },
    twist: {type: Number}
  },
  _ingredients: {
    malt: [
      {
        name: {type: String},
        amount: { value: {type: Number}, unit: {type: String} }
      },
      { name: {type: String}, amount: { value: {type: Number}, unit: {type: String} } },
      { name: {type: String}, amount: { value: {type: Number}, unit: {type: String} } }
    ],
    hops: [
      {
        name: {type: String},
        amount: { value: {type: Number}, unit: {type: String} },
        add: {type: String},
        attribute: {type: String}
      },
      {
        name: {type: String},
        amount: { value: {type: Number}, unit: {type: String} },
        add: {type: String},
        attribute: {type: String}
      },
      {
        name: {type: String},
        amount: { value: {type: Number}, unit: {type: String} },
        add: {type: String},
        attribute: {type: String}
      },
      {
        name: {type: String},
        amount: { value: {type: Number}, unit: {type: String} },
        add: {type: String},
        attribute: {type: String}
      },
      {
        name: {type: String},
        amount: { value: {type: Number}, unit: {type: String} },
        add: {type: String},
        attribute: {type: String}
      }
    ],
    yeast: {type: String}
  },
  _food_pairing: [String],
  _brewers_tips: {type: String},
  contributed_by: {type: String}
})

module.exports = model('Beer', schema.plugin(privatePaths))

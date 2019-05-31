const path = require('path');
require(path.join(__dirname, 'init'));

module.exports = {
  test() {
    console.log('data_validation.js run...');
  },
  validate(value, params) {
    // params = {
    // min
    // max
    // min_val
    // max_val
    // }

    try {
      if (value === undefined || params === undefined) {
        return 'ERR (datu struktūrā)...';
      }

      let txt = '';
      if (params.txt !== undefined) txt = params.txt.toString() + ' ';

      if (params.min !== undefined && params.min.numS() > 0 && value.toString().length < params.min.numS()) {
        return txt + '- neatbilst min. garumam...'
      }

      if (params.max !== undefined && params.max.numS() > 0 && value.toString().length > params.max.numS()) {
        return txt + '- pārsniegts max. garums...'
      }

      if (params.min_val !== undefined && ((typeof params.min_val === 'number') ? value.numS() : value) < params.min_val) {
        return txt + '- neatbilst min. vērtībai...'
      }

      if (params.max_val !== undefined && ((typeof params.max_val === 'number') ? value.numS() : value) > params.max_val) {
        return txt + '- pārsniegta max. vērtība...'
      }

    } catch (error) {
      return 'ERR (validācijas modulī)...'
    }
    return false;
  },
};
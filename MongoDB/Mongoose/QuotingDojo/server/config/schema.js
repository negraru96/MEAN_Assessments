var mongoose = require('mongoose');

mongoose.model('Quote', new mongoose.Schema)({
  name: String,
  line: String,
}, { timestamps: true });

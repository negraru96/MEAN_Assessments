var mongoose = require('mongoose');

// var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  email: {type: String,
    required: [true, "Enter a valid Email Address"],
      validate: { validator: function(value) {
                    //return /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/.test(value);
                    return /@/.test(value);
    },
    message: 'Enter a real valid Email Address'
  }
},
  password: {type: String,
    required: [true, "Password must contain a number, uppercase letter and special character."],
    minlength: 8,
    maxlength: 120,
      validate: { validator: function(value) {
                  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,120}/.test( value );
    },
    message: "Password must contain a number, uppercase letter and special character."
  }
},
}, { timestamps: true }
);
mongoose.model('User', UserSchema);

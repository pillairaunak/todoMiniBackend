const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://Enter_Your_UserName:Enter_Your_Password@Enter_Your_Database_Cluster_Name');

const tagSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
  },
  todos: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Todo' 
  }]
},{
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  }
});

tagSchema.virtual('url').get(function() {
  return `http://localhost:8080/tags/${this._id}`;
});

module.exports = mongoose.model('Tag', tagSchema);
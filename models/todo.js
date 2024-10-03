const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://Enter_Your_UserName:Enter_Your_Password@Enter_Your_Database_Cluster_Name');

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { 
    type: Boolean, 
    default: false,
    set: v => v === 'true' || v === true || v === 'True' || v === 1 || v === '1'
  },
  order: { type: Number, default: 0 },

  tags: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Tag' 
  }]
}, {
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  }
});

todoSchema.virtual('url').get(function() {
  return `http://localhost:8080/todos/${this._id}`;
});

module.exports = mongoose.model('Todo', todoSchema);
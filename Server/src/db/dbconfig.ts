

const mongoose = require('mongoose');


const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect('mongodb+srv://User:1234@todolist.x8ilx1a.mongodb.net/Chat?retryWrites=true&w=majorit', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      writeConcern: { w: 'majority' },
    });

    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error);
  }
};

export default connectDB;

import mongoose from 'mongoose';

import defaults from '../config/default';

mongoose.set('strictQuery', false)

const connection = () => {
  try {
    mongoose.connect(defaults.db_url());
    return true
  } catch (error) {
    return false
  }
}

export default connection
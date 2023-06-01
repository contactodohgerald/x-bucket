import dotevn from 'dotenv';

dotevn.config();

class DefaultExports {

    port: any = () => process.env.SERVER_PORT || 9000;

    db_url: any = () => process.env.MONGO_URI

}

const defaults = new DefaultExports()
export default defaults
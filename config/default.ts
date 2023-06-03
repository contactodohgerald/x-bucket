import dotevn from 'dotenv';

dotevn.config();

class DefaultExports {

    port: any = () => process.env.SERVER_PORT || 9000;

    db_url: any = () => process.env.MONGO_URI

    jwt_secret: any = () => process.env.JWT_SECRET

    jwt_expires: any = () => process.env.JWT_EXPIRES

    openai_api_key: any = () => process.env.OPENAI_API_KEY

    flw_secret_key: any = () => process.env.FLW_SECRET_KEY

    flw_public_key: any = () => process.env.FLW_PUBLIC_KEY

}

const defaults = new DefaultExports()
export default defaults
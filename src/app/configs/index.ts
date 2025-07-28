import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    clientSite_url: process.env.CLIENT_SITE_URL,
    jwt: {
        jwt_secret: process.env.JWT_SECRET,
        expiresin: process.env.JWT_EXPIRES_IN,
    },
    ssl: {
        storeId: process.env.SSL_STORE_ID,
        storePass: process.env.SSL_STORE_PASS,
        isLive: process.env.SSL_IS_LIVE === 'true',
        sslValidateUrl: process.env.SSL_VALIDATE_URL,
    }
    // cloudinary: {
    //     cloud_name: process.env.CLOUDINARY_NAME,
    //     api_key: process.env.CLOUDINARY_API_KEY,
    //     api_secret: process.env.CLOUDINARY_API_SECRET
    // }
};
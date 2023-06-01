
import router from './router';

const combineRouter = (app: any) => {

    app.use('/api/v1/', router);
    
}

export default combineRouter;
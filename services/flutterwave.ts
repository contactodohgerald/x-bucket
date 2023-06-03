//import Flutterwave from 'flutterwave-node-v3';
const Flutterwave = require('flutterwave-node-v3');
import defaults from '../config/default';

const flw = new Flutterwave(String(defaults.flw_public_key()), String(defaults.flw_secret_key()));

class PaymentHandler {

    verifyPayment = async (trans_ref: string) => {
        return await flw.Transaction.verify({id: trans_ref})
    }

}

const flutterwave = new PaymentHandler();
export default flutterwave
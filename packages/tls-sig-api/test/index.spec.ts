import { TLSSigAPI } from '../src';

const api = new TLSSigAPI(1400000000, '5bd2850fff3ecb11d7c805251c51ee463a25727bddc2385f3fa8bfee1bb93b5e');
const sig = api.genUserSig('Anguer', 86400 * 180);
console.log('sig ' + sig);

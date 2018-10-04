const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id: 10
};

var password = '123qwe123';

var token = jwt.sign(data, password);
console.log(token);

var decode = jwt.verify(token,password);
console.log(decode);

// JWT exemple!
// var message = 'I am user number 3';
// var hash = SHA256(message).toString() ;

// console.log('MEssage: '+message);
// console.log(`HASH: ${hash}`);

// var data = {
//   id: 4
// };

// var token = {
//   data: data+'123',
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed. Do not trust');
// }


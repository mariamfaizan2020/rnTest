
const functions = require("firebase-functions");
// import functions from 'firebase-functions'
// import Stripe from 'stripe'
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
 const stripe=require('stripe')('sk_test_51IIHeJKkI1eBMEemTvInVMskjoGVkstbIBOLz4XDc8MIfavFZ9Xj6ieT1RZhEKuKxJE80sqwWkKrAFarEFerte9m00SoLKwUkg')
 
exports.completePaymentWithStripe = functions.https.onRequest((request,response)=>{
      stripe.charges.create({
          amount:request.body.amount,
          currency:request.body.currency,
          source:'tok_mastercard'
      }).then(charge=>{
         console.log('payment done',charge)

          response.json({
              charge:charge,
              status:true
            })
      })
      .catch(error =>{
        response.json({
            error:error,
            status:false
        })
          console.log(error)
      })
})
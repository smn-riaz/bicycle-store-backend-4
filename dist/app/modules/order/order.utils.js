"use strict";
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import Shurjopay from 'shurjopay';
// import config from '../../config';
// const shurjopay = new Shurjopay();
// shurjopay.config(
//   config.sp_endpoint!,
//   config.sp_username!,
//   config.sp_password!,
//   config.sp_prefix!,
//   config.sp_return_url!
// );
// const makePaymentAsync = async (paymentPayload: any) => {
//    return new Promise((resolve, reject) => {
//         shurjopay.makePayment(paymentPayload, (response) => resolve(response), (error) => reject(error) )
//     })
// //   const paymentResult = await  shurjopay.makePayment(
// //     paymentPayload,
// //     (response) => {
// //         sendResponse(res, {
// //             statusCode:200,
// //             message:'Order placed successfully',
// //             data:response
// //         })
// //     },
// //     (error) => console.log(error)
// //   );
// //   return paymentResult;
// };
// const verifyPaymentAsync = (order_id:string) => {
//   return new Promise((resolve, reject) => {
//     shurjopay.verifyPayment(order_id, (response) => resolve(response), (error) => reject(error))
//   }) 
// }
// export const orderUtils = {
//   makePaymentAsync,
//   verifyPaymentAsync
// };

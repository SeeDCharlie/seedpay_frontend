// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  url: "http://ec2-3-84-86-225.compute-1.amazonaws.com/api",
  //url: "http://localhost:8000/api",
  urlS3: "http://ec2-3-84-86-225.compute-1.amazonaws.com/storageService/uploadimage",
//  amazonS3: "http://sstorage-seedpay.s3.sa-east-1.amazonaws.com/",
  amazonS3:"https://sstorage-seedpay.s3.amazonaws.com/",
  production: false,
  instagram_token: 'INSTA_TOKEN',
  stripe_token: 'STRIPE_TOKEN',
  paypal_token: 'PAYPAL_TOKEN'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

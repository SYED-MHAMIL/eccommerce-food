// 'https://food-backend-1c5b.vercel.app'
const BackendUrl ='https://food-backend-1c5b.vercel.app';
const  BaseUrl={
   food:`${BackendUrl}/food`,
   order:`${BackendUrl}/order `,
   orderdelete: `${BackendUrl}/order`,
   stripe:`${BackendUrl}/stripe/create-checkout-session`,
   ordersData:`${BackendUrl}/stripe/api/session`,
   login:`${BackendUrl}/auth/login`,
   register:`${BackendUrl}/auth/register`,
}
export default BaseUrl;

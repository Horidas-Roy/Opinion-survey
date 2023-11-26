import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = () => {
  return (
    <div className="h-[100vh]">
      <Elements stripe={stripePromise}>
        <div className="w-1/2 mx-auto">
          <CheckOutForm />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;

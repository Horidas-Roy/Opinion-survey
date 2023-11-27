import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";


const CheckOutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const serviceCharge = 100;
  console.log(user.email)

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { serviceCharge })
      .then((res) => {
        // console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure]);

  const { data: users = [], isLoading, refetch,} = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (isLoading) {
    return <span className="loading loading-spinner text-secondary"></span>;
  }
   console.log(users)
  const newProUser=users.find(item=> item.email === user.email)
  console.log(newProUser)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("Payment error", error);
      setError(error?.message);
    } else {
      console.log("payment Method", paymentMethod);
      setError("");
    }

    //confirm payment
    const { paymentIntent, error: confirmErr } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmErr) {
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        //now save the payment in the database
        const payment = {
          email: user.email,
          serviceCharge: serviceCharge,
          date: new Date(),
        };

        const res = await axiosSecure.post("/payments", payment);
        console.log(res.data.insertedId);
        if (res.data.insertedId) {
          axiosSecure.patch(`/users/proUser/${newProUser._id}`).then((res) => {
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `You are now a pro-user!`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn bg-gradient-to-r from-[#e31048] to-[#ff5100] text-white font-bold text-xl my-2 py-2 px-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay Now
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && (
        <p className="text-green-600">Your transaction Id: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckOutForm;

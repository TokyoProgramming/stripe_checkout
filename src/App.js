import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "./App.css";

const striePromise = loadStripe(
  "pk_test_51Jh5GUEUVzsUE3jHPBElWgnbDEaOnE3M25G56Fari43KN9jc67KnyT0qqHT1SPGLwESP1GSCZyG2FZTHEpUF2Xf700ZH0AvmRV"
);

function App() {
  const [stripeError, setStripeError] = useState();
  const [loading, setLoading] = useState();
  const [money, setMoney] = useState(1000);

  const handleClick = async () => {
    setLoading(true);

    const stripe = await striePromise;

    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: "price_1KaIixEUVzsUE3jHxkGuRvOR",
          quantity: money,
        },
      ],
      mode: "payment",
      cancelUrl: window.location.origin,
      successUrl: `${window.location.origin}/thanku`,
    });

    if (error) {
      setLoading(false);
      setStripeError(error);
    }
  };

  return (
    <>
      {stripeError && <p>{stripeError} </p>}

      <button onClick={handleClick}> Go to Checkout </button>
    </>
  );
}

export default App;

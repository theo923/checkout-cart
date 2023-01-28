import axios from "axios";
import Cart from "@/components/Cart";

const options = {
  headers: {
    accept: "application/json",
    "X-API-KEY":
      "5fa47041cf1bca32b11f72a3bac177bcbec210479c06821401b5e3501ca7e262",
  },
};

const sortById = (array) => {
  return array.reduce((obj, value) => {
    obj[value.productId] = value;
    return obj;
  }, {});
};

const readProduct = async () => {
  let result = [];
  await axios
    .get("https://api.chimoney.io/v0.2/info/assets", options)
    .then(({ data }) => {
      result = sortById(data?.data?.giftCardsRLD?.content);
    });

  return result;
};

const ShoppingCart = ({ data }) => {
  return <Cart data={data} />;
};

export default ShoppingCart;

export const getServerSideProps = async () => {
  const data = await readProduct();
  return {
    props: { data },
  };
};

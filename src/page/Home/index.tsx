import { FC, useEffect } from "react";
import authApi from "../../apis/authApi";
import Transactions from "../../component/DefaultLayout/Transactions";

const Home: FC = () => {
  useEffect(() => {
    authApi
      .getUserInfo()
      .then((res) => {
        console.log(res.json());
      })
      .catch((errr) => {
        console.error(errr);
      });
  }, []);
  return (
    <div className="">
      <Transactions />
       
    </div>
  );
};

export default Home;

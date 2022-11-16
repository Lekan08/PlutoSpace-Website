/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react";
import GHeaders from "getHeader";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Barch() {
  const navigate = useNavigate();
  const { allGHeaders: miHeaders } = GHeaders();
  const [opened, setOpened] = useState(false);
  const yearz = new Date().getFullYear();
  const [dAmt, setDAmt] = useState([]);
  const [VAT, setVAmt] = useState([]);
  const [Pay, setPAmt] = useState([]);
  const [Bo, setBo] = useState([]);
  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const year = Date.parse(new Date());
    let isMounted = true;
    if (data11 === null) {
      navigate("/authentication/sign-in");
      window.location.reload();
    } else {
      setOpened(true);
      const orgIDs = data11.orgID;
      fetch(`${process.env.REACT_APP_LOUGA_URL}/supply/getForYear/${orgIDs}/${year}`, {
        headers,
      })
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((result) => {
          if (result.message === "Expired Access") {
            navigate("/authentication/sign-in");
            window.location.reload();
          }
          if (result.message === "Token Does Not Exist") {
            navigate("/authentication/sign-in");
            window.location.reload();
          }
          if (result.message === "Unauthorized Access") {
            navigate("/authentication/forbiddenPage");
            window.location.reload();
          }
          if (isMounted) {
            const well = result;
            const totalDA = [];
            const totalVAT = [];
            const totalBo = [];
            const totalPay = [];
            for (const key in well) {
              totalDA.push(well[key].totalTotalAmount);
              totalVAT.push(well[key].totalVatAmount);
              totalBo.push(well[key].totalBonusAmount);
              totalPay.push(well[key].totalPayingAmount);
            }
            setOpened(false);
            setDAmt(totalDA);
            setVAmt(totalVAT);
            setPAmt(totalPay);
            setBo(totalBo);
            console.log([totalDA, totalVAT, totalPay, totalBo]);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, []);
  const labels = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "Total supply Amount",
        data: dAmt,
        fill: false,
        borderColor: "#752774",
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Total Bonus Amount",
        data: Bo,
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Total Paying Amount",
        data: Pay,
        fill: false,
        borderColor: "#742774",
        backgroundColor: "rgb(153, 102, 255)",
      },
      {
        label: "Total VAT Amount",
        data: VAT,
        fill: true,
        borderColor: "#702774",
        backgroundColor: "rgb(80, 220, 20)",
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `supply  Statistics For The Year ${yearz}`,
        position: "top",
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Months", padding: 20 },
      },
      y: {
        title: {
          display: true,
          text: "Amount",
          // color: "black",
          fontSize: 20,
          padding: 20,
        },
        //   ticks: {
        //     min: 0, // minimum value
        //     max: 1000, // maximum value
        //   },
      },
    },
  };
  return (
    <div>
      <Bar data={data} options={options} />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </div>
  );
}

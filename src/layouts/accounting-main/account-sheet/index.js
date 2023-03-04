import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
// import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
// import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MDTypography from "components/MDTypography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";

function AccountSheet() {
  const MySwal = withReactContent(Swal);

  //   const [namex, setName] = useState("");
  //   const [descripx, setDescrip] = useState("");

  //   const [enabled, setEnabled] = useState("");
  //   const [checkedName, setCheckedName] = useState("");
  const [items, setItems] = useState([]);
  const [account, setAccount] = useState({});

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  //   const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const getPostedTransactionsByAccountID = (accountID) => {
    // const data11 = JSON.parse(localStorage.getItem("user1"));

    // const orgIDs = data11.orgID;
    setOpened(true);
    const headers = miHeaders;
    const startTime = new Date("2020/02/02").getTime();
    const endTime = new Date().getTime();

    // const date = new Date();
    // const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    // const curDay = new Date().getTime();

    fetch(
      `${process.env.REACT_APP_LOUGA_URL}/accounts/getPostedTransaction/${accountID}/${startTime}/${endTime}`,
      {
        headers,
      }
    )
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
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
        console.log(result);
        console.log(account);
        if (result.status !== 500) {
          // if (Object.keys(result).length !== 0) {
          if (result.length !== 0) {
            setItems(result);
          } else {
            setItems([]);
          }
        }

        setOpened(false);
      })
      .catch((error) => {
        setOpened(false);
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };

  const handleGetByIDs = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    // const data11 = JSON.parse(localStorage.getItem("user1"));

    // const orgIDs = data11.orgID;
    setOpened(true);
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/accounts/getByIds/${id}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
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
        console.log(result);
        console.log(items);
        if (result.status !== 500) {
          // if (Object.keys(result).length !== 0) {
          if (result.length !== 0) {
            setAccount(result[0]);
            getPostedTransactionsByAccountID(result[0].id);
          } else {
            setAccount({});
          }
        }

        setOpened(false);
      })
      .catch((error) => {
        setOpened(false);
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      //   fetches the table data
      handleGetByIDs();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={30}>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Account Sheet
            </MDTypography>
          </MDBox>
          <MDBox>
            <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
              <div
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px #0f0f0f solid",
                  paddingTop: "2%",
                  width: "80mm",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div>
                  <img
                    src="data:image/jpeg;base64,/9j/4gIcSUNDX1BST0ZJTEUAAQEAAAIMbGNtcwIQAABtbnRyUkdCIFhZWiAH3AABABkAAwApADlhY3NwQVBQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApkZXNjAAAA/AAAAF5jcHJ0AAABXAAAAAt3dHB0AAABaAAAABRia3B0AAABfAAAABRyWFlaAAABkAAAABRnWFlaAAABpAAAABRiWFlaAAABuAAAABRyVFJDAAABzAAAAEBnVFJDAAABzAAAAEBiVFJDAAABzAAAAEBkZXNjAAAAAAAAAANjMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB0ZXh0AAAAAEZCAABYWVogAAAAAAAA9tYAAQAAAADTLVhZWiAAAAAAAAADFgAAAzMAAAKkWFlaIAAAAAAAAG+iAAA49QAAA5BYWVogAAAAAAAAYpkAALeFAAAY2lhZWiAAAAAAAAAkoAAAD4QAALbPY3VydgAAAAAAAAAaAAAAywHJA2MFkghrC/YQPxVRGzQh8SmQMhg7kkYFUXdd7WtwegWJsZp8rGm/fdPD6TD////gABBKRklGAAEBAABIAEgAAP/tADZQaG90b3Nob3AgMy4wADhCSU0EBAAAAAAAGRwCZwAUWXdJM19RV3JsakxZaXRoSGVNTEcA/9sAQwAHBwcHBwcMBwcMEQwMDBEXERERERceFxcXFxceJB4eHh4eHiQkJCQkJCQkKysrKysrMjIyMjI4ODg4ODg4ODg4/9sAQwEJCQkODQ4ZDQ0ZOyghKDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7/8IAEQgDPAM8AwEiAAIRAQMRAf/EABwAAQACAwEBAQAAAAAAAAAAAAAFBgEDBAcCCP/EABkBAQADAQEAAAAAAAAAAAAAAAADBAUCAf/aAAwDAQACEAMQAAAB9IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQ8mbSHJh8/QI8kFTkyZAIklmnJtRMsCDJxW7GZI8kEOJhxdoAARsIW1ES4ARGCYRUqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfnD3fwj28sH5u/Q/54P0Xu085VfMMe2HmMP+guQ809U8F9QLZ4F774Eevb9G88Y9/wDAPfyq+Tenefmq923tNvk/rHk5UOi23wrF94+wAee2zw4+pv1OXPz1er54YfoJXLGfnjfo9hPOfbIuUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPzh8/Xu54M/SP5uP0XWrLGnj/vH5597Os+TzLbXLmXrwL33wI9e36Nx4z7/4B7+fHk/rOo8M9ko0Wex+T+seTlQ33r0YoN+ACn0L0zx8/QLm6R5H6x4YXi/0+4H5436PdDyX20AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPzf7xA2w6vzd+kaQXHd8fZ5TXfdqkQlfmJUpPtvz0Dxz2PjPJ098kF7Lx9h5vWfaKEQCYvh3eT+sV08ql7SOm3Qk2APH/YPg8OtcrAkIulzPrYH5491r1qOkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwHNx8dSqC+OJLAr2fPbAg+vriSa/uSPI9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADBj4jYCvYmYiSl45al1W3HXNWWp7zVue4HtDxeYiCxAS8Trgnu++i2a9nyos1gAAAAAAAAAAAAAAAAAAAAAAAAGEfz7y88GztWdQTz2dQQnUEJ1BCdQQnUEJ6YpMpLBaxfzwAMcG6mVrNu7qJdPfOgWK4AGK71QlS5ss+37lhyJoQAAAOWq3PTBPR87tGZr2eWodx0MvtFqqAAAPk5+WvctHQvyMk7lHI65AAAAAAAAAAAAAAAAAcvTnxRNd7+ad+jLy89oy8R3PVYFS6JPviMXb7s06MvL1RrBM7ZIsi1UAYzrK9C7NeRtJ6B3e+XjPz9a2MAMFLnqvaM/Sls8vJdz5VrgfPbCgp31kd8AAMZEXVL7S6OhzSUbmrcvzVt2MMAAD5jJOpQTx4y9iQttCuV7O7RdogAAAAAAAAAAAAAAAAAAAAUbTu0424ttSt1itIjRzAAAAMQ0xTa9jkNmbr62ceLRLVC3amP9CeBjIo/xaYDN1NE1yWOWHkqNuqMcq7Um69cdQv54AAGK3ZIKCevDL2Lf3x0jsYeR3wAByUuahc3UG6va0zMN998Xxq262IHoAAAAAAAAAAAAAAAAAAACjad2nG3FuqNusVpEaOYAAABHVGUi8zVTEPbiBj7LWuelypsx3xZxpZYAAEdUbdUc7TXWlXXrjqF/PAAAxBTtbgnhT6zNi3d3x97GDkdeAY17IXjuvfBkbnTK5lrudShR0bHN0q6aeT9CxWAAAAAAAAAAAAAAAAAAAAo2ndpxtxbqjbrFaRGjmAAAY5+iAjkgcGRt9dyhZvTyNdJvVb57hfr5Z+petsFN6+H9DvgACOqNuqOdprrSrr1x1C/ngAAfNLsdTo30pGXGKbsyaeUAB802x1GjfZxJ1btk3mvh1GPtNWzNdbKnJ++WwaeSAAAAAAAAAAAAAAAAAAABRtO7Tjbi3VG3WK0iNHMAAA+KTYqvQ0H18y1a3ZNjOviY4+3Higu3iyN3pulCtlujJi9QAAjqjbqjnaa60q69cdLTDW6U+rG2OWxOLtmga81biTm5kpm6vTYvnOnkZEnAGGebxXYvOMjcWytXa1T+hez/ikXmu1bUHnDO1br1Vyxa+JkSRgAAAAAAAAAAAAAAAAAAUbTu0424t1Rt1itIjRzAAGHHyrnAZG46+Q6sysrFWzYrTz3dpK9lJRrrm/Obp18PI9AR1Rt1RztNdaVdeuKzu1uO5+P6tdmpW52H0UtHs4+2xyRRdhyvZ2RJwABivT9JrWtIzdX7sNbSw2ZWUkVlieBx2ENjbdqJZrlGZF/OAAAAAAAAAAAAAAAAAAAo2ndpxtxbqjbrFaRGjmAAYrNhpNS38G2hp6l13XKNEXoUVehRV65vFOZxTvzliot30crYLVUCOqNuqOdprrSrr1xsh57FylW82NFLB12+06GwuFDsnibF/PAAGCIrHdw5WuLZ51U16WK1FXoUVehRV3qMU3N2caGe+54O/Xw8jrwAAAAAAAAAAAAAAAAACjad2nG3FuqNusVpEaOYAPkhK7082Tsp2DussPSNHMAAAqkXbalmayy1rs56ubGdXHAjqjbqjnaa60q69cdQv54GK5Y4mGar9HOy9i+/UXJ7GFkdeAY4u2sRSxAydruuERL6mPkTwAAYhJzVx3RX38ZG5LWih3a/mbxbpgAAAAAAAAAAAAAAAAAUbT18mPuLdUbhYrd40MwDEZJ1+KWBGTtSdqj5DVxvoTQgAAfNMucNXsVsZmvb++DndfECSPgp9xp2fpLrSrr7z1C/ngOfox4oLr5Mfdk7XQrtezugW6YGmkW2oUNBu0z0Fme+zWxgAAAK1C3Om5upifgJTju1sZ1cgAAAAAAAAAAAAAAAAADhh7KilhZnLrjI75AfH2OXPS59xk68AAAAYyOV1OfcZOvAOCn3qu07sPdYaxe+ZFumABA1690yho88/AbK9i9tWzWxsj1jn6Hjm6PoB6AAAAxo6MeObd95A9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMZAAAAGOLtee0T4uFWzNWSstBsE8E/jGbtCGkq7tqW7KLdQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADHxseICLuKCzTPu4OeqdZuvMkWRNCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//EADAQAAEDAwIFBAICAQUBAAAAAAIBAwQAEBIFMxETFCAwFSE0UDFgIjKwBhYjNUGA/9oACAEBAAEFAv8ALFeoQqEhMa9QhV+bvSWGKLWYKK1PiPrcpsQSAxcEiEBGdEIrPajDjq1qsJ27kmOyvqEKvUIVNPsv9z0uPHr1qDmzNiyFus6Gi+oQqGbEMv0DT/hWb261PU1jr/yvmmkTlR6O9HXTdVVpbTfmaZ8Cf8KH8utVlLGjMMOyTkQpEWtEOUoVr3ygZddro5daGy60nZqeqE0Qg6+56ROxdYdYLTdVXjZ7eSLKJIcWUMr9AgutJD5zNg/pIeRhj+bzkKE3Dbp1pt4JkZYj+kSCfi1N+ZpnwJ/wofy61thXI8GYsN5FjzWREQGte+Vor7LKddDpt9l7smyOmjAJPuxIjcRqn2GpDchgoz2mSFkRKe3osyKMYZkUl/Qw/prKqkHT/m318U5n+n7TfmaZ8Cf8KH8ulRFTUNKJiokt2G5ElBLarXvlAy67XSS60Np1pL638LSf+wvriIkzQNmnt5IskkhxZIyv0DT/AIVg/pOZV+Iy4rLrLoPN1+K1OSkmVobWMepvzNM+BP8AhQ/l1x4UJA4OracDQ6M6QTK175Wgfjt1NlXocZ7p5DbguhSqgpPkdTJ0ZlWolPb0P4n6Dp/wrB/StV09WiizX4ipr/tK1SRKGFCcluAAthWrx+TKhaq5ECbqrksNJjE9JrXEk1B1FyFU3VTlt6KyRzK175USc9Dr1ybWlTXpidmqaesc4k9+HX+4PaXqUiWkCActxEQUp7eh/E/QPQYlMtCy1XoMSkTglpGjxnqXQHeLWhMioNg0NnmW3we0FOLWg+7LLbAUYC4L+hAqt6B7ssNRwqXprMw/QYlegxKhwWoXaqcUkaJGdr0F7ixobAKAiA2LQ4pE2CNN/wD0YTjYUstpKWaNddXW111JNGkktLSKi/rqqiU5MRKJ506FpwqSK8tdI9XSPV0btLHeGlRUshENNzFShcE0/WXZIhSq48QQ6FpsO9REqchotEJAtCZArMhHPtzliK9atddXXV11ddXXV11ddXXV11ddXXV11JNoDFwe9x8G6bfBzwyJNMsE7QNi2niMBcR5omltGfzTxm4LaBKbJfp5JKjXniEqOdzp4AqqqoqirZZh3SnsEZa5pIiInkMENHAVsqRVRWXOaHiec5h1GczD6ZwOYBCQL5orSj3zD4raGfe8WbkQeDXmkt8wLRTxc8Mo8W7Rjwc+nVEWsBrAawGsAp2KJJeOxzKRsErAawGsBrAe9V4IRKRWbPA++ISK26fLCM6rgKvCjmLTczivieDByk9lFeI+CSebl2Tzb+sc3LRdrxzD4B2RTyb7XQ5ZiZBRuGdQ0/jJ2bNbfhmp/K0deLPe6eDfZDPgX1jm5aLs+N883KAVMl9rRzwc7XmEdRYzyUEQ1VBQUk7NmdrwzfxaNsd8w/exgoLQriokhJ9W5uWi7PikHg3aGPE5IYu2ZPNvwSdqzO14Zv4tHTg13EqChFkVMhm5NG8M+I/Vublouz4pZ5OWjhg3LDiFoZ8C8EnaszteGav8qROKonBO6YfAbQwp0M27Mngf1bm5aLs+FwsBX3syHMcokyQhwKkXFRLIe+TtWZ2vC8eblRQyc73j5jlJ7q2GA1JDB20Y82/qnNy0XZ8Mw7ww4DaYH8rQz4j3ydqzO14JLmDdfmmG+WHdJPBu0UMnLSwybtFPFz6pzctF2fAvtThZnSJxURxSz4cxuzR8tzvk7VmdrvVUFHXFdKorPglHkdowYNW/8McDs0fMD6lzctF2fBLPFu0QeJ9kgMHbRjzb7pO1ZnaIxBDm11jlDNWm3gcsq8Eff5lmGM173D5YfmzQ5udk0fe0M/f6lzctF2fBIPNyzLvKLrG66xuusbrrG6cNXCtFPFzuk7VmdqSam4xHRxOna4OQ0r3RW5aYOvE7ZmL4Zh3EsS6wK6xuusbrrG6fe5q2AsCReKfUOblouz3vny2/I0fMDtk7VmdqSCg4w/yq6tqimNpTh8wqZYV2m2Ab8KrwQyzLxxDyD6hzctF2e+WfEvJDP37ZO1ZnaIRJChJXRHXRFXRiiUy5yj/Phlni35GD5bn1Dm5aLs9xkgiq5LQDmQtACYjWKVilYpWKViNOMgaL7WAsCFck7JO1Zna7XxxdqI5kPgkHm5ZlkQHFKxSsUrFKxSsUpWwJHW+WdmDzb+nc3LRdnumHwS0MPDLDFy0Q8g7JO1Zna7Zqfypo+Wfe+5y27Rwzc8EwOI2iHif07m5aLs9zp5uUnvTYYB4JIZt2YPBzsk7NmdrtljxatFPJvulnxO0QMQ8BJkhJitIvBWyzH6ZzctG2e2SeDdooZOeJ4OW5aO5m3eRs2Z2u1wcgtFPFztMsBVclpsczROCeGYHArQz9vpnxxdswnBrtmCt44YN+KW3kNoYqg3kbNmdrufHB2k9lbLMeyQik1aG343gzb4cLRBVXfpnWRdpYR03EEV7vzXJapG208vKbrktdsjZs1td0xv2tDPuVpta5LXlVsCrktUiIP6KqISFDPi3EXj3qnFHW1bKgLAhJCT9keaR0SFRWor3DsKVgYGJp+wPMi6htk2tMSeN5ipzIXHL9hUUJDhpRMOjSOOt1z3ioGHDVppGh/wAsR//EACwRAAEDAwMCBgIDAQEAAAAAAAEAAgMEERIQIDIUIRMxQEFRYSJCI1BxkKD/2gAIAQMBAT8B/wDC+I3HyC6aT4XSyfCMLx5j+vjpy7uewWcMfEXRrH+y6uRCsemVrTyTo2PCmpizuPL1bRc2QpI10sfwulj+F0sfwulj+F0sfwulj+FPTNDbt2U8HidyqiDw+42QRC3iPUsxfuhnMZ+kCCLhVUGJyG5lGMfy805uJsfRgoV3yF130m1rSe40e8MFyuuHwuu+lLVZjEDZCzBoCnZmy2ypFogAsDjkmRufxT43M7O20Un6KRuTSNtOzJ+lbH3z9PHxCreG6ljyeibd9KmPF+sU7XNs5VMrccGKi4qu9ttMf5BpJyOyjjs3JX72UzM2kenj4hVvDdSR4suqt9mWVM/Jiq48mZbaLgq7220w/kCKcbm+sbMnYoC3ZSzWm/zSqjxf6aPiFW8NsTMnAaVT8nqjfZ2KIUjMXFuyi4Ku9ttFH+6q5MW47KJn7qR+LSUVSvyYqqPJnpo+IVbw20Uf7qV+LS7QGxumOyF1Wx/vsouCrvZMjc/iulk+EQR2KiiLzZFzY2qSQvNzrZRsxbiq1/kzSkfZ9tJWYOt6WPiFW8NgFzYJjcRZOaHCxXRxro40BYWCkbk3FEW7a0XBV3su/gjwkzxgeydEJB+afMyL8WqSQvNzspI8nX0lga/zXRxplMxpuNK2Ptl6WPiFW8NlHHd2SJt3Rrvpdd9LrvpCt+RpVx2dfWi4Ku9kyRzeJXVSfKpJiXEOVZF+4200eLFNMIwuu+l130uu+lDUCQ2T25CyIsbH0kfEKt4bKdmLLKsfZuO2lkyYqlmTNaLgq721gdaQJwuLFObibawMzfbSpkyfsjfi7JA37qsjs7L0kXEKt4jWEAvAOk8mb77aWTF+koAeQNKLiVXe2oKa64uqxlnZa0QFiVO/Bl91HJdtlUgGM39IyZ7ewKe8u7u2XO+51pJWtBDlVytdYN2UcvbAqePNttl99/6gEg3CgqA//VVQfu3R0DfCzH9kyreF1LfPFS1Dn9v+qP8A/8QALBEAAQMDAwMEAgIDAQAAAAAAAgABEQMEEhAUICExMkBCUWETIkFQI1KQoP/aAAgBAgEBPwH/AML7mLd3W4D5W4D5TVQf+f6+pXZujLCqfl0TWo/ytsCe1BHau3ihqECpXDF0f1ZPDSnuTW4P5W4P5W4P5W4P5W4P5W4P5VG4LKC4V62HRlQrZ9+Fao8/jFUqLByq0WNk7Ozq3rZfq/Irp8uiEsmlvRu09E9p8Otn9orR2bpoAOTwy2b/ACtn9qnbYvL8Kp5FKpHiU8Ld5qdVm2WKOoI90BsXbjdh7kBYvPGueI6Wh+30593Vp5crg8R1tzyHWpRISkVQplORK78lad343Dfo+lPxbhcnJQo/lUzxKfTn3dWnlyuDyJWwSSrjiatjgo43fkrTu/G48H0FoaNTLEZT/Kp0ppaW5yMemPu6tPLjUPEZ0tggZV0EjOlMshnhd+StO78bs/arcMinhdn7UA5PCZlcBiStzxL0x93Vp5cbo+uKpjkTNo7S0Imh4Voft4XfkrTu6OoI91uQTOz9lUqsDJmcyVMGBobV3hGWTyrQPdpdBIzpSPIZ9Kfd1aeXB3hpRFLyhd2eWW6Nbo07z1QFi8pnnrrd+StO7rp+T/Ii/E7dUNRwf9UNI6n7OgpsDQ3C5OBjSnVIOy3Ro65E0Ppan1x9Kfd1aeXC6OGxTNPRbT7W0+1tPtPaP/D6WpyMa3fkrTu6KmJd1tgVzSZmkVa1Pa/GueRKlSc3W0+1tPtbT7VWg4dUJQ8oXlp9Ifd1aeXCseRSrUJKeNwGJKgeJa3fkrTu+tZpB0zw8oSlp1qniM6W4YjwqDkMJ1anLY+kPydWnlrWd2B40oBiPG4DIdKbu4s76XfkytO76uiaHhWp9Mdbt3lmVIMijlchBSqDuxtHpDoiXV0IMPbhDc4bW5pkTyytqbj1fhdU+uSpHiU6wo5Qob+odpaHVWi4K3re0tBqv+TB/wCyK2F1t3/2VOiwdf8Aqj//xAA6EAABAgMFBQYEBQQDAQAAAAABAAIDEBESITAxUSAyQXFyEyJQYYGRIzNgsQRCocHRUoKSsBRAYoD/2gAIAQEABj8C/wBsV81vug9hqDL5rffYrGeGqgJPnRWYcQV9tgtdEaCFbYagoveaAINbEaSZ2Yj79BeqW7J0dOzFeGnzXzW+6+a33R7FwdTTa+M8BWammtFSE8E7FDFavmt90GtiNJP0DC6RNvKXYQN/idFxe4+pVbFPVUjNLV2P4k1ZwOk43WVC5KL0lQetv3l3DRz7guzhCpXxW3a8EQ75QyJkzo/dfCYXU0FV8l/+JUXtWFtaZimyfw/4fMbzlRgL3OVqx6VVmK0tK7D8UeTj+839RVRCeQf/ACVCc6E8AOHA/QMIFw3dVvj3k3knxj+ULVziqC93EysRRaCME+nJUfmy6UbrKhclF6SoPW37yEVucM/oV2lKg3EL+tjkGsFAJM6P3UTtXhtaZr5zPdHsnB1NNh8XiMuaDBvPK7NnqdZGHFFQnQXflTXO3m90yf1FQmuitBDBx8kGtitJPn9CN5J1OJFVC6tiE7jQqN/b+8o3WVC5KL0lQetv3lQoxoF8PTRW4fqNV2rPUaGTOj918JhdyFV8p/8AiVF7RpbWmYpsf3BQ/X7bApxYP3UTqk/qKq2E8g+RUJzoTwA4cD9AwukTbyUSEMyLvRNijNpqhFh5OmXN3W90J0U/nP2lG6yoXJRekqD1t+8r1aYQ4HRf8mAKD8wQhjJ9xkzo/dRfTaeBmO97Jkb+koRGGoMrTrgE6IMshyVs5vNfST+oqD0N+30FC6RNvKR/EwR3DmNFWGbtDku9Cv5qxuN0CAA7nEoMZkLpGIN2Jf68V2RbbbwXZBthqbEp3WX1k1wJ7LQa+apvNPBdk1tlvHihE4Q5M6P3R7Kne1X5fZRDGp3aZbJjQx8N36L4Zq3Qq+FfzVg91ugV90MZlWRkJP6ioPQ37fQO8/3H8JsJuTRSW8/3H8Kk7TPhnyy9l3Ygoqxnl/6KxDFAJ9nFFQqwH08iqx4no1CHCFAJFjxUFV/Dvs+RXxon+K7OEKCQiRC4ECly3n+4/hbz/cfwndkSbWuzQqsImGfcK6I2irGcX/oEGMFAJlxc+/l/CbDbk0U9v/o3vFaq5q3f1W6t39Ve1Zqo+nalUZeryrgtFwXBcFkr5d00VIl6q36ao28rVfEK7o26OC+HcqOlVqobj4vRt63VurdW6t1bq3VurdW6t1bq3Ve1Wm4FDmrsGxD91XgqNw6OXlOy7exKuVMvCDT/AKFnXbLlUqoQdt2W5lU4KgxbLlZMqhVw6yocx4OWqjse27bDJmGdslV1x6jMToeOFTWfPwi9ZLJZLJVZcdirslcAslksllt1KtGYdgU0Rcr8wqldwKjxhlsqoHBpwGwHeGu5zGJY12bOm0WqrTRd41RKM28sIOm3ALtmxr4a7nMYhMg0cVSXkdrzWS79wVAjNvLCbNuAGaToZVVR4Y7nMYZ85l2iPnfMHBM28sJs27dSrUg1B/pOxp4Y7nMYdnSY81b0nY1wTNvLCDZUVNuxrMxEWzDvDHc5jCLlWQEqItPCVQrQ44Bm3lhF0rWmATKiDZc58vC3c5jCDJ29Zh+s7GmAZt5YN2ZnTb5ztaTrpOmvhbucxhF2sqDiqCZEw7AM28sCpVqXaO9MCzpPnfsFukw7wp3OYwaaztabJHrO/MbZm3kquXcCyC7wV0qlUGUrTt3ALlWQbsh07HhTucxg8p1WRWRWRWRRcZ012zNvJU0Vpy3VWH7LzC7+a8pWontgiHMOHBXgrIrIrIryEw5VHhLucxgE4odtGbeSrwKobxK69WspeSuzwaouxLOnhLucxgWBwxSw7Rm3kqOXdNFmFe5amVeGFZ1xR5+Eu5zG2XFV1kG6qgCyWSyWSyWWwHDgq7Jm3ltGVg8ME6Cd4vWSyWSyWSyVCFZmD4Q7nMbYZrMvwbWs7J4bJm3ltB0g7AJnywbek7OvhDucxtl0qBBuDymDsmbeW1XSdNNuxpO1rg2SrMqhB3g7ucxtc510wyJjYdNvLaInTXaLlUyDVTCt6zMPwd0xtB3Cd+Zw7Y4TLtdh028tsiVUHbJAn2hwyFQyrwHg96uKq41wN0K5oxd0LdGy6beW32kyzavaFujFqQCt0Kg+haFd1ViYFCrJkHDgqj6lpxVDLszx2CxwVW/UPmqOlYie87kdPqKhXcKyVxIVLSyVP9sT/8QALRAAAQIDBgUFAQEBAQAAAAAAAQARECExMEFRYXGhIIGRsfBQwdHh8WCwQID/2gAIAQEAAT8h/wBYsw0ATgi+JgQDihiH0Aa9KoPFzcJh1Yp/IUgC5Hq3AVODEE0IQKFTEUQ0ATkm5EygwANSYmIrbglt7o2AcXDb03TgzEBsrBwCaUTGz4pzs/FWhwqegmiAAOWM3zssmcUPQ8BUMIkZwMUODAA1P8AangNsHaHk/O6FPz8iLWmXEHQKemj0OhQIeSRe/JAghxDyOK3juYW81gg1nlIqBeR5esUs0CaS0UmTdg6AW+dAcBiIbR3J+xM8zovNPZA5zNedXHhMW0rAyGae0J8STiUDynIdamwv0QgPwc8+Be8fIYoJGBwQwR0RGgZJEAH0/gDUoSGQEiC/BQ2xX2Iedw5lXnvxKE2y8/6gVCluKmWATLEqIRMSec3i6HkcVvHcwt5rBALhLg7nsmMYtFkpJYGY8oUNIEwAuhtHcrpbHM9V+ZWcvOduBiWYZ2KQU+BhzKBgzOuUH0AK3jMKtwVcRcVPQ5g1/SHkMULtCQQkQCJyhgADk/wBqeDbEOqQNDuti4BWMwCcgZd1XCeRxW8dzC3msECIDgyIKNi3xvfVOjcGrQELybidCG0dyepHV5nReWeymh5rzq48BGQZi8/PwGEGcHOYLau0PIYoEEBwQ0R0RKAZJEBPT+ANTwG2xXyIzGYDmyo8roRXHE4gSAcyZHRcbova/qjDDUdPs8PI4reO5Rs6rzWCBAHJgsfAicFVtMANA94VNxINA4htHct57uKg+sGNSOBxDpfsmpTcHWB+QTBJoEH4/SaC3soQ8hivNYP4E1PAbbIX9pFfx0KntHWs+0dk28zR2R5KWt5qU2wA5YHyhrMMAMhA4Q0j4c+aaSqg7Ec010UgkO5LZqv1uuOKCAEwQxoDuZIkQF+MtPEYKerTmcW5ICKRJOoIENo7kCG6Ox6LI8tVVQGMar8LnIzyvm45YIsQ4VpcsEPYUvZSU1cbUoTIkh8bIZoZCwGEPOYrzWD+CcETJZHrKLgQxuDQIBDFHy6fw+jIUwXiIIPum8C4AN519kIiUwESYM9x9kQTFcF9x8JsHAeYK8z8RGuBQCYgoqaMN56/RRppL0Co1PwhO9/ODHMB4Eq3gxcOAQSK7waaAY8ICAcG5EDlB2PtEU4xEF+ik6JkG6lTugoAmAEXsoiTO8j8RCF6sDf+jZIEZKkPoCCrHVO8vhPu3/Sd5fCOrDSaw/qgrjjL+dCusM1InUaKumgkqhlXYNRXkK8hXiKrD9JogwNA65NCkRqFU9lx/NfW2FeYsEevICGSffjGMCM1MidgaJkzGDzmK/Z31duOu5eQ/Sd+/pO/f0nfv6Tv39J37+k79/Sd+/pO/f0nfv6Tv39J37+k79/Sm3GqqgFgWcfAFKzngbEhLmvwRB0r5+E1BrNuyZZmVDAEguEB7k3tHusqnux9II2j/gwWDtx5GURFOJQzXCCJv4yfTARsEmVQQBak4HBRfAAisRRBBfv1siWDlENdu0gd8eSfRxEL02JjbnCJjQDjZW6ZjugceG7sOSzidvroiODUvOyd70sWkGknpFEOsn0WT6LJ9FleiYx2CiCCxiAzT7oO3RLJ9Fk+iyfRANA4xmoCaMqhMSCbkCCHHCaQxnIrEQCWqYGEQBuAnRErEoAmj3izwKeUCIAuQRN4exfQNxwYuUOvpu+94g3OtGIPyOGfKy8uImCmWiNTxM4MxHBd5lyRtFIkxwWTOODRMUdOlgO+LtUS5fgdDOIa+m773tyxtKDlC8KICRK6Da+AU/CJTYKIxf0X35IXGwHBdist8Y953sHRcxjkMB6wKEagugOkQ/pm+97YvoVkEcEQ7p7XRH5rfafYrLfGLOxD9Z8ZTTE0YxXl4YHO504GOh1o09M33vbGQKe+M1VmPNNQV7Yu5UnGtp9istFB4EFiLIQAu42cK1aRbBL5BZliOBlDohP0vfe9qQnLgiJEqmGEomdIBKdDJGqAmgcNYF0IVAHs/sVjRYHOwhPFO/jKbGlBACAKlAG3CD4RSeLa9ZD6Xvve1NN1MXA6yDSLINJDF8PMLP7FYyIrgQAJMJkpnv1OvG7tWQRnikci1n5Rn+kvP0vfe9oSAOaBZsoGFWJkIdIBosDWo1jhhfopGdl9isD2WAjkqXDKHtz3sJep3xbHrOiQCwrPFAEguLkEBeJ6+lb73tDJNZeURnO534WIoZOcThyBsvsSeAwVw5mYZifRVbPC+AKAAjnTHeB6SG9gIjcESSJVMM0ihIMOAIvZlGePUelb73tC/tSQRJIODIheYPleYPleYPlFqSLwqM2UlsvsSKSpKE8OT0xVExNCRjiRDIyQFgsL0enLCgCZBHLeLNAASFhTNTE1Ykg3IFeYPleYPmGMzBqEShbihCpH0nfe9mcUaDW0BILiqBig3sfsSOc6EWSc6hZp6IBKSRymBohMwQAqVOwfEbEBCuRzt9pPNe30nfe9mW8mbW1bJVmLH7EmVOEaX0xgQekMnWZYVJFHBeSKBAOLGSa9tq+rpD6TvveyNBABHKdSeBwt5NRLKLJLJLJLJLKIrDAG4oCRBqIEvAQQDeHsPsUWi1bjPrDECnSxl7AER0gJ1JWSWSWSWSWSWWRgAQU93KjSOPAkfSN972RbWsx0jOLoLGSad8Xyt22H2LiZxQbpDCS/RCY42BrQRb3pMbFkATq0i+nTv9I33vYkymVhRdpACQqFCwQWLu1ZhGfkjI2F2Li1oeLGVZeNuClWsZrr22IS0CGRSlcWgYdYTQQl49H33vY18ArKIzrSfnZ4Y1EXIaiR4NhHYuLO8RnGnFAUuCOSsZwKJvKAAKCyZBpIdYzRdMejnEN5frE4Zq3Ee1RKLcMQbNpqVaRNKhS5cG0jsXHgk7jnAiAKhBCXjhrmV6RqaAs8ebtUSKgRBicw+jg7pFCgDLIzkgh8F13GQAYzC/DCKuIcQLUnLnohfhhacGwjtXG4IVEjpGUU0mOIg5B0X4YQDUtDDszC/DCHMgDL+FOZ4KCmgjNBiQMLhYDNSMkR0LjlAl6iE54P9LhkoUTDmIPbmjXgCUQxqnXOP6GapBQpvGhgIARjdESF4CaJng/omguFXNZFVYzpNSvID9ojPKeCqYBeSmwmTU/0rJv9SP8A/9oADAMBAAIAAwAAABDzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzDzzjTzzDzjDzDzzjTzzDTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTxBCzzzzzSCjhTxByRzxzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzwQgBihzzzxSChRTxjzRyzTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzCxTjgwiQzzyixTwywTyTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzR3k9crTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzyz6XXUWmObzzzzzzzzzzzzzzzzzzzzzzzzzwrDHHHHHHPTziPXTyg5LzzzyjIJ/TzzzyFDzzzzzzzzzzzzzzzzzxkgAgsUsBBzwSFXTywCMvDzzzwBQDzzy4MbTzzzzzzzzzzzzzzzzzzzwisIzzzzx8QqXzi1SMfzzzysPzzyhoIAvzzzzzzzzzzzzzzzzzzzyisLzzzyikcOVTxzwNfzzzy4D7zzCBotTzzzzzzzzzzzzzzzzzzzyisLzzzziJGhCTzzwNfzzzhMLTyiJR+hBTzzzzzzzzzzzzzzzzzzyisLzzzgMdqeAXzzwNfvJoiG7zzcBjxcODzzzzzzzzzzzzzzzzzzyisLzzxsMDHIMSXzwNfcvrs/zzzAOHMMNDzzzzzzzzzzzzzzzzzzyisLzzysUg44spvzwNfCrhdTzzSMo444BHrzzzzzzzzzzzzzzzzzyisLzzwJlzzywhbzwpfzy5KXzxUOlzzyABjzzzzzzzzzzzzzzzzzyigTzzwdzzzzz0NjyNfzwcG3zxsXTzzywZNzzzzzzzzzzzzzzzzzyjTfzxhLzzzzzwJTw1LzyiQcbh9HzzzzzdnzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxwzzzwQsTzLzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzyIygHzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz/xAApEQEAAgEDAwQCAQUAAAAAAAABABExICFBEHHwQFFhoVCR8ZCgwdHh/9oACAEDAQE/EP7F/NzBd58STPsdvxx18MS57x2ATtfqDd6YxQqXpL+Zz16spnmGKS54meJniZ4meJniY4200GnCSwYHQd4iP77Htq94eyGtwZ7Ev1qfZbo65j0aCJNrl7yn85UKoNxzjjwfeU/nH2RfUL2Omt5y0PgBUERwRyhEKK0o2u5BZ5iU1orrwb9KAOdvT/QJg76qBcG8AKxBEuWVYd+p5S+bn+Gpl7zDTY6Bqv3dG5ssSBZYMVKafTfQJg76twZZt3LKn3NptDJpyd5hpowVFssFz1QhzAAJWJjZ/vpvBh9N9AmDvqdCiiXgYNpu7DARGMxxoyd5hp5F2INLLoyrtCZ4iVVlNeTaWCZN/TfQJg76aBXO0+LIqtsYhxCE8zYB2dGTvMJwyIFw7RTK2xzN57BEPWEoEIhxNkO/T46xL2Ze+l/QJg76HLkgieIgPZne/c737hhgIbLmIldcneYS35HlzcgwjSmD1bnEtjo3Hg6Lid53v3K1b9LAePS/QJg76LJcQgrBAvafG543DWtiDe5Nr4euTvMJ4Ui//BEyuWH7tNVeXeGFLWeNzxueNxxWmAr5jtxek+gTB30Uyzmbey6agcm0tgyb9cneYdd0gtzRlfHWk4dLqsG2hCHEAAlQefSIWPYjKvnrjZly4GDbTsTh26Y0en3Jh10IkIzzKw89ffGWnLVufJPbB6Q3Ci9l6H3tfzdVSqKoutAPIMSx5xEaegphinLqFNyKdl/EGk3IHTtC2h36VG0/kRrcgdLfeLNjfnxAbbHt/VR//8QAJhEBAAIBBAICAgIDAAAAAAAAAQARMRAgIUFAcVGhUGGR8ZCgwf/aAAgBAgEBPxD/AEX8YRHRsZA3j8crXbMlUgslnuiPmcsriVDOpHy7ZdRDY1v222QOYdi0yRAmRsd2WBcZ3XDuIBzKnabiUPEIe7wwCpy9Et/WWRXoCkQW/rCvr1WuZZTV9NWAjlzEB2YLbg9vbShiCYNl7Lmsulovx/tTL63cSZYCtESuJQ3k1aA1+p/1+YfW6WaX0DZxTBBIiVUjZZ432pl9buJME5NwS8Pmc+w7cPrdFUgtolB8NTRxK2l4dunNsnjfamX1tupW5ybLKA9QUbIIbOH1ullGc4wbMJ9xxMAKJY1h5lSOHxvtTL623A9aIhRRCRdx3fU5F+9mH1pMrgvcMtXLg5n78wTrALY6vuWK/WnoMH4lF4r7Uy+thouozvuCsk9c9cRKiCeoABrh9aQQ44xERX4jtvHzKo7OC5dBEn1zphpUl34v2pl9bKkdxECDrmLxeBFwSuJyXJrh9aTEYfDA4VKX+Lbc1giIOJeLxeBOVkQj1BId+J9qZfWyz6TkvW25TDKFcOuH1slcjgOoRHvW77aUN5dgo4EaZcrrxCgPzA2f1qoaKMcu3nTJpnI0+hsgsRlsupcl1r8YSq3OO4fFwJ0cw6jWz9W/9Wpg7l8NXsQpwyqgbLNEOSAMG5DkgWD8QbYI5ZyQw/i0vuQ/IpfDObOJSUKotTl/yo//xAAtEAEAAQIEBAYDAQEBAQEAAAABEQAhEDFBUWFxgbEgMJGh0fBQwfFg4UCwgP/aAAgBAQABPxD/AOsUjZ9JR0FLSByRw/jKMvISJqOK2DEySrTYSuEF6zTJjc09gNFXtBocAp6eB8NjoohHiNHpOXyjKzSUFLQAzVoAdjqogDiuMQBszAaMEHmKlGeyI3jdfpQAJI5JhEVFBMknlJX85X85QKGjxgiecPhmj8nTNlLZSatqzsqGLzGPSqJJ0w5eNhFz28DwbQTIlkr+cos/jqpYDn/gPfNfWbY/Z7MEjFgqSFJAMpEN7BzsIIanVQ6rBTIRK2qNoU96u4RZyImCzEkw2qGwF2dALN7eWQBJEkTXD7vfh6+22x/Z87yghOutYnRDR+dkrgSAquhNHLPg0kJsZNmztV7Lh0Sb+6aDk5mJktnw1gymDE4PkBegwJxAmJ8E0HMCC6k9FN3RtnNTKUUS4yo8bq81pJEQbvYzHvWs+wMA3WScRp7LYUoWozHRZa2ynD73dRrwPiCREgiZNCLyeAyqwA/wHvmjPNoCMak19s/eH3exTMgCDrk6gHWpkJ1NBXu2utDEHlwvODYaHXDO+j6EiXHZLlIKwX8Qsi+jFpGpUCedBN+4MdMPu9+Hr7bbH8rFwE5UOA0RcCaJ7Sgs5lbmk204jGZUk3vDFweSNCEUPADQMTJxILPYuia+ofuiEJG3uTExlMPguCRVWfUIWU2KWeJKua5vrUyaJQ5l4GhocZcBSpBAldTRP7TCzFCJJcJ3KRGSo6oxcrKiXedMPvd1DYv6QCJNkaHo56RYAnN/wHvnwfd7FDlNnsvkBRE37uLQFhv8Ejor1pMGkYH3e/D19ttj+FMdAkRzEdGnCDbSlrvJznMM8pRmRbOs2TRzOSlS6sZyUAWWpezqbZYmZvYuoGUwYwIE72hgJxAmJ8BWEjI2z/dEZTwE4iUhmvHdgDkYlfe7qM4BaQSIkETJoHyTwDKrAD/Ae+a+s2x+72KWFtQi6LxAkCdJoLMiOsrl98qg+TvE5jsjZ44OHAJVsAUFoiQgJXZdMJFg51KMQKG9vkksnHD7vfh6JKgg9SDH80IF1WAoXPYCaZuSNMSBYiRBzmBDed6RFv4tebmQnXwmeg8E2aAHNGTMkwbxU2jGBmuw6pKFgebUElm47jcwOWCmAGarYKXqZmeaIw3JuxbPKjK2xMii6jvCkZiOH3u7B9H+A9819Ztj93sYTlWhczOG5fg7EUt3AzkXibWZl6ORaic5C09atxOM+eJeOBA6zTZNrwQoOqMjjLaoIlloEFNZ0NgWLAZt14NFRklbh3MIMk3uUoIYtXAwCJvEaFKRp426mkvMNpyvRUmLIZI2arXWGYzvJ+cqA3F5Otr65FRXNBbykJhAJNr8YtQJuxaSXWV6YmRVYlO1IiE3r+zoFBSzt1MrseBBzp40og3XqHNxjaSKLG/aa6lvGeswUwSeF2GXKb71MVaLLRuXeUxlaQohpoaANfVZcM9hi1ABoBAYfY7v8F+UVbtMABFYo3QBPTHXOIhCc4CMEQCJCNxKnFJZItUzUcYlmrShZY5hA9aY2U4sTmTpEPVRG1gcBr7ueN1CkGTESsxJblS71Mmb3vT1NBDirKiLXrXzutrew9hWDNd1zV1XBwyhpEacKgRC3XgohGQpOt7RRg3XvAynqowwKguqzVbrYu4D+mQUFulTLvjLlivk7YviPCAYgIokR0SkjOLHm3oy8AcKcE5sFDfMTwmgyWQbLYCl+DlUPBTQAbGIOo0RSpYo7yWxUALAEwXsf/ifnhNThJ/oXJfxXvwzqXmx1PWKIJrWQdpwI6YYRAr3xHdFMxd4U98qCibJUj1MD/NSRlT8BZqgpJkuR6M32py2Hgvaoe7axB6tql5ibF/Sa+1fFfavivoXxRiqBiWS6DPtUqS2SMJnDiio6A5XUZPtUTrbZnMzKmT/ADDTLbLJqG7vUJVdwZHTIpgQJ+60WAO7ddW9W8T9C0E0A7QZV1zPemCz0dTcwAPL06lZfCZacR8fllDOlDUN5R0WZqTM1cFVwVXBVcFVwVXBVcFVwVXBVcFVwVXBVIki1JJ7FFEkz3HZPG1P9zBOe1IrgkoQxub0eJpsXpk4BgteHyo1ZniO/wD1UB41dXm6+XfCMxyR4Nd0w+HPAE6IyJvQiwLLoP2a1o28u1IbAXV2ChEkyJgetZ5VaPwyPwsS4LD/AOCEM8JxEj3o8R2uRm3bFOzLleLTrQ8jVmEMxs6nR8TRBoO6fSXSibtdeG3NowICALBR5abVDQHpxONXw4uJqOThOUYriUFbZTsPs1PkgyQF1akuwYPBl64TpXQ5po0fhtMLZ2TL3pCsN8k3NzzrtinrISC8ObR4iX29c5eh3xzwW/6niaucISF7WHrQlKULwBiPZo86QKZoLyantiZJH/I+PJShJdPy1fTvjK+L/aXL3oLfhZwBAibk1t+ir+ar+ar+CpkA7kW4CfukQQjCccZshQAtLU3gqGUclfzVfzVfzVJCNLiBRY8M030CrkUz0qfg6GN7Wdzcc6JtIkj4czAQckeSzPvFQPGoarL3posrJ3HJeNNUAJV0CjEEZS34xasqkGlPEcijLyZG1QIQJcjcwzUUJzKZKQg8yfImaCQrPnr726eApLJ0Fn5/GJX0u7Eoeqn18uK1QK/qd48MT+3aPio8DeoRWk5mXtUjGRJrzNagALgbE9KKRAhb3T3pIOoHqmLKKqK5tjyUqMBup0sz+8WBlB6Eh7FcfFNTosI41lSIrqy+ALdGDSGft2/GNfS7se47+WtS0kvT+TfDNAg5Gr0KzSEj0waej3LJ9fajwGmAu8tzZpcEExKEfeaKMQbkijhEhRIjQBXadzH6PY8r6DYx+5xU+M8t+rcj0xIZ6R3h8yYI/Ah0pjpEHnWf4pr6Xdj3HfymkcxeizL/AMxdwyA8f+Khg0XXP3wmGS1ZXoRzFvfPwx4O274/R7HktZD6QYo4z3fsmtfEq0Gp5VmatycME+IBdoAA1U+5+8Sa3JHF8Peht+Ka+l3Y9x38uOyGOsF/WLGMetbuRTmZS/Nn6MY6BzkD5O1Hkdt3x+j2PJalI5iObB2wI+YCONWHgAdKz8M1LG7PAPlxgX+mZtbwWOZc96RGGyYS4pKxuz+aQBNfxTX0u7HuO/k7Vk3zc3Q9aUmUVXdwdIlr+z7FRVy8VdazqhzRr1wbOBDpWRIB18jtu+P0ex5KF1RAz6AW/wC4Wpkp6svGgJa0nXolp654CnKAHFq8RELu6vXCI0WvNz9++IDU+3Ze34pr6Xdj3HfydailZ2u2MbSWTWGfv2oaaYjY5CZep2x1CroOfv3rfx9t3x+j2PJnomWNw1emBA1EAXVaBvPd3VR4gSo9+zehjtazzWx84ipSvyfPTEQeC+D4o/EtfS7se47+SpeAVXYpEtwnbI9sMnwDm0N0CEcMIqF0x6K565UiMNkwa5wYG6s/NEEMnx9t3x+j2KmlMJqaYirU6EKVakIMjafLfCRA5h9cqPHyXuaz9MsEm1I35xkemLopEh5UzU5BO2ntgDeFSPEpL59AMz1/EtfS7se47+SE0jwjZn8dceGRc7O00YtDYHpmb3nEUU3beMn08fbd8fq9ikZi31djdqBeHLHsfNP/ACH5o1iE5uIOTM+tWeOMrt/10wTIAVXICkrqurNXhsYFCbgH7tQBYyPGIE3gyl0KcmUVeLhJeV6di77FAAIMsYtRVyF9LnfGBfP19T7x/EtfS7se47+Q5VMVPKrZ++MfwXJcK/k0fyaP4NEsoYsIH7rVI2NgyMY/Kpc9H7vhHh7bvj9XsVbEdLlm9X2qZQMAWszl2rbSI1n1zpCYLiSPJbnWk8jOSJSACnBD17HH2qFqLI93dpABVyCkBQTJv+tPWgAIDI8c1Op+9jv7Y6uQOPDrTC64iE9ZK/k0fyaJM/RPmmNpI5q6uN5iJjc19qXiREeD+Ia+l3Y9x38Y1CDDOq+M/MBOgZEzEox53OTP38Xbd8fq9ioRXJuOp6+1Cr1TbM4UR/sVJIMwRBPFf0NKjECODfdwSXtCXZibFZ5ghvPTao8hwIAr0q3TOQ2ND08wVe9Y4svj8Q19Lux7jv4+FHLAZGkv+d/NSygjd9aPD23fH6vYp0FtGmypaEnrn3r+U1lA1QK0TucQsAOiB+2kU5hZrPxZeG/Mow8iSJR5G5PHIZ/GGXlzi3um69Go/DtfS7se47+NC4UtX50LrhYYsTsavQomcGakq7q1/Ar+YV/MK/mFfzCj/gU7YuyXHTmcKEuEROJhn9SczU6lqS2QhyfD23fH6PYweeCCuDUa5sfd3nB1eb0s1fD+qPHNKpT7Fm9XAFYLrQuikgouhwK/mFfzCv5hX8wr+YV/EKKOF7fYpLnqXVZYm5++Pkv+Ha+l3Y9x38cg7nQZer2rPA3Rv1L+vJWJtTyGfziyJVtO7L0v4e274/R7HijSL3064LLIGI6rOkAnia1gTqOvTOueABP67I6tRPjazvmFxf8AcRRwFuTL1KPwzX0u7HuO/iQFIC81emUxyssB4lAA1WgXGUxvr7+TZL7ydTFVIPfyh/7R4CsOkd8fo9jxWBmNnp+8Z0Te8jL28VoqaNmeJfBju7zyGXzUz45q94pdSidhZdMLMig5lZB5MbOp0/DNfa7se67+I3QWrg5vpjGjJepl89KCfJioUunoN46ZYo7nnkmvUqMfvccfo9jxRySuHPT3xecsQ8y5+/FlRs0l8up4uEsGUpoavpQIwABwPJimK2JuDL1O2JuY+ibJ696n8K1JRDl3LvaYxJdFKHiyeKISgrgt564ArBdaU5Fi2XI6FDPkzSA5WIbvhxtAkB1S+/t4PocTH6PY8JemoRIXRXYKjCCJolZDxPJ1PCZM2Q5hcWE+f/V/XlwSTGeVlTcFEI2RwAEwOxcy/DNHYOScz5K5kIFel6tJogIl+6yI8LTgxCEbjX2L9UJIsgidY8xJs5UsSW6s3an6F2oAIEHgP0b4/d7HiaAr3c29F98Z5dk3Q19/Ck0lZM1KvtX0L9UAgQeZpViQX3r6F+qhLWgg9vw4H/uPKGicGmG2cj2qUApzp55WoAPGHEio4NXeM29owzcJOZqdSl+hyOM/+CP8RGB44G9InBc2n4daRsZw4XNvX7LTrpRdxEGRQZY0YgzL51A03s7P+f4tc6EcOS/J3KtHzkXE4OBgAsjZ4LvxoRBGRrSg5CUi8bFQbNldpm37/wBDFPjPmJTBnXK+eufelWAJvYjpUeBSwW6AipwGSAC8kBqykHRxu3u1N/Nbz8f6MpmmWlAMijLOtM//AKkP/9k="
                    height="250px"
                    width="250px"
                    alt="House Of Tara"
                  />
                </div>
                <h4
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: "2mm",
                    fontFamily: "Arial",
                    fontWeight: 600,
                    fontSize: 18,
                    marginTop: "-70px",
                  }}
                >
                  international
                </h4>
                <h4
                  style={{
                    textTransform: "uppercase",
                    fontFamily: "Arial",
                    fontWeight: 700,
                    marginTop: "-25px",
                  }}
                >
                  House of tara intl limited lekki
                </h4>
                <h6
                  style={{
                    fontFamily: "Arial",
                    marginTop: "-20px",
                    textAlign: "center",
                    width: "70%",
                  }}
                >
                  13A Road 12, Onikepo Akande Street Off Admiralty Road, Lekki Phase 1, Lagos
                </h6>
                <div
                  style={{
                    marginTop: "-25px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "flex-start",
                    marginLeft: 50,
                  }}
                >
                  <p
                    style={{
                      textTransform: "capitalize",
                      fontFamily: "Arial",
                      fontWeight: 800,
                      fontSize: 13,
                    }}
                  >
                    Bill To:
                  </p>
                  <p
                    style={{
                      textTransform: "uppercase",
                      fontFamily: "Arial",
                      fontWeight: 500,
                      fontSize: 13,
                    }}
                  >
                    &nbsp;STUDIO
                  </p>
                </div>
                <p
                  style={{
                    textTransform: "capitalize",
                    fontFamily: "Arial",
                    fontWeight: 500,
                    fontSize: 13,
                    marginLeft: 100,
                    alignSelf: "flex-start",
                    marginTop: "-12px",
                  }}
                >
                  Mr Thomas
                </p>
                <p
                  style={{
                    textTransform: "uppercase",
                    fontFamily: "Arial",
                    fontWeight: 500,
                    fontSize: 13,
                    marginLeft: 100,
                    alignSelf: "flex-start",
                    marginTop: "-10px",
                  }}
                >
                  Lekki
                  <br />
                  Lagos
                </p>
                <p
                  style={{
                    fontFamily: "Arial",
                    fontWeight: "bold",
                    fontSize: 13,
                    marginLeft: 20,
                    alignSelf: "flex-start",
                    marginTop: "-10px",
                  }}
                >
                  Cashier: sandra
                </p>
                <table style={{ fontFamily: "Arial", fontSize: "small", textAlign: "left" }}>
                  <tbody>
                    <tr>
                      <th>Item Name</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Ext Price</th>
                    </tr>
                    <tr>
                      <td style={{ borderBottom: "1px solid #0f0f0f" }}>
                        Make up for making the face up
                      </td>
                      <td style={{ borderBottom: "1px solid #0f0f0f" }}>10</td>
                      <td style={{ textAlign: "end", borderBottom: "1px solid #0f0f0f" }}>
                        N12,000.00
                      </td>
                      <td style={{ textAlign: "end", borderBottom: "1px solid #0f0f0f" }}>
                        N120,000.00
                      </td>
                    </tr>
                    <tr>
                      <td />
                      <td>Discount</td>
                      <td>N2,000.00</td>
                      <td />
                    </tr>
                    <tr>
                      <td style={{ textAlign: "end", borderBottom: "1px solid #0f0f0f" }} />
                      <td style={{ textAlign: "end", borderBottom: "1px solid #0f0f0f" }} />
                      <td style={{ textAlign: "end", borderBottom: "1px solid #0f0f0f" }}>
                        Subtotal:
                      </td>
                      <td style={{ textAlign: "end", borderBottom: "1px solid #0f0f0f" }}>
                        ₦$6000.00
                      </td>
                    </tr>
                    <tr>
                      <td>Local Sales Tax</td>
                      <td />
                      <td style={{ textAlign: "end" }}>Tax:</td>
                      <td style={{ textAlign: "end" }}>₦$1000.00</td>
                    </tr>
                    <tr>
                      <td />
                      <td />
                      <td style={{ textAlign: "end" }}>Discounts:</td>
                      <td style={{ textAlign: "end", borderBottom: "1px solid #0f0f0f" }}>
                        ₦$1000.00
                      </td>
                    </tr>
                    <tr>
                      <td />
                      <td />
                      <td style={{ textAlign: "end", fontSize: 12, fontWeight: "bold" }}>
                        RECEIPT TOTAL:
                      </td>
                      <td
                        style={{
                          textAlign: "end",
                          borderBottom: "1px solid #0f0f0f",
                          fontWeight: "bold",
                        }}
                      >
                        ₦$5000.00
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p
                  style={{
                    fontFamily: "Arial",
                    fontWeight: 500,
                    fontSize: 12,
                    marginLeft: 50,
                    alignSelf: "flex-start",
                    marginTop: 20,
                  }}
                >
                  Check: ₦$6000.00 14/11/22
                </p>
                <p
                  style={{
                    fontFamily: "Arial",
                    fontWeight: 500,
                    fontSize: 12,
                    marginLeft: 90,
                    alignSelf: "flex-start",
                    marginTop: 0,
                  }}
                >
                  Total Sales Discount: ₦$6000.00
                </p>
                <p
                  style={{
                    fontFamily: "Arial",
                    fontWeight: 500,
                    fontSize: 12,
                    marginTop: 0,
                  }}
                >
                  Charges inclusive of 7.5% VAT
                </p>
                <p
                  style={{
                    fontFamily: "Arial",
                    fontWeight: 500,
                    textAlign: "center",
                    fontSize: 12,
                    margin: 10,
                    alignSelf: "flex-start",
                    marginTop: 0,
                  }}
                >
                  Thank you for shopping with us, Products purchased in good condition are not
                  returnable.
                </p>
                <p
                  style={{
                    fontFamily: "Arial",
                    fontWeight: 500,
                    fontSize: 12,
                    marginTop: 0,
                  }}
                >
                  Have a great day !!!
                </p>
                <svg style={{ width: "50%" }} id="barcode" />
                <p
                  style={{
                    fontFamily: "Arial",
                    fontWeight: 500,
                    fontSize: 12,
                    marginTop: 0,
                  }}
                >
                  receiptNo
                </p>
              </div>
            </div>
          </MDBox>
        </MDBox>
      </Card>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default AccountSheet;

import React from "react";
// import MDBox from "components/MDBox";
// import { Container } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";

// eslint-disable-next-line react/prop-types
const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  console.log(posts);
  // console.log(options);

  // const [answerx, setAnswer] = useState("");

  // const handleOnChangeOption = (e) => {
  //   const opVal = e.target.value;
  //   setAnswer(opVal);
  // };
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 50,
    },
    preview: {
      marginTop: 50,
      display: "flex",
      flexDirection: "column",
    },
    image: { maxWidth: "100%", maxHeight: 320, borderRadius: 20 },
    delete: {
      cursor: "pointer",
      padding: 5,
      background: "blue",
      color: "white",
      border: "none",
      borderRadius: 5,
      width: 200,
    },
  };

  return (
    <ul className="list-group mb-4">
      {/* eslint-disable-next-line react/prop-types */}
      {posts.map((post) => (
        <>
          <li key={post.question.id} className="list-group-item">
            <img src={post.question.imageUrl} style={styles.image} alt="" />
            &nbsp; &nbsp;
            <br />
            &nbsp; &nbsp;
            {post.question.question}
            {/* <img src={post.imageUrl} style={styles.image} alt="Thumb" /> */}
          </li>
          {/* <img src={post.imageUrl} style={styles.image} alt="" /> */}
        </>
      ))}
      {/* eslint-disable-next-line react/prop-types */}
      {/* {picImage.map((image) => (
        <li key={image.id} className="list-group-item">
          <img src={image.imageUrl} style={styles.image} alt="Thumb" />
        </li>
      ))} */}
      {/* eslint-disable-next-line react/prop-types */}
      {/* {options.map((post) => (
        <li key={post.options.id} className="list-group-item">
          {post.value}
        </li>
      ))} */}

      {/* eslint-disable-next-line react/prop-types */}
      {/* {items.map((post) => ( */}
      {/* eslint-disable-next-line react/prop-types */}
      {/* <li className="list-group-item"> {items.value}</li> */}
      {/* ))} */}
      {/* <MDBox mb={2}>
        <Container>
          <div className="row">
            <div className="col-sm-4">
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={answerx}
                  onChange={handleOnChangeOption}
                >
                  {/* eslint-disable-next-line react/prop-types 
                  {items.map((apis) => (
                    <FormControlLabel
                      key={apis.id}
                      value={apis.value}
                      control={<Radio />}
                      label={apis.value}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </Container>
      </MDBox> */}

      {/* eslint-disable-next-line react/prop-types */}
      {/* {items.map((itemx) => (
        <li key={itemx.id} className="list-group-item">
          {itemx.calmdown}
        </li>
      ))} */}
    </ul>
  );
};

export default Posts;

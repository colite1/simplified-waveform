import { useEffect, useState } from "react";
import axios from "axios";
export default function Infinite() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  // api calling section
  useEffect(() => {
    axios
      .get(
        `https://api.unsplash.com/photos/?client_id=YKuaeFS4NUbilRg-IOYDPl75-h65VTh6LNIpQn6p7a4&page=${page}`
      )
      .then((res) => setImages((prev) => [...prev, ...res.data]));
  }, [page]);
  //infinite scroll logic
  const handleInfiniteScroll = async () => {
    // console.log("scrollHeight" + document.documentElement.scrollHeight);
    // console.log("innerHeight" + window.innerHeight);
    // console.log("scrollTop" + document.documentElement.scrollTop);
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //cleanup function so all data will not load at once
  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.addEventListener("scroll", handleInfiniteScroll);
  }, []);
  // console.log(images);
  return (
    <div className="App">
      <h1 className="infinite">Infinte Scroll</h1>
      {images.map((image, index) => {
        return (
          <div style={{ padding: 10 }} key={index}>
            <img
              style={{
                border: "solid red",
                height: 150,
                maxWidth: 300,
                padding: 10
              }}
              alt={image.alt_description}
              src={image.urls.small_s3}
            ></img>
          </div>
        );
      })}
    </div>
  );
}

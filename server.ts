import app from "./app";
import getDetails from "./service/getDetails";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server running on port ", port);
});

app.get("/", (req, res) => {
  res.send("Test in case");
});

app.get("/data", async (req, res) => {
  const pointOfInterest = req.body;
  try {
    const response = await getDetails(pointOfInterest);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

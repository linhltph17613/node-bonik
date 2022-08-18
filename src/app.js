// @ts-ignore
import express from 'express';
// @ts-ignore
import cors from 'cors';
// @ts-ignore
import morgan from 'morgan';
import mongoose from 'mongoose';
// @ts-ignore
import mongodb, { MongoClient } from 'mongodb';
// @ts-ignore
import { readdirSync } from 'fs';
// @ts-ignore
import path, { dirname } from 'path';
import routerProduct from './routes/products';
// @ts-ignore
import swaggerUI from 'swagger-ui-express';
// @ts-ignore
import YAML from 'yamljs';

import categoryRoute from './routes/category'
import bannerRoute from './routes/banner'
import voucherRoute from "./routes/voucher";


// @ts-ignore
const app = express();
const swaggerJSDocs = YAML.load("./api.yaml")

//middleware
// @ts-ignore
app.use(cors());
// @ts-ignore
app.use(morgan("tiny"));
// @ts-ignore
app.use(express.json());

//routes
// readdirSync(`${__dirname}/routes`).forEach(async (fileName) => {
//     import("./routes/" + fileName)
//         .then(({default: router}) => router.default)
//         .then((router) => app.use("/api", router))
// }) ;
// @ts-ignore
app.use("/api", routerProduct);
app.use("/api", categoryRoute);
app.use("/api", bannerRoute);
app.use("/api", voucherRoute);
// @ts-ignore
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs))

// connection db
const mongoAtlasUri = "mongodb+srv://anhnn02:nextjs123@nhom1-nextjs.akbbnsm.mongodb.net/asm-nextjs?retryWrites=true&w=majority"

try {
    // Connect to the MongoDB cluster
    mongoose.connect(
        mongoAtlasUri,
        // @ts-ignore
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log("Mongoose đã được kết nối")
    );
} catch (e) {
    console.log("Không thể kết nối");
}
const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Kết nối thất bại ${ err }`));
dbConnection.once("open", () => console.log("Kết nối thành công đến DB!"));

//connect
const PORT = 3001;
// @ts-ignore
app.listen(PORT, () => {
    console.log("Server is running on PORT ", PORT);
})
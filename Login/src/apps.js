import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import path from "path";
import exphbs from "express-handlebars";
import viewRouter from "./routes/view.router.js";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();
const PORT = process.env.PORT || 8080;

const __dirname = path.resolve(path.dirname(""));

// Creamos una instancia de cliente de MongoDB manualmente
import { MongoClient } from "mongodb";

(async () => {
    try {
        const mongoClient = new MongoClient(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Verificamos si la cadena de conexión es válida
        if (!process.env.MONGODB_URI.startsWith("mongodb://")) {
            throw new Error("Invalid MongoDB connection string");
        }

        await mongoClient.connect();
        console.log("Connected to MongoDB");

        // Utilizamos create() para crear una instancia de express-handlebars
        const hbs = exphbs.create();

        app.engine("handlebars", hbs.engine);
        app.set("views", path.join(__dirname, "/views"));
        app.set("view engine", "handlebars");

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(express.static(path.join(__dirname, "/public")));

        const httpServer = app.listen(PORT, () =>
            console.log("Listening on port " + PORT)
        );

        app.use(
            session({
                secret: "secretCode",
                resave: false,
                saveUninitialized: false,
                store: MongoStore.create({
                    client: mongoClient, // Proporciona el cliente de MongoDB
                    ttl: 120,
                }),
                cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }, // Configure la cookie según tus necesidades
            })
        );

        app.use("/", viewRouter);
        app.use("/api/products", productsRouter);
        app.use("/api/carts", cartsRouter);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
})();

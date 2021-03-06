const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 3977;
const { API_VERSION, IP_SERVER, PORT_DB } = require("./config");

mongoose.set("useFindAndModify", false);

mongoose.connect(
    `mongodb+srv://chander131:eBJUy47Wwa7BtF3@webpersonal.bn4dq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, res) => {
        if (err) {
            throw err;
        } else {
            console.log("La conexion a la base de datos es correcta");

            app.listen(port, () => {
                console.log("#####################");
                console.log("###### API REST #####");
                console.log("#####################");
                console.log(`${IP_SERVER}:${port}/api/${API_VERSION}`);
            });
        }
    }
);

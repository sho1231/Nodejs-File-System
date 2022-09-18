const express = require('express');
const app = express();
const fs = require('fs');




app.get("/", (req, res) => res.send("Hello123"));

app.post("/create", (req, res) => {
    try {
        let filename = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' }).split("");
        for (let i in filename) {
            if (filename[i] === '/' || filename[i] === ':')
                filename.splice(i, 1, "-");
        }
        const content = new Date().toLocaleString();
        filename = filename.join("") + ".txt";
        fs.writeFileSync(filename, content);
        res.status(200).json({ message: `Your file created successfully with name ${filename}` });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "error" })
    }
})

app.get("/get", (req, res) => {
    try {
        let filenames = fs.readdirSync(__dirname);
        const files_contents = [];
        filenames = filenames.filter(filename => filename.split(".").pop() === "txt");
        console.log(filenames)
        for (let i in filenames) {
            let obj = {};
            obj[filenames[i]] = fs.readFileSync(filenames[i], 'utf8');
            console.log(obj);
            files_contents.push(obj);
        }
        res.status(200).json(files_contents);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "error" })
    }
})
app.listen(8000, () => console.log("started"));

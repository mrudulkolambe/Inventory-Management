const path = require("path");
const express = require("express");

const nodemailer = require("nodemailer")
const app = express()
const cors = require("cors")
app.use(cors)
const buildPath = path.join(__dirname, " .. ", "build")
app.use(express.json())
app.use(express.static(buildPath))



app.post("/create", (req, res) => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "rajashree.pachpande@sigce.edu.in",
			pass: "uufiqevykcybgajl"
		}
	})
	const mailOptions = {
		from: "rajashree.pachpande@sigce.edu.in",
		to: "mrudulkolambe02@gmail.com",
		subject: "adsasd",
		text: "asdasdasd"
	}

	transporter.sendMail(mailOptions, (err, info) =>{
		if (err) {
			console.log(err)
		}
		else{
			console.log(info)
		}
	})
})


app.listen(5000, () => {
	console.log("server started at port 5000")
})
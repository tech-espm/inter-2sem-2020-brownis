import express = require("express");
import wrap = require("express-async-error-wrapper");
import nodemailer = require("nodemailer");

const router = express.Router();

// Se utilizar router.xxx() mas não utilizar o wrap(), as exceções ocorridas
// dentro da função async não serão tratadas!!!
router.post("/enviar", wrap(async (req: express.Request, res: express.Response) => {
	let mensagem = "Novo pedido!\n";
	mensagem += "Nome: " + req.body.nome + "\n";
	mensagem += "Email: " + req.body.email + "\n";
	//...

	let transporter = nodemailer.createTransport({
		service: "gmail",
		host: "smtp.gmail.com",
		port: 465,
		secure: "true",
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD
		},
		tls: {
			rejectUnauthorized: false
		}
	});

	let mailOptions = {
		from: process.env.EMAIL,
		to: process.env.EMAIL,
		subject: "Novo Pedido",
		text: mensagem
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			res.json(error);
		} else {
			res.json(true);
		}
	});
}));

export = router;

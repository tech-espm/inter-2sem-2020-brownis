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
	mensagem += "Telefone: " + req.body.telefone + "\n";
	mensagem += "Bairro: " + req.body.bairro + "\n";
	mensagem += "Endereço: " + req.body.endereco + "\n";	
	if(req.body.tradicional >= 1){
		mensagem += "Tradicional: " + req.body.tradicional + "\n";
	}
	if(req.body.nozes >= 1){
		mensagem += "Nozes: " + req.body.nozes + "\n";
	}
	if(req.body.mem >= 1){
		mensagem += "M&M: " + req.body.mem + "\n";
	}
	if(req.body.oreo >= 1){
		mensagem += "Oreo: " + req.body.oreo + "\n";
	}
	if(req.body.branco >= 1){
		mensagem += "Branco: " + req.body.branco + "\n";
	}
	if(req.body.nutella >= 1){
		mensagem += "Nutella: " + req.body.nutella + "\n";
	}
	if(req.body.limao >= 1){
		mensagem += "Limao: " + req.body.limao + "\n";
	}
	if(req.body.bichope >= 1){
		mensagem += "Bicho De Pé: " + req.body.bichope + "\n";
	}
	if(req.body.beijinho >= 1){
		mensagem += "Beijinho: " + req.body.beijinho + "\n";
	}
	//...

	let transporter = nodemailer.createTransport({
		service: "Hotmail",
		auth: {
			rejectUnauthorized: false,
			user: process.env.EMAIL,
			pass: process.env.PASSWORD
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

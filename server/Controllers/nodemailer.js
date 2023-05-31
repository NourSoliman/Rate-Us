    const nodemailer = require(`nodemailer`)
    const mailgen = require(`mailgen`)
    const registerEmail = async (req, res , next) => {
        const { userName, email } = req.body;
        let config = {
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        }
        let transporter = nodemailer.createTransport(config)
        let mailGenerator = new mailgen({
            theme: "cerberus",
            product: {
                name: "Companies Rate",
                link: "not yet"
            }
        })
        let response = {
            body: {
                name: userName,
                intro: "Welcome to Companies Rate website",
                table: {
                    data: [
                        { item: "companies website", }
                    ]
                },
                outro: "WELCOME!!"
            }
        }
        let mail = mailGenerator.generate(response)
        let message = {
            from: process.env.EMAIL,
            to: email,
            subject: "Thanks for Joining Us and WELCOME!",
            html: mail
        }
        transporter.sendMail(message).then(() => {
            // res.status(201).json({ msg: "You will receive an email soon!" })
            next()
        }).catch(error => {
            console.log(error);
            // res.status(500).json({ error })
        })
    }
    module.exports =  registerEmail





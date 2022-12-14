const db = require("quick.db");
const config = require("../../config.json");
module.exports = {
    path: "/",
    method: "get",
    go: async (req, res) => {
        const ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const r = await ipinfo(ip.replace("::ffff:", ""));
        if (r.status === "success") {
            if (db.has(`user_${ip.replace("::ffff:", "")}`)) {
                let html = "<script>window.location = `" + config.domain + "/base`</script>"
                return res.send(html)
            } else { return res.sendFile(`verif.html`, { root: "./views/web" }) }
        } else {
            return res.sendFile(`verif.html`, { root: "./views/web" })
        }
    }
}
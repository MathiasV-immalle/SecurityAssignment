module.exports = {
    makeUrl: function (hashedPassword) {
        const sUrl = "https://api.pwnedpasswords.com/range/",
            sId = hashedPassword.substring(0, 5);
        const url = sUrl + sId;
        return url;
    },
    validate: function (password) {
        if (password.toString().length >= 8) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = {
    ifeq(a, b, options) {
        if (a && b && a.toString() === b.toString()) {
            return options.fn(this)
        }
        return options.inverse(this)
    }
}
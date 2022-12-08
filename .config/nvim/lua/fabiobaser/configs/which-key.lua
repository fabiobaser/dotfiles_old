local wk = require("which-key")

wk.register({
    f = { name = "Files" },
    p = { name = "Packages" },
    l = { name = "LSP" },
    S = { name = "Sessions" },
    t = { name = "Terminal" },
}, { prefix = "<leader>" })

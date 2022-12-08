local toggleterm = require("toggleterm")
toggleterm.setup({})

local Terminal = require("toggleterm.terminal").Terminal

local lazygit = Terminal:new({
    cmd = "lazygit",
    hidden = true,
    direction = "float",
})

function Toggle_lazygit()
    lazygit:toggle()
end

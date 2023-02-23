-- local dap = require("dap")
local masonNvimDap = require("mason-nvim-dap")

masonNvimDap.setup({
    automatic_setup = true,
})
-- masonNvimDap.setup_handlers({
--     function(source_name)
--         require("mason-nvim-dap.automatic_setup")(source_name)
--     end,
-- })

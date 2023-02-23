require("config.settings")
require("config.lazy")
require("config.keybinds")

vim.cmd("colorscheme catppuccin")
vim.api.nvim_create_augroup("JABS", {})

-- require("fabiobaser.settings")
-- require("fabiobaser.plugins")
-- require("fabiobaser.keybinds")
-- require("fabiobaser.autocommands")

-- require("fabiobaser.configs.which-key")

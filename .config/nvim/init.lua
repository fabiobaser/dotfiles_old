require("config.settings")

-- LAZY setup
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable", -- latest stable release
    lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)

require("lazy").setup("plugins")

require("config.keybinds")
require("config.autocommands")

vim.cmd("colorscheme catppuccin")

-- require("fabiobaser.settings")
-- require("fabiobaser.plugins")
-- require("fabiobaser.keybinds")
-- require("fabiobaser.autocommands")

-- require("fabiobaser.configs.which-key")

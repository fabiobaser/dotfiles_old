local o = vim.o
local g = vim.g

vim.cmd.colorscheme("catppuccin")

o.termguicolors = true

-- Update Times
o.timeoutlen = 500
o.updatetime = 200

-- Editor UI
o.number = true
o.relativenumber = true
o.signcolumn = "yes"
o.cursorline = false

-- UX
o.expandtab = true
-- o.smarttab = true
o.cindent = true
-- o.autoindent = true
o.wrap = true
o.textwidth = 300
o.tabstop = 4
o.shiftwidth = 0
o.softtabstop = -1 -- If negative, shiftwidth value is used
o.list = true
o.listchars = "trail:·,nbsp:◇,tab:→ ,extends:▸,precedes:◂"

o.clipboard = "unnamedplus"

vim.opt.completeopt = { "menu", "menuone", "noselect" }

-- Map
g.mapleader = " "
g.maplocalleader = " "

-- Folding
o.foldmethod = "marker"
o.foldexpr = "nvim_treesitter#foldexpr()"
o.foldlevelstart = 6

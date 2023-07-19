local o = vim.o
local g = vim.g

o.swapfile = false

-- Update Times
o.timeoutlen = 500
o.ttimeoutlen = 5
o.updatetime = 200

-- Editor UI
o.number = true
o.termguicolors = true
o.relativenumber = false
o.laststatus = 3
o.signcolumn = "yes"
o.cursorline = true
o.fillchars = [[eob: ,fold: ,foldopen:,foldsep: ,foldclose:]]
o.foldcolumn = "1"

-- UX
o.expandtab = true
o.undofile = true
-- o.smarttab = true
o.cindent = true
-- o.autoindent = true
o.wrap = true
o.textwidth = 300
o.tabstop = 4
o.shiftwidth = 0
o.softtabstop = -1 -- If negative, shiftwidth value is used
o.list = true
-- vim.opt.listchars:append("space:⋅")
-- vim.opt.listchars:append("eol:↴")
o.clipboard = "unnamedplus"

vim.opt.completeopt = { "menu", "menuone", "noselect" }

-- Map
g.mapleader = " "
g.maplocalleader = " "

-- Folding
o.foldcolumn = "1"
o.foldlevel = 99 -- Using ufo provider need a large value, feel free to decrease the value
o.foldlevelstart = 99
o.foldenable = true

o.cmdheight = 0

vim.lsp.handlers["textDocument/publishDiagnostics"] = vim.lsp.with(vim.lsp.diagnostic.on_publish_diagnostics, {
	update_in_insert = true,
})

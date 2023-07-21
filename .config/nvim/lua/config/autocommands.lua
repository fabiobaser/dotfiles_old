local cmd = vim.cmd
local api = vim.api

api.nvim_create_autocmd("VimEnter", {
	callback = function()
		vim.cmd("silent !source ~/.zshrc; tmux-window-name", { silent = true })
	end,
	group = api.nvim_create_augroup("fabio", { clear = false }),
})

api.nvim_create_autocmd("VimLeave", {
	callback = function()
		vim.cmd("silent !source ~/.zshrc; tmux-window-name", { silent = true })
	end,
	group = api.nvim_create_augroup("fabio", { clear = false }),
})

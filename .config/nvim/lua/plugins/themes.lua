return {
	{
		"catppuccin/nvim",
		name = "catppuccin",
		lazy = false,
		priority = 1000,
		opts = {
			integrations = {
				treesitter = true,
				cmp = true,
				gitsigns = true,
				fidget = true,
				lsp_saga = true,
				notify = true,
				leap = true,
				dropbar = {
					enabled = true,
					color_mode = true,
				},
				mason = true,
				neotree = true,
				lsp_trouble = true,
				which_key = false,
			},
		},
	},
}

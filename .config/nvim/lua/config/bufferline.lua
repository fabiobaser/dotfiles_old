local bufferline = require("bufferline")
require("scope").setup()

local clrs = require("catppuccin.palettes").get_palette()

bufferline.setup({
	highlights = {
		fill = {
			bg = clrs.mantle,
			fg = clrs.text,
		},
		background = {
			bg = clrs.mantle,
		},
		tab_selected = {
			fg = clrs.text,
			bold = true,
		},
		indicator_selected = {
			fg = clrs.base,
		},
	},
	options = {
		separator_style = { nil, nil },
		infos = "nvim_lsp",
		infos_indicator = function(count, level)
			local icon = level:match("error") and " " or " "
			return " " .. icon .. count
		end,
		show_buffer_close_icons = false,
		offsets = {
			{
				filetype = "neo-tree",
				text = "Explorer",
				text_align = "center",
				separator = false,
			},
		},
	},
})

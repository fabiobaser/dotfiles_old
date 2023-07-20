local feline = require("feline")
local clrs = require("catppuccin.palettes").get_palette()

local function isNil(s)
	return s == nil or s == ""
end

local mode_colors = {
	["n"] = { "NORMAL", clrs.lavender },
	["no"] = { "N-PENDING", clrs.lavender },
	["i"] = { "INSERT", clrs.green },
	["ic"] = { "INSERT", clrs.green },
	["t"] = { "TERMINAL", clrs.green },
	["v"] = { "VISUAL", clrs.flamingo },
	["V"] = { "V-LINE", clrs.pink },
	[""] = { "V-BLOCK", clrs.flamingo },
	["R"] = { "REPLACE", clrs.maroon },
	["Rv"] = { "V-REPLACE", clrs.maroon },
	["s"] = { "SELECT", clrs.maroon },
	["S"] = { "S-LINE", clrs.maroon },
	[""] = { "S-BLOCK", clrs.maroon },
	["c"] = { "COMMAND", clrs.peach },
	["cv"] = { "COMMAND", clrs.peach },
	["ce"] = { "COMMAND", clrs.peach },
	["r"] = { "PROMPT", clrs.teal },
	["rm"] = { "MORE", clrs.teal },
	["r?"] = { "CONFIRM", clrs.mauve },
	["!"] = { "SHELL", clrs.green },
}

local assets = {
	left_separator = "",
	right_separator = "",
	bar = "█",
	mode_icon = "",
	dir = "  ",
	file = "  ",
	lsp = {
		server = "  ",
		error = "  ",
		warning = "  ",
		info = "  ",
		hint = "  ",
	},
	git = {
		branch = "  ",
		added = "  ",
		changed = "  ",
		removed = "  ",
	},
}
local sett = {
	text = clrs.surface0,
	bkg = clrs.surface0,
	diffs = clrs.mauve,
	extras = clrs.overlay1,
	curr_file = clrs.maroon,
	curr_dir = clrs.flamingo,
	show_modified = false,
}
local vi_mode_hl = function()
	return {
		fg = sett.text,
		bg = mode_colors[vim.fn.mode()][2],
		style = "bold",
	}
end
local active_left = {
	{
		provider = "git_diff_added",
		hl = {
			bg = clrs.text,
			fg = clrs.base,
		},
		right_sep = "block",
	},
	{
		provider = "git_diff_removed",
		hl = {
			bg = clrs.text,
			fg = clrs.base,
		},
		right_sep = "block",
	},
	{
		provider = "git_diff_changed",
		hl = {
			bg = clrs.text,
			fg = clrs.base,
		},
		right_sep = "block",
	},
	{
		provider = function()
			return " " .. mode_colors[vim.fn.mode()][1] .. " "
		end,
		hl = vi_mode_hl,
		icon = "",
	},
	{
		provider = "diagnostic_errors",
		hl = { bg = clrs.base, fg = clrs.red },
	},
	{
		provider = "diagnostic_warnings",
		hl = { bg = clrs.base, fg = clrs.yellow },
	},
	{
		provider = "diagnostic_hints",
		hl = { bg = clrs.base, fg = clrs.blue },
	},
	{
		provider = "diagnostic_info",
		hl = { bg = clrs.base, fg = clrs.lavender },
	},
	{
		provider = "search_count",
		left_sep = "block",
		hl = {
			bg = clrs.base,
		},
	},
}

local act_mid = {
	{
		provider = " ",
		hl = {
			bg = clrs.base,
		},
	},
}

local active_right = {
	{
		provider = "macro",
	},
	{
		provider = "line_percentage",
		left_sep = {
			"block",
		},
		right_sep = "block",
		hl = {
			bg = clrs.base,
		},
	},
	{
		provider = "lsp_client_names",
		hl = {
			bg = clrs.green,
			fg = clrs.base,
			style = "bold",
		},
		left_sep = { "left_filled", "block" },
		right_sep = "block",
	},
	{
		provider = function()
			local filename = vim.fn.expand("%:t")
			local extension = vim.fn.expand("%:e")
			local filetype = vim.bo.filetype
			local icon, color = require("nvim-web-devicons").get_icon_color(filename, extension)
			if isNil(icon) or isNil(color) then
				return ""
			end

			return icon .. " " .. filetype
		end,

		hl = {
			bg = clrs.yellow,
			fg = clrs.base,
			style = "bold",
		},
		left_sep = {
			{
				str = "left_filled",
				hl = {
					fg = clrs.yellow,
					bg = clrs.green,
				},
			},
			"block",
		},
		right_sep = "block",
	},
	{
		provider = "file_size",
		hl = {
			bg = clrs.teal,
			fg = clrs.base,
			style = "bold",
		},
		left_sep = {
			{
				str = "left_filled",
				hl = {
					fg = clrs.teal,
					bg = clrs.yellow,
				},
			},
			"block",
		},
		right_sep = "block",
	},
}

local components = {
	active = {
		active_left,
		-- act_mid,
		active_right,
	},
	inactive = { {}, {} },
}

feline.setup({
	components = components,
})

return {
	{ "tomiis4/hypersonic.nvim", config = true },
	{
		"Bekaboo/dropbar.nvim",
		config = true,
	},
	{
		"andythigpen/nvim-coverage",
		opts = {
			coverage_file = "coverage/lcov.info",
		},
	},
	{
		"chentoast/marks.nvim",
		opts = {
			default_mappings = true,
			builtin_marks = { ".", "<", ">", "^" },
			sign_priority = { lower = 10, upper = 15, builtin = 8, bookmark = 20 },
			bookmark_0 = {
				sign = "⚑",
				annotate = true,
			},
		},
	},
	{
		"andrewferrier/wrapping.nvim",
		config = true,
	},
	{
		"folke/twilight.nvim",
		opts = {
			dimming = {
				alpha = 0.25,
				color = { "Normal", "#ffffff" },
				term_bg = "#000000", -- if guibg=NONE, this will be used to calculate text color
				inactive = false, -- when true, other windows will be fully dimmed (unless they contain the same buffer)
			},
			context = 10, -- amount of lines we will try to show around the current line
			treesitter = true, -- use treesitter when available for the filetype
			-- treesitter is used to automatically expand the visible text,
			-- but you can further control the types of nodes that should always be fully expanded
			expand = { -- for treesitter, we we always try to expand to the top-most ancestor with these types
				"function",
				"method",
				"table",
				"if_statement",
			},
			exclude = { "json" }, -- exclude these filetypes
		},
	},
	{
		"yamatsum/nvim-nonicons",
		dependencies = { "kyazdani42/nvim-web-devicons" },
		config = function()
			require("config.icons")
		end,
	},
	{
		"yamatsum/nvim-cursorline",
		opts = {
			cursorline = {
				enable = true,
				timeout = 1000,
				number = false,
			},
			cursorword = {
				enable = true,
				min_length = 3,
				hl = { underline = true },
			},
		},
	},
	{
		"folke/todo-comments.nvim",
		config = true,
	},
	{
		"folke/which-key.nvim",
		opts = {
			plugins = {
				spelling = { enabled = true },
				presets = { operators = false },
			},
			window = {
				border = "rounded",
				padding = { 2, 2, 2, 2 },
			},
			disable = { filetypes = { "TelescopePrompt" } },
		},
	},
	{
		"lukas-reineke/indent-blankline.nvim",
		opts = {
			show_current_context = true,
			show_current_context_start = true,
		},
	},
	{
		"goolord/alpha-nvim",
		lazy = false,
		config = function()
			require("alpha").setup(require("alpha.themes.startify").config)
		end,
		keys = {
			{ "<leader>a", "<CMD>Alpha<CR>", desc = "Opens Alpha Dashboard" },
		},
	},
	{
		"rcarriga/nvim-notify",
		config = function()
			local notify = require("notify")
			notify.setup({
				render = "compact",
				stages = "slide",
				timeout = 1500,
			})
			vim.notify = notify
		end,
	},
	{
		"lewis6991/gitsigns.nvim",
		config = true,
	},
	{
		"akinsho/bufferline.nvim",
		dependencies = { "tiagovla/scope.nvim" },
		config = function()
			require("config.bufferline")
		end,
	},
	{
		"kevinhwang91/nvim-ufo",
		dependencies = { "kevinhwang91/promise-async" },
		config = function()
			local handler = function(virtText, lnum, endLnum, width, truncate)
				local newVirtText = {}
				local suffix = ("  %d "):format(endLnum - lnum)
				local sufWidth = vim.fn.strdisplaywidth(suffix)
				local targetWidth = width - sufWidth
				local curWidth = 0
				for _, chunk in ipairs(virtText) do
					local chunkText = chunk[1]
					local chunkWidth = vim.fn.strdisplaywidth(chunkText)
					if targetWidth > curWidth + chunkWidth then
						table.insert(newVirtText, chunk)
					else
						chunkText = truncate(chunkText, targetWidth - curWidth)
						local hlGroup = chunk[2]
						table.insert(newVirtText, { chunkText, hlGroup })
						chunkWidth = vim.fn.strdisplaywidth(chunkText)
						-- str width returned from truncate() may less than 2nd argument, need padding
						if curWidth + chunkWidth < targetWidth then
							suffix = suffix .. (" "):rep(targetWidth - curWidth - chunkWidth)
						end
						break
					end
					curWidth = curWidth + chunkWidth
				end
				table.insert(newVirtText, { suffix, "MoreMsg" })
				return newVirtText
			end

			require("ufo").setup({
				open_fold_hl_timeout = 150,
				fold_virt_text_handler = handler,
				close_fold_kinds = { "imports", "comment" },
				preview = {
					win_config = {
						border = { "", "─", "", "", "", "─", "", "" },
						winhighlight = "Normal:Folded",
						winblend = 0,
					},
					mappings = {
						scrollU = "<C-u>",
						scrollD = "<C-d>",
					},
				},
				provider_selector = function(bufnr, filetype, buftype)
					return { "treesitter", "indent" }
				end,
			})
		end,
	},
	{
		"feline-nvim/feline.nvim",
		config = function()
			require("config.statusline")
		end,
	},
	{
		"j-hui/fidget.nvim",
		branch = "legacy",
		opts = {
			window = {
				blend = 0,
			},
		},
	},
	{
		"akinsho/git-conflict.nvim",
		version = "*",
		config = true,
	},

	{
		"folke/trouble.nvim",
		config = true,
		keys = {
			{ "<leader>lt", "<cmd>TroubleToggle<cr>", desc = "Toggle Diagnostics Window" },
		},
	},
	{
		"gelguy/wilder.nvim",
		dependencies = { "romgrk/fzy-lua-native" },
		config = function()
			require("config.wilder")
		end,
	},
}

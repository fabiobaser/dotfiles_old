return {
	{
		"gnikdroy/projections.nvim",
		branch = "pre_release",
		config = function()
			require("projections").setup({
				workspaces = {
					{ "~/Developer/Formcentric/frontend/libs", {} },
					{ "~/Developer/Formcentric/frontend/apps", {} },
					"~/.config/nvim",
				},
				store_hooks = {
					pre = function()
						vim.cmd([[Neotree action=close]])
					end,
				},
			})

			-- Bind <leader>fp to Telescope projections
			require("telescope").load_extension("projections")
			vim.keymap.set("n", "<leader>fp", function()
				vim.cmd("Telescope projections")
			end)

			-- Autostore session on VimExit
			local Session = require("projections.session")
			vim.api.nvim_create_autocmd({ "VimLeavePre" }, {
				callback = function()
					Session.store(vim.loop.cwd())
				end,
			})

			-- Switch to project if vim was started in a project dir
			local switcher = require("projections.switcher")
			vim.api.nvim_create_autocmd({ "VimEnter" }, {
				callback = function()
					if vim.fn.argc() == 0 then
						switcher.switch(vim.loop.cwd())
					end
				end,
			})
		end,
	},
	"voldikss/vim-floaterm",
	{
		"nvim-telescope/telescope.nvim",
		dependencies = {
			"nvim-lua/plenary.nvim",
			"nvim-telescope/telescope-ui-select.nvim",
			{ "nvim-telescope/telescope-fzf-native.nvim", build = "make" },
			{
				"nvim-telescope/telescope-frecency.nvim",
				dependencies = { "kkharji/sqlite.lua" },
			},

			"Marskey/telescope-sg",
		},
		config = function()
			local telescope = require("telescope")
			telescope.setup({
				defaults = {
					vimgrep_arguments = {
						"rg",
						"-L",
						"--color=never",
						"--no-heading",
						"--with-filename",
						"--line-number",
						"--column",
						"--smart-case",
					},
					generic_sorter = require("telescope.sorters").get_generic_fuzzy_sorter,
				},
				extensions = {
					["ui-select"] = {
						require("telescope.themes").get_dropdown({}),
					},
					fzf = {
						fuzzy = true,
						override_generic_sorter = true,
						override_file_sorter = true,
						case_mode = "smart_case",
					},
					ast_grep = {
						command = { "ast-grep", "--json=stream", "-p" },
						grep_open_files = false,
						disable_devicons = true,
						lang = nil,
					},
				},
			})

			telescope.load_extension("fzf")
			telescope.load_extension("ui-select")
			telescope.load_extension("frecency")
			telescope.load_extension("ast_grep")
		end,
		keys = {
			{ "<leader>ff", "<CMD>Telescope find_files<CR>", desc = "Search for Files" },
			{ "<leader>fg", "<CMD>Telescope live_grep<CR>", desc = "Search for Word" },
			{ "<leader>fb", "<CMD>Telescope buffers<CR>", desc = "Search Buffers" },
			{ "<leader>fh", "<CMD>Telescope highlights<CR>", desc = "Search Highlight Groups" },
			{ "<leader>fH", "<CMD>Telescope help_tags<CR>", desc = "Search Help Tags" },
			{ "<leader>fR", "<CMD>Telescope frecency<CR>", desc = "Search recent files" },
			{ "<leader>fr", "<CMD>Telescope frecency workspace=CWD<CR>", desc = "Search recent files in CWD" },
		},
	},
	{
		"max397574/better-escape.nvim",
		opts = { mappings = { "jk" } },
	},
	{
		"chrisgrieser/nvim-origami",
		event = "BufReadPost",
		opts = {
			keepFoldsAcrossSessions = true,
			setupFoldKeymaps = true,
		},
	},
}

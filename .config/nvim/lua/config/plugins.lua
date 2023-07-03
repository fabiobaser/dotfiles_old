return {
	{
		"catppuccin/nvim",
		name = "catppuccin",
		opts = {
			integrations = {
				fidget = true,
				lsp_saga = true,
				navic = {
					enabled = true,
					custom_bg = "NONE",
				},
			},
		},
	},
	{
		"andythigpen/nvim-coverage",
		opts = {
			coverage_file = "coverage/lcov.info",
		},
	},
	{
		"ThePrimeagen/refactoring.nvim",
		config = true,
		keys = {
			{
				"<leader>re",
				"<CMD>lua require('refactoring').refactor('Extract Function')<CR>",
				desc = "Extract Function",
				mode = "v",
			},
			{
				"<leader>rE",
				"<CMD>lua require('refactoring').refactor('Extract Function To File')<CR>",
				desc = "Extract Function to File",
				mode = "v",
			},
			{
				"<leader>rv",
				"<CMD>lua require('refactoring').refactor('Extract Variable')<CR>",
				desc = "Extract Varaible",
				mode = "v",
			},
			{
				"<leader>ri",
				"<CMD>lua require('refactoring').refactor('Inline Variable')<CR>",
				desc = "Inline Variable",
			},
			{
				"<leader>rb",
				"<CMD>lua require('refactoring').refactor('Extract Block')<CR>",
				desc = "Extract Block",
			},
			{
				"<leader>rbf",
				"<CMD>lua require('refactoring').refactor('Extract Block to File')<CR>",
				desc = "Extract Block to File",
			},
			{
				"<leader>ri",
				"<CMD>lua require('refactoring').refactor('Inline Variable')<CR>",
				desc = "Inline Variable",
			},
		},
	},
	{
		"akinsho/git-conflict.nvim",
		version = "*",
		config = true,
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
	{ "folke/zen-mode.nvim" },
	{ "folke/neoconf.nvim" },
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
		"nvim-neo-tree/neo-tree.nvim",
		branch = "v2.x",
		dependencies = { "nvim-lua/plenary.nvim", "MunifTanjim/nui.nvim" },
		opts = {
			enable_git_status = true,
			git_status = {
				symbols = {
					-- Change type
					added = "", -- or "✚", but this is redundant info if you use git_status_colors on the name
					modified = "", -- or "", but this is redundant info if you use git_status_colors on the name
					deleted = "✖", -- this can only be used in the git_status source
					renamed = "", -- this can only be used in the git_status source
					-- Status type
					untracked = "",
					ignored = "",
					unstaged = "",
					staged = "",
					conflict = "",
				},
			},
			close_if_last_window = true,
			nesting_rules = {
				["js"] = { "js.map" },
				["ts"] = { "test.ts", "stories.ts", "ts.map" },
				["tsx"] = { "test.tsx", "stories.tsx" },
				["jsx"] = { "test.jsx", "stories.jsx" },
			},
			enable_diagnostics = true,
			buffers = {
				follow_current_file = true,
				group_empty_dirs = true,
			},
			filesystem = {
				follow_current_file = true,
				group_empty_dirs = false,
				filtered_items = {
					hide_by_name = {
						"__tests__",
						"migrations.json",
						"coverage",
					},
					hide_by_pattern = {
						"*.stories.*",
						"pnpm-lock.*",
						"*.config.*",
						"*.preset.*",
						"tsconfig.*",
						"*.conf",
						"Dockerfile*",
					},
				},
			},
		},
		keys = {
			{ "<leader>e", "<CMD>Neotree toggle<CR>", desc = "Toggle Explorer" },
			{ "<leader>o", "<CMD>Neotree focus<CR>", desc = "Focus Explorer" },
		},
	},
	{
		"folke/todo-comments.nvim",
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
	{ "famiu/bufdelete.nvim" },
	{
		"kylechui/nvim-surround",
		config = true,
	},
	-- UTILS
	{
		"aserowy/tmux.nvim",
		config = true,
	},
	{
		"akinsho/toggleterm.nvim",
		config = true,
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
		"motosir/skel-nvim",
		opts = {
			skel_enabled = true,
			apply_skel_for_empty_file = true,
			mappings = {
				["*.tsx"] = "tsx_basic.skel",
				["*.ts"] = "ts_func.skel",
				["*.test.tsx"] = "rtl_snapshot_test.skel",
			},
		},
	},
	{
		"ggandor/leap.nvim",
		dependencies = { "tpope/vim-repeat" },
		config = function()
			local leap = require("leap")
			leap.opts.highlight_unlabeled_phase_one_targets = true
			leap.add_default_mappings()
		end,
	},
	{
		"nguyenvukhang/nvim-toggler",
		opts = { remove_default_keybinds = true },
	},
	{
		"numToStr/Comment.nvim",
		config = true,
	},
	{
		"gelguy/wilder.nvim",
		dependencies = { "romgrk/fzy-lua-native" },
		config = function()
			require("config.wilder")
		end,
	},
	{
		"Shatur/neovim-session-manager",
		config = function()
			require("session_manager").setup({
				autoload_mode = require("session_manager.config").AutoloadMode.Disabled,
			}) -- Possible values: Disabled, CurrentDir, LastSession
		end,
	},
	{
		"windwp/nvim-autopairs",
		config = true,
	},
	"voldikss/vim-floaterm",
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
	-- DAP
	{
		"rcarriga/nvim-dap-ui",
		config = function()
			require("dapui").setup()
		end,
		keys = {
			{ "<leader>dU", "<cmd>lua require'dapui'.toggle()<cr>", desc = "Toggle UI" },
		},
	},
	{
		"mfussenegger/nvim-dap",
		dependencies = {
			"williamboman/mason.nvim",
		},
		config = function()
			require("config.dap")
		end,
		keys = {
			{ "<leader>dR", "<cmd>lua require'dap'.run_to_cursor()<cr>", desc = "Run to Cursor" },
			{
				"<leader>dE",
				"<cmd>lua require'dapui'.eval(vim.fn.input '[Expression] > ')<cr>",
				desc = "Evaluate Input",
			},
			{
				"<leader>dC",
				"<cmd>lua require'dap'.set_breakpoint(vim.fn.input '[Condition] > ')<cr>",
				desc = "Conditional Breakpoint",
			},
			{ "<leader>db", "<cmd>lua require'dap'.step_back()<cr>", desc = "Step Back" },
			{ "<leader>dc", "<cmd>lua require'dap'.continue()<cr>", desc = "Continue" },
			{ "<leader>dd", "<cmd>lua require'dap'.disconnect()<cr>", desc = "Disconnect" },
			{ "<leader>de", "<cmd>lua require'dapui'.eval()<cr>", desc = "Evaluate" },
			{ "<leader>dg", "<cmd>lua require'dap'.session()<cr>", desc = "Get Session" },
			{ "<leader>dh", "<cmd>lua require'dap.ui.widgets'.hover()<cr>", desc = "Hover Variables" },
			{ "<leader>dS", "<cmd>lua require'dap.ui.widgets'.scopes()<cr>", desc = "Scopes" },
			{ "<leader>di", "<cmd>lua require'dap'.step_into()<cr>", desc = "Step Into" },
			{ "<leader>do", "<cmd>lua require'dap'.step_over()<cr>", desc = "Step Over" },
			{ "<leader>dp", "<cmd>lua require'dap'.pause.toggle()<cr>", desc = "Pause" },
			{ "<leader>dq", "<cmd>lua require'dap'.close()<cr>", desc = "Quit" },
			{ "<leader>dr", "<cmd>lua require'dap'.repl.toggle()<cr>", desc = "Toggle Repl" },
			{ "<leader>ds", "<cmd>lua require'dap'.continue()<cr>", desc = "Start" },
			{ "<leader>dt", "<cmd>lua require'dap'.toggle_breakpoint()<cr>", desc = "Toggle Breakpoint" },
			{ "<leader>dx", "<cmd>lua require'dap'.terminate()<cr>", desc = "Terminate" },
			{ "<leader>du", "<cmd>lua require'dap'.step_out()<cr>", desc = "Step Out" },
		},
	},
	{ "noahfrederick/vim-skeleton" },
	{
		"gnikdroy/projections.nvim",
		config = function()
			require("projections").setup({})

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
	-- LSP
	{
		"https://git.sr.ht/~whynothugo/lsp_lines.nvim",
		config = function()
			require("lsp_lines").setup()
			vim.diagnostic.config({
				virtual_text = false,
			})
		end,
	},
	{
		"themaxmarchuk/tailwindcss-colors.nvim",
		config = true,
	},
	{ "neovim/nvim-lspconfig" },
	{
		"williamboman/mason-lspconfig.nvim",
		dependencies = {
			"williamboman/mason.nvim",
			"neovim/nvim-lspconfig",
			"b0o/schemastore.nvim",
			"jay-babu/mason-nvim-dap.nvim",
			"SmiteshP/nvim-navic",
		},
		config = function()
			require("mason").setup()
			require("config.dap")
			require("mason-lspconfig").setup()
			require("nvim-navic").setup({ highlight = true })

			local capabilities = require("cmp_nvim_lsp").default_capabilities()

			require("lspconfig").sourcekit.setup({
				capabilities = capabilities,
			})

			require("mason-lspconfig").setup_handlers({
				-- The first entry (without a key) will be the default handler
				-- and will be called for each installed server that doesn't have
				-- a dedicated handler.
				function(server_name) -- default handler (optional)
					require("lspconfig")[server_name].setup({
						on_attach = function(client, bufnr)
							-- Attaches nvim-navic to the current lsp-server if possible
							if client.server_capabilities.documentSymbolProvider then
								require("nvim-navic").attach(client, bufnr)
							end
						end,
						capabilities = capabilities,
					})
				end,
				["tailwindcss"] = function()
					require("lspconfig").tailwindcss.setup({
						on_attach = function(client, bufnr)
							require("tailwindcss-colors").buf_attach(bufnr)
						end,
					})
				end,
				["jsonls"] = function()
					require("lspconfig").jsonls.setup({
						settings = {
							json = {
								schemas = require("schemastore").json.schemas(),
								validate = { enable = true },
							},
						},
						on_attach = function(client, bufnr)
							-- Attaches nvim-navic to the current lsp-server if possible
							if client.server_capabilities.documentSymbolProvider then
								require("nvim-navic").attach(client, bufnr)
							end
						end,
						capabilities = capabilities,
					})
				end,
			})
		end,
	},
	{
		"jose-elias-alvarez/null-ls.nvim",
		config = function()
			local null_ls = require("null-ls")
			local augroup = vim.api.nvim_create_augroup("LspFormatting", {})

			local formatting = null_ls.builtins.formatting
			local completion = null_ls.builtins.completion

			null_ls.setup({
				sources = {
					formatting.prettier,
					formatting.stylua,
					null_ls.builtins.code_actions.gitsigns,
					null_ls.builtins.formatting.cljstyle,
				},
				on_attach = function(client, bufnr)
					if client.supports_method("textDocument/formatting") then
						vim.api.nvim_clear_autocmds({ group = augroup, buffer = bufnr })
						vim.api.nvim_create_autocmd("BufWritePre", {
							group = augroup,
							buffer = bufnr,
							callback = function()
								vim.lsp.buf.format({ bufnr = bufnr })
							end,
						})
					end
				end,
			})
		end,
	},
	{
		"nvim-telescope/telescope.nvim",
		tag = "0.1.0",
		dependencies = {
			"nvim-lua/plenary.nvim",
			"nvim-telescope/telescope-ui-select.nvim",
			{ "nvim-telescope/telescope-fzf-native.nvim", build = "make" },
			{
				"nvim-telescope/telescope-frecency.nvim",
				dependencies = { "kkharji/sqlite.lua" },
			},
			{
				"LukasPietzschmann/telescope-tabs",
				config = function()
					require("telescope-tabs").setup({})
				end,
			},
		},
		config = function()
			local telescope = require("telescope")
			telescope.setup({
				defaults = {
					layout_config = {},
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
				},
			})

			telescope.load_extension("fzf")
			telescope.load_extension("ui-select")
			telescope.load_extension("frecency")
			telescope.load_extension("telescope-tabs")
			telescope.load_extension("refactoring")
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
	-- LSP-ish extensions
	{
		"rmagatti/goto-preview",
		config = true,
	},
	{
		"glepnir/lspsaga.nvim",
		event = "BufRead",
		opts = {
			lightbulb = {
				sign = false,
			},
			finder = {
				width = 100,
			},
		},
		keys = {
			{ "K", "<cmd>Lspsaga hover_doc<cr>", desc = "Show Doc on Hover" },
			{ "<leader>lf", "<cmd>Lspsaga lsp_finder<cr>", desc = "Show Definitions and References" },
			{ "<leader>sc", "<cmd>Lspsaga rename<cr>", desc = "Rename Symbol" },
			{ "<leader>lr", "<cmd>Lspsaga rename<cr>", desc = "Rename Symbol" },
			{ "<leader>ld", "<cmd>Lspsaga peek_definition<cr>", desc = "Peek Definition" },
			{ "<leader>lD", "<cmd>Lspsaga goto_definition<cr>", desc = "Goto Definition" },
			{ "[e", "<cmd>Lspsaga diagnostic_jump_next<cr>zz", desc = "Jumpt to next Issue" },
			{ "]e", "<cmd>Lspsaga diagnostic_jump_prev<cr>", desc = "Jumpt to prev Issue" },
		},
	},
	{
		"weilbith/nvim-code-action-menu",
		cmd = "CodeActionMenu",
	},
	-- CMP
	{ "onsails/lspkind.nvim" },
	{
		"hrsh7th/nvim-cmp",
		dependencies = {
			{
				"L3MON4D3/LuaSnip",
				dependencies = { "rafamadriz/friendly-snippets" },
				name = "luasnip",
				config = function()
					local lazyLoad = require("luasnip.loaders.from_vscode").lazy_load
					lazyLoad()
					lazyLoad({ paths = { "./snippets" } })
				end,
			},
			"hrsh7th/cmp-nvim-lsp",
			"hrsh7th/cmp-buffer",
			"hrsh7th/cmp-path",
			"hrsh7th/cmp-nvim-lua",
			{
				"tzachar/cmp-tabnine",
				build = "./install.sh",
				config = function() end,
			},
			{
				"KadoBOT/cmp-plugins",
				config = function()
					require("cmp-plugins").setup({
						files = { ".*\\.lua" },
					})
				end,
			},
			"lukas-reineke/cmp-under-comparator",
			"saadparwaiz1/cmp_luasnip",
		},
		config = function()
			require("config.cmp")
		end,
	},

	{
		"nvim-treesitter/nvim-treesitter",
		dependencies = {
			"nvim-treesitter/nvim-treesitter-textobjects",
			"p00f/nvim-ts-rainbow",
			"windwp/nvim-ts-autotag",
		},
		config = function()
			require("config.ts")
		end,
	},
	{
		"danymat/neogen",
		dependencies = "nvim-treesitter/nvim-treesitter",
		config = true,
	},
}

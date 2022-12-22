return {
	-- THEMES
	{
		"catppuccin/nvim",
		name = "catppuccin",
		config = function()
			require("catppuccin").setup({
				integrations = {
					fidget = true,
					lsp_saga = true,
					navic = {
						enabled = true,
						custom_bg = "NONE",
					},
				},
			})
		end,
	},
	-- UI
	{
		"nvim-neo-tree/neo-tree.nvim",
		branch = "v2.x",
		dependencies = { "nvim-lua/plenary.nvim", "nvim-tree/nvim-web-devicons", "MunifTanjim/nui.nvim" },
		config = function()
			require("neo-tree").setup({
				enable_git_status = true,
				close_if_last_window = true,
				enable_diagnostics = true,
				buffers = {
					follow_current_file = true,
					group_empty_dirs = true,
				},
				filesystem = {
					follow_current_file = true,
					group_empty_dirs = true,
				},
			})
		end,
	},
	{
		"folke/which-key.nvim",
		config = function()
			require("which-key").setup({
				plugins = {
					spelling = { enabled = true },
					presets = { operators = false },
				},
				window = {
					border = "rounded",
					padding = { 2, 2, 2, 2 },
				},
				disable = { filetypes = { "TelescopePrompt" } },
			})
		end,
	},
	{
		"lukas-reineke/indent-blankline.nvim",
		config = function()
			require("indent_blankline").setup({
				show_current_context = true,
				show_current_context_start = true,
			})
		end,
	},
	{
		"goolord/alpha-nvim",
		config = function()
			require("alpha").setup(require("alpha.themes.startify").config)
		end,
	},
	{
		"rcarriga/nvim-notify",
		config = function()
			vim.notify = require("notify")
		end,
	},
	{
		"lewis6991/gitsigns.nvim",
		config = function()
			require("gitsigns").setup()
		end,
	},
	{
		"akinsho/bufferline.nvim",
		dependencies = { "nvim-tree/nvim-web-devicons", "tiagovla/scope.nvim" },
		config = function()
			require("config.bufferline")
		end,
	},
	{ "famiu/bufdelete.nvim" },
	{
		"kylechui/nvim-surround",
		config = function()
			require("nvim-surround").setup({})
		end,
	},
	-- UTILS
	{
		"nguyenvukhang/nvim-toggler",
		config = function()
			require("nvim-toggler").setup({ remove_default_keybinds = true })
		end,
	},
	{
		"numToStr/Comment.nvim",
		config = function()
			require("Comment").setup({})
		end,
	},
	{
		"gelguy/wilder.nvim",
		dependencies = { "romgrk/fzy-lua-native" },
		config = function()
			local wilder = require("wilder")
			wilder.setup({
				modes = { ":", "/", "?" },
			})
			wilder.set_option(
				"renderer",
				wilder.popupmenu_renderer({
					highlighter = {
						wilder.lua_pcre2_highlighter(), -- requires `luarocks install pcre2`
						wilder.lua_fzy_highlighter(), -- requires fzy-lua-native vim plugin found
					},
				})
			)
		end,
	},
	{
		"Shatur/neovim-session-manager",
		config = function()
			require("session_manager").setup({
				autoload_mode = require("session_manager.config").AutoloadMode.CurrentDir,
			}) -- Possible values: Disabled, CurrentDir, LastSession
		end,
	},
	{
		"windwp/nvim-autopairs",
		config = function()
			require("nvim-autopairs").setup({})
		end,
	},
	"voldikss/vim-floaterm",
	{
		"feline-nvim/feline.nvim",
		config = function()
			require("config.statusline")
		end,
	},
	-- {
	--     "glepnir/galaxyline.nvim",
	--     config = function()
	--         require("config.statusline")
	--     end,
	-- },
	{
		"j-hui/fidget.nvim",
		config = function()
			require("fidget").setup({
				window = {
					blend = 0,
				},
			})
		end,
	},
	"VonHeikemen/searchbox.nvim",
	-- LSP
	{ "neovim/nvim-lspconfig" },
	{
		"williamboman/mason-lspconfig.nvim",
		dependencies = {
			"williamboman/mason.nvim",
			"neovim/nvim-lspconfig",
			"b0o/schemastore.nvim",
			"SmiteshP/nvim-navic",
		},
		config = function()
			require("mason").setup()
			require("mason-lspconfig").setup()
			require("nvim-navic").setup({ highlight = true })

			local capabilities = require("cmp_nvim_lsp").default_capabilities()
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
					completion.spell,
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
			"cljoly/telescope-repo.nvim",
			"nvim-telescope/telescope-node-modules.nvim",
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
				extensions = {
					["ui-select"] = {
						require("telescope.themes").get_dropdown({}),
					},
				},
			})

			telescope.load_extension("ui-select")
			telescope.load_extension("repo")
			telescope.load_extension("node_modules")
			telescope.load_extension("frecency")
			telescope.load_extension("telescope-tabs")
		end,
	},
	-- LSP-ish extensions
	{
		"rmagatti/goto-preview",
		config = function()
			require("goto-preview").setup({})
		end,
	},
	{
		"glepnir/lspsaga.nvim",
		branch = "main",
		config = function()
			local saga = require("lspsaga")

			saga.init_lsp_saga({
				custom_kind = require("catppuccin.groups.integrations.lsp_saga").custom_kind(),
			})
		end,
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
}

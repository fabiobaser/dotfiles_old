vim.api.nvim_create_autocmd("BufWritePost", {
    group = vim.api.nvim_create_augroup("PACKER", { clear = true }),
    pattern = "plugins.lua",
    command = "source <afile> | PackerCompile",
})

return require("packer").startup({
    function(use)
        -- Package Manager
        use({ "wbthomason/packer.nvim" })

        -- {{{ THEMES
        use({
            "catppuccin/nvim",
            as = "catppuccin",
            config = function()
                require("catppuccin").setup({ integrations = { fidget = true, lsp_saga = true } })
            end,
        })
        use({ "navarasu/onedark.nvim" })
        -- }}}

        -- {{{ LSP
        use({
            "williamboman/mason.nvim",
            config = function()
                require("mason").setup()
            end,
        })

        use({
            "williamboman/mason-lspconfig.nvim",
            config = function()
                require("mason-lspconfig").setup()

                require("mason-lspconfig").setup_handlers({
                    -- The first entry (without a key) will be the default handler
                    -- and will be called for each installed server that doesn't have
                    -- a dedicated handler.
                    function(server_name) -- default handler (optional)
                        require("lspconfig")[server_name].setup({})
                    end,
                    -- Next, you can provide a dedicated handler for specific servers.
                    -- For example, a handler override for the `rust_analyzer`:
                    ["rust_analyzer"] = function()
                        require("rust-tools").setup({})
                    end,
                })
            end,
        })
        use({ "neovim/nvim-lspconfig" })
        use({ "onsails/lspkind.nvim" })
        use({
            "glepnir/lspsaga.nvim",
            branch = "main",
            config = function()
                local saga = require("lspsaga")

                saga.init_lsp_saga({
                    custom_kind = require("catppuccin.groups.integrations.lsp_saga").custom_kind(),
                })
            end,
        })
        -- }}}

        -- Syntax and Code
        use({
            "m-demare/hlargs.nvim",
            config = function()
                require("hlargs").setup()
            end,
        })
        -- GeneralUI
        use({ "nvim-tree/nvim-web-devicons" })
        use({
            "lewis6991/gitsigns.nvim",
            config = function()
                require("gitsigns").setup()
            end,
        })

        -- Window / Buffer Management
        use({ "famiu/bufdelete.nvim" })
        use({ "rcarriga/nvim-notify" })
        use({ "j-morano/buffer_manager.nvim" })
        use({
            "onsails/diaglist.nvim",
            config = function()
                require("diaglist").init({ debug = false })
            end,
        })
        use({
            "kylechui/nvim-surround",
            config = function()
                require("nvim-surround").setup({})
            end,
        })

        use({
            "Shatur/neovim-session-manager",
            config = function()
                require("session_manager").setup({
                    autoload_mode = require("session_manager.config").AutoloadMode.Disabled,
                })
            end,
        })

        use({
            "goolord/alpha-nvim",
            config = function()
                require("alpha").setup(require("alpha.themes.startify").config)
            end,
        })

        use({
            "windwp/nvim-autopairs",
            config = function()
                require("nvim-autopairs").setup({})
            end,
        })

        use({
            "numToStr/Comment.nvim",
            config = function()
                require("Comment").setup({})
            end,
        })

        use("voldikss/vim-floaterm")

        use({
            "rmagatti/goto-preview",
            config = function()
                require("goto-preview").setup({})
            end,
        })

        use({
            "nvim-telescope/telescope.nvim",
            tag = "0.1.0",
            requires = { { "nvim-lua/plenary.nvim" } },
            config = function()
                require("telescope").setup({
                    extensions = {
                        ["ui-select"] = {
                            require("telescope.themes").get_dropdown({}),
                        },
                    },
                })

                require("telescope").load_extension("ui-select")
            end,
        })

        use({ "nvim-telescope/telescope-ui-select.nvim" })

        use({
            "feline-nvim/feline.nvim",
            after = "catppuccin",
            config = function()
                local ctp_feline = require("catppuccin.groups.integrations.feline")

                require("feline").setup({
                    components = ctp_feline.get(),
                })
            end,
        })
        use({
            "j-hui/fidget.nvim",
            config = function()
                require("fidget").setup({
                    window = {
                        blend = 0,
                    },
                })
            end,
        })

        use({
            "L3MON4D3/LuaSnip",
            tag = "v<CurrentMajor>.*",
            config = function()
                local lazyLoad = require("luasnip.loaders.from_vscode").lazy_load
                lazyLoad()
                lazyLoad({ paths = { "./snippets" } })
            end,
        })

        use("rafamadriz/friendly-snippets")

        use({
            "lukas-reineke/indent-blankline.nvim",
            config = function()
                require("indent_blankline").setup()
            end,
        })

        use({
            "nvim-neo-tree/neo-tree.nvim",
            branch = "v2.x",
            requires = {
                "nvim-lua/plenary.nvim",
                "MunifTanjim/nui.nvim",
            },
            config = function()
                require("neo-tree").setup({
                    close_if_last_window = true,
                    enable_git_status = true,
                    enable_diagnostics = true,
                })
            end,
        })

        use({
            "akinsho/bufferline.nvim",
            tag = "v3.*",
            requires = "nvim-tree/nvim-web-devicons",
            config = function()
                require("bufferline").setup({
                    options = {
                        diagnostics = "nvim_lsp",
                        diagnostics_indicator = function(count, level)
                            local icon = level:match("error") and " " or " "
                            return " " .. icon .. count
                        end,
                    },
                })
            end,
        })

        use({
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
        })

        use({
            "nvim-treesitter/nvim-treesitter",
            run = function()
                local ts_update = require("nvim-treesitter.install").update({ with_sync = true })
                ts_update()
            end,
            config = function()
                require("nvim-treesitter.configs").setup({
                    textobjects = {
                        select = {
                            enables = true,
                            lookahead = true,
                            keymaps = {
                                -- You can use the capture groups defined in textobjects.scm
                                ["af"] = "@function.outer",
                                ["if"] = "@function.inner",
                                ["ac"] = "@class.outer",
                                -- You can optionally set descriptions to the mappings (used in the desc parameter of
                                -- nvim_buf_set_keymap) which plugins like which-key display
                                ["ic"] = { query = "@class.inner", desc = "Select inner part of a class region" },
                            },
                        },
                    },
                    context_commentstring = {
                        enable = true,
                        enable_autocmd = false,
                    },
                    rainbow = {
                        enable = true,
                        disable = { "html" },
                        extended_mode = false,
                        max_file_lines = nil,
                    },
                    autotag = {
                        enable = true,
                    },
                    incremental_selection = {
                        enable = true,
                    },
                    indent = {
                        enable = true,
                    },
                })
            end,
        })

        use({ "nvim-treesitter/nvim-treesitter-textobjects" })

        use({
            "p00f/nvim-ts-rainbow",
            after = "nvim-treesitter",
        })

        use({
            "windwp/nvim-ts-autotag",
            after = "nvim-treesitter",
        })

        use({
            "jose-elias-alvarez/null-ls.nvim",
            config = function()
                local null_ls = require("null-ls")
                local augroup = vim.api.nvim_create_augroup("LspFormatting", {})

                null_ls.setup({
                    sources = {
                        null_ls.builtins.formatting.stylua,
                        null_ls.builtins.completion.spell,
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
        })

        use({
            "hrsh7th/nvim-cmp",
            event = "InsertEnter",
            config = function()
                require("fabiobaser.configs.cmp")
            end,
        })
        use({ "saadparwaiz1/cmp_luasnip", after = "nvim-cmp" })

        use({
            "hrsh7th/cmp-nvim-lsp",
            after = "nvim-cmp",
        })

        use({
            "hrsh7th/cmp-path",
            after = "nvim-cmp",
        })

        use({
            "David-Kunz/cmp-npm",
            after = "nvim-cmp",
            config = function()
                require("cmp-npm").setup()
            end,
        })

        use({
            "SmiteshP/nvim-gps",
            config = function()
                require("nvim-gps").setup()
            end,
        })
    end,
    config = {
        display = {
            open_fn = function()
                return require("packer.util").float({ border = "single" })
            end,
        },
    },
})

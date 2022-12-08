vim.api.nvim_create_autocmd("BufWritePost", {
    group = vim.api.nvim_create_augroup("PACKER", { clear = true }),
    pattern = "plugins.lua",
    command = "source <afile> | PackerCompile",
})

return require("packer").startup({
    function(use)
        -- Package Manager
        use({ "wbthomason/packer.nvim" })
        -- Themes
        use({ "catppuccin/nvim", as = "catppuccin" })
        use({ "navarasu/onedark.nvim" })
        -- General UI
        -- Window / Buffer Management
        use({"famiu/bufdelete.nvim"})
        use({ "rcarriga/nvim-notify" })
        use({ "j-morano/buffer_manager.nvim" })
        use({ "onsails/lspkind.nvim" })
        use({ "onsails/diaglist.nvim",
            config = function()
                require("diaglist").init({ debug = false })
            end,
        })
        use({
            "kylechui/nvim-surround",
            tag = "*", -- Use for stability; omit to use `main` branch for the latest features
            config = function()
                require("nvim-surround").setup({
                    -- Configuration here, or leave empty to use defaults
                })
            end,
        })

        use({
            "Shatur/neovim-session-manager",
            config = function()
                require("session_manager").setup({
                    autoload_mode = require("session_manager.config").AutoloadMode.CurrentDir,
                })
            end,
        })

        use({
            "goolord/alpha-nvim",
            config = function()
                require("alpha").setup(require("alpha.themes.dashboard").config)
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
                require("Comment").setup()
            end,
        })

        use({
            "akinsho/toggleterm.nvim",
            config = function()
                require("fabiobaser.configs.toggleterm")
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
            "nvim-lualine/lualine.nvim",
            event = "BufEnter",
            config = function()
                require("lualine").setup()
            end,
        })

        use({
            "j-hui/fidget.nvim",
            after = "lualine.nvim",
            config = function()
                require("fidget").setup()
            end,
        })

        use({
            "L3MON4D3/LuaSnip",
            tag = "v<CurrentMajor>.*",
        })

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
                "nvim-tree/nvim-web-devicons", -- not strictly required, but recommended
                "MunifTanjim/nui.nvim",
            },
        })

        use({
            "akinsho/bufferline.nvim",
            tag = "v3.*",
            requires = "nvim-tree/nvim-web-devicons",
            config = function()
                require("bufferline").setup({})
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
            "neovim/nvim-lspconfig",
            opt = true,
            event = "BufReadPre",
            wants = { "nvim-lsp-installer" },
            config = function()
                require("config.lsp").setup()
            end,
            requires = {
                "williamboman/nvim-lsp-installer",
            },
        })

        use({
            "hrsh7th/nvim-cmp",
            event = "InsertEnter",
            config = function()
                require("fabiobaser.configs.cmp")
            end,
        })

        use({
            "hrsh7th/cmp-nvim-lsp",
            after = "nvim-cmp",
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

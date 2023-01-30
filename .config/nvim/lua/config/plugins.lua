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
        "yamatsum/nvim-nonicons",
        dependencies = { "kyazdani42/nvim-web-devicons" },
        config = function()
            require("config.icons")
        end,
    },
    {
        "anuvyklack/windows.nvim",
        dependencies = {
            "anuvyklack/middleclass",
            "anuvyklack/animation.nvim",
        },
        config = function()
            vim.o.winwidth = 30
            vim.o.winminwidth = 30
            vim.o.equalalways = false
            require("windows").setup()
        end,
    },
    {
        "nvim-neo-tree/neo-tree.nvim",
        branch = "v2.x",
        dependencies = { "nvim-lua/plenary.nvim", "MunifTanjim/nui.nvim" },
        config = function()
            require("neo-tree").setup({
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
        "folke/todo-comments.nvim",
        config = function()
            require("todo-comments").setup({})
        end,
    },
    {
        "folke/trouble.nvim",
        config = function()
            require("trouble").setup({})
        end,
        keys = {
            { "<leader>lt", "<cmd>TroubleToggle<cr>", desc = "Toggle Diagnostics Window" },
        },
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
        config = function()
            require("gitsigns").setup()
        end,
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
        config = function()
            require("nvim-surround").setup({})
        end,
    },
    -- UTILS
    {
        "aserowy/tmux.nvim",
        config = function()
            require("tmux").setup()
        end,
    },
    {
        "stevearc/stickybuf.nvim",
        config = function()
            require("stickybuf").setup({
                buftype = {
                    terminal = "buftype",
                },
            })
        end,
    },
    {
        "akinsho/toggleterm.nvim",
        config = function()
            require("toggleterm").setup()
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
        "nvim-neotest/neotest",
        config = function()
            require("neotest").setup({
                adapters = {
                    require("neotest-vitest"),
                },
            })
        end,
        dependencies = {
            "antoinemadec/FixCursorHold.nvim",
            "marilari88/neotest-vitest",
        },
        keys = {
            {
                "<leader>Tr",
                function()
                    require("neotest").run.run()
                end,
                desc = "Runs nearest Test",
            },
            {
                "<leader>TR",
                function()
                    require("neotest").run.run(vim.fn.expand("%"))
                end,
                desc = "Runs the current File",
            },
            {
                "<leader>Td",
                function()
                    require("neotest").run.run({ strategy = "dap" })
                end,
                desc = "Debug nearest Test",
            },
            {
                "<leader>Ts",
                function()
                    require("neotest").run.stop()
                end,
                desc = "Stop nearest Test",
            },
            {
                "<leader>Ta",
                function()
                    require("neotest").run.attach()
                end,
                desc = "Attach to nearest Test",
            },
        },
    },
    {
        "ggandor/leap.nvim",
        dependencies = { "tpope/vim-repeat" },
        config = function()
            require("leap").add_default_mappings()
        end,
    },
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
    -- {
    --     "gelguy/wilder.nvim",
    --     dependencies = { "romgrk/fzy-lua-native" },
    --     config = function()
    --         local wilder = require("wilder")
    --         wilder.setup({
    --             modes = { ":", "/", "?" },
    --         })
    --         wilder.set_option(
    --             "renderer",
    --             wilder.popupmenu_renderer({
    --                 highlighter = {
    --                     wilder.lua_pcre2_highlighter(), -- requires `luarocks install pcre2`
    --                     wilder.lua_fzy_highlighter(), -- requires fzy-lua-native vim plugin found
    --                 },
    --             })
    --         )
    --     end,
    -- },
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
    "shortcuts/no-neck-pain.nvim",
    "vimpostor/vim-tpipeline",
    "rajasegar/vim-pnpm",
    -- "VonHeikemen/searchbox.nvim",
    { "noahfrederick/vim-skeleton" },
    -- LSP
    {
        "folke/noice.nvim",
        config = function()
            require("noice").setup({
                cmdline = {
                    enabled = true,
                    view = "cmdline_popup",
                },
                notify = {
                    enabled = false,
                },
            })
        end,
    },
    {
        "https://git.sr.ht/~whynothugo/lsp_lines.nvim",
        config = function()
            require("lsp_lines").setup()
            vim.diagnostic.config({
                virtual_text = false,
            })
        end,
    },
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
            { "nvim-telescope/telescope-fzf-native.nvim", build = "make" },
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
        event = "BufRead",
        config = function()
            local saga = require("lspsaga")
            saga.setup({})
        end,
        keys = {
            { "K", "<cmd>Lspsaga hover_doc<cr>", desc = "Show Doc on Hover" },
            { "<leader>sc", "<cmd>Lspsaga rename<cr>", desc = "Rename Symbol" },
            { "<leader>lr", "<cmd>Lspsaga rename<cr>", desc = "Rename Symbol" },
            { "<leader>ld", "<cmd>Lspsaga peek_definition<cr>", desc = "Peek Definition" },
            { "<leader>lD", "<cmd>Lspsaga goto_definition<cr>", desc = "Goto Definition" },
            { "[e", "<cmd>Lspsaga diagnostic_jump_next<cr>", desc = "Jumpt to next Issue" },
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

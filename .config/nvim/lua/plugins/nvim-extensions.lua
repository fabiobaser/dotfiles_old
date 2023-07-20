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
        tag = "0.1.0",
        dependencies = {
            "nvim-lua/plenary.nvim",
            "nvim-telescope/telescope-ui-select.nvim",
            { "nvim-telescope/telescope-fzf-native.nvim",  build = "make" },
            { "nvim-telescope/telescope-file-browser.nvim" },
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
                    file_browser = {
                        hijack_netrw = true,
                    },
                },
            })

            telescope.load_extension("fzf")
            telescope.load_extension("ui-select")
            telescope.load_extension("frecency")
            telescope.load_extension("telescope-tabs")
            telescope.load_extension("refactoring")
            telescope.load_extension("file_browser")
        end,
        keys = {
            { "<leader>ff", "<CMD>Telescope find_files<CR>",             desc = "Search for Files" },
            { "<leader>fg", "<CMD>Telescope live_grep<CR>",              desc = "Search for Word" },
            { "<leader>fb", "<CMD>Telescope buffers<CR>",                desc = "Search Buffers" },
            { "<leader>fh", "<CMD>Telescope highlights<CR>",             desc = "Search Highlight Groups" },
            { "<leader>fH", "<CMD>Telescope help_tags<CR>",              desc = "Search Help Tags" },
            { "<leader>fR", "<CMD>Telescope frecency<CR>",               desc = "Search recent files" },
            { "<leader>fr", "<CMD>Telescope frecency workspace=CWD<CR>", desc = "Search recent files in CWD" },
            {
                "<leader>fe",
                "<CMD>Telescope file_browser path=%:p:h select_buffer=true<CR>",
                desc = "Open Telescope File Browser",
            },
        },
    },
    {
        "max397574/better-escape.nvim",
        opts = { mappings = { "jk" } },
    },
}

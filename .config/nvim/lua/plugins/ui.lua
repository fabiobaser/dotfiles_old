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
        "willothy/nvim-cokeline",
        lazy = false,
        config = function()
            local is_picking_focus = require("cokeline.mappings").is_picking_focus
            local is_picking_close = require("cokeline.mappings").is_picking_close
            local palette = require("catppuccin.palettes").get_palette("mocha")

            require("cokeline").setup({
                default_hl = {
                    fg = function(buf)
                        return buf.is_focused and palette.base or palette.text
                    end,
                    bg = function(buf)
                        return buf.is_focused and palette.subtext1 or palette.base
                    end,
                },
                sidebar = {
                    filetype = "neo-tree",
                    components = {
                        {
                            text = "    Fabio's Neovim",
                            fg = function(buf)
                                return buf.is_focused and palette.base or palette.text
                            end,
                            bg = function(buf)
                                return buf.is_focused and palette.text or palette.base
                            end,
                            style = "bold",
                        },
                    },
                },
                components = {
                    { text = "  " },
                    {
                        text = function(buffer)
                            return (is_picking_focus() or is_picking_close()) and buffer.pick_letter .. " "
                                or buffer.devicon.icon
                        end,
                        fg = function(buffer)
                            return (is_picking_focus() and palette.peach)
                                or (is_picking_close() and palette.red)
                                or buffer.devicon.color
                        end,
                        style = function(_)
                            return (is_picking_focus() or is_picking_close()) and "italic,bold" or nil
                        end,
                    },
                    {
                        text = function(buffer)
                            return buffer.filename
                        end,
                        style = "italic",
                    },

                    {
                        text = function(buffer)
                            return buffer.is_modified and " *" or ""
                        end,
                    },
                    { text = "  " },
                },
            })
        end,
        keys = {
            {
                "<S-h>",
                function()
                    require("cokeline.mappings").by_step("focus", -1)
                end,
            },
            {
                "<S-l>",
                function()
                    require("cokeline.mappings").by_step("focus", 1)
                end,
            },
            {
                "<leader>xf",
                function()
                    require("cokeline.mappings").pick("focus")
                end,
            },
            {
                "<leader>xc",
                function()
                    require("cokeline.mappings").pick("close")
                end,
            },
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
        "feline-nvim/feline.nvim",
        config = function()
            require("config.statusline")
        end,
    },
    {
        "j-hui/fidget.nvim",
        branch = "legacy",
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

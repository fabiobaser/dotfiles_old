return {
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
            { "<leader>o", "<CMD>Neotree focus<CR>",  desc = "Focus Explorer" },
        },
    },
}

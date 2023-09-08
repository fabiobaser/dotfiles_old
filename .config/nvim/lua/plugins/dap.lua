return {
    {
        "rcarriga/nvim-dap-ui",
        config = function()
            require("dapui").setup({
                layout = {

                    elements = { "console" },
                    size = 0.25, -- 25% of total lines
                    position = "bottom",
                },
            })
        end,
        keys = {
            { "<leader>dU", "<cmd>lua require'dapui'.toggle()<cr>", desc = "Toggle UI" },
        },
    },
    {
        "mfussenegger/nvim-dap",
        dependencies = {
            {
                "rcarriga/nvim-dap-ui",
                config = function()
                    require("dapui").setup()
                end,
                keys = {
                    { "<leader>dU", "<cmd>lua require'dapui'.toggle()<cr>", desc = "Toggle UI" },
                },
            },
        },
        config = function()
            local dap = require("dap")
            local masonPackagePath = "/Users/fabiobaser/.local/share/nvim/mason/bin/"

            dap.adapters.node2 = {
                type = "executable",
                command = masonPackagePath .. "node-debug2-adapter",
            }
            dap.adapters.chrome = {
                type = "executable",
                command = masonPackagePath .. "chrome-debug-adapter",
            }
            dap.configurations.javascript = {
                {
                    name = "Launch",
                    type = "node2",
                    request = "launch",
                    program = "${file}",
                    cwd = vim.fn.getcwd(),
                    sourceMaps = true,
                    protocol = "inspector",
                    console = "integratedTerminal",
                },
                {
                    -- For this to work you need to make sure the node process is started with the `--inspect` flag.
                    name = "Attach to process",
                    type = "node2",
                    request = "attach",
                    processId = require("dap.utils").pick_process,
                },
                {
                    name = "Chrome: Debug",
                    type = "chrome",
                    request = "attach",
                    program = "${file}",
                    cwd = vim.fn.getcwd(),
                    sourceMaps = true,
                    protocol = "inspector",
                    port = 9222,
                    webRoot = "${workspaceFolder}",
                },
                {
                    type = "chrome",
                    request = "launch",
                    -- name of the debug action
                    name = "Launch Chrome :1234",
                    -- default vite dev server url
                    url = "http://localhost:1234",
                    -- for TypeScript/Svelte
                    sourceMaps = true,
                    webRoot = "${workspaceFolder}/src",
                    protocol = "inspector",
                    port = 9222,
                    -- skip files from vite's hmr
                    skipFiles = { "**/node_modules/**/*", "**/@vite/*", "**/src/client/*", "**/src/*" },
                },
                {
                    type = "chrome",
                    request = "launch",
                    -- name of the debug action
                    name = "Launch Chrome :3000",
                    -- default vite dev server url
                    url = "http://localhost:3000",
                    -- for TypeScript/Svelte
                    sourceMaps = true,
                    webRoot = "${workspaceFolder}/src",
                    protocol = "inspector",
                    port = 9222,
                    -- skip files from vite's hmr
                    skipFiles = { "**/node_modules/**/*", "**/@vite/*", "**/src/client/*", "**/src/*" },
                },
            }
            dap.configurations.typescript = dap.configurations.javascript
            dap.configurations.typescriptreact = dap.configurations.javascript
            dap.configurations.javascriptreact = dap.configurations.javascript

            local dapui = require("dapui")
            dap.listeners.after.event_initialized["dapui_config"] = function()
                dapui.open()
            end
            dap.listeners.before.event_terminated["dapui_config"] = function()
                dapui.close()
            end
            dap.listeners.before.event_exited["dapui_config"] = function()
                dapui.close()
            end
        end,
        keys = {
            { "<leader>dR", "<cmd>lua require'dap'.run_to_cursor()<cr>",     desc = "Run to Cursor" },
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
            { "<leader>db", "<cmd>lua require'dap'.step_back()<cr>",         desc = "Step Back" },
            { "<leader>dc", "<cmd>lua require'dap'.continue()<cr>",          desc = "Continue" },
            { "<leader>dd", "<cmd>lua require'dap'.disconnect()<cr>",        desc = "Disconnect" },
            { "<leader>de", "<cmd>lua require'dapui'.eval()<cr>",            desc = "Evaluate" },
            { "<leader>dg", "<cmd>lua require'dap'.session()<cr>",           desc = "Get Session" },
            { "<leader>dh", "<cmd>lua require'dap.ui.widgets'.hover()<cr>",  desc = "Hover Variables" },
            { "<leader>dS", "<cmd>lua require'dap.ui.widgets'.scopes()<cr>", desc = "Scopes" },
            { "<leader>di", "<cmd>lua require'dap'.step_into()<cr>",         desc = "Step Into" },
            { "<leader>do", "<cmd>lua require'dap'.step_over()<cr>",         desc = "Step Over" },
            { "<leader>dp", "<cmd>lua require'dap'.pause.toggle()<cr>",      desc = "Pause" },
            { "<leader>dq", "<cmd>lua require'dap'.close()<cr>",             desc = "Quit" },
            { "<leader>dr", "<cmd>lua require'dap'.repl.toggle()<cr>",       desc = "Toggle Repl" },
            { "<leader>ds", "<cmd>lua require'dap'.continue()<cr>",          desc = "Start" },
            { "<leader>dt", "<cmd>lua require'dap'.toggle_breakpoint()<cr>", desc = "Toggle Breakpoint" },
            { "<leader>dx", "<cmd>lua require'dap'.terminate()<cr>",         desc = "Terminate" },
            { "<leader>du", "<cmd>lua require'dap'.step_out()<cr>",          desc = "Step Out" },
        },
    },
}

local icons = require("nvim-nonicons")
local get = icons.get

local icons = {
	[".prettierrc"] = {
		icon = get("prettier"),
	},
	[".prettierignore"] = {
		icon = get("prettier"),
	},
	["project.json"] = {
		icon = "",
		name = "Nx",
	},
	["nx.json"] = {
		icon = "",
		color = "#519aba",
		name = "Nx",
	},
	[".eslintrc.json"] = {
		icon = "",
		color = "#519aba",
		name = "Eslint",
	},
	[".editorconfig"] = {
		icon = "",
		name = "Editorconfig",
	},
	["babel.config.json"] = {
		icon = "",
		color = "#cbcb41",
		name = "Babelrc",
	},
	["babel.config.js"] = {
		icon = "",
		name = "Babelrc",
	},
	[".babelrc.json"] = {
		icon = "",
		name = "Babelrc",
	},
	[".babelrc.js"] = {
		icon = "",
	},
	[".babelrc"] = {
		icon = "",
		color = "#cbcb41",
		cterm_color = "185",
		name = "Babelrc",
	},
	[".bash_profile"] = {
		icon = "",
		color = "#89e051",
		cterm_color = "113",
		name = "BashProfile",
	},
	[".bashrc"] = {
		icon = "",
		color = "#89e051",
		cterm_color = "113",
		name = "Bashrc",
	},
	[".DS_Store"] = {
		icon = "",
		color = "#41535b",
		cterm_color = "59",
		name = "DsStore",
	},
	[".gitattributes"] = {
		icon = "",
		color = "#41535b",
		cterm_color = "59",
		name = "GitAttributes",
	},
	[".gitconfig"] = {
		icon = "",
		color = "#41535b",
		cterm_color = "59",
		name = "GitConfig",
	},
	[".gitignore"] = {
		icon = "",
		color = "#41535b",
		cterm_color = "59",
		name = "GitIgnore",
	},
	[".gitlab-ci.yml"] = {
		icon = "",
		color = "#e24329",
		cterm_color = "166",
		name = "GitlabCI",
	},
	[".gitmodules"] = {
		icon = "",
		color = "#41535b",
		cterm_color = "59",
		name = "GitModules",
	},
	[".gvimrc"] = {
		icon = "",
		color = "#019833",
		cterm_color = "29",
		name = "Gvimrc",
	},
	[".npmignore"] = {
		icon = "",
		color = "#E8274B",
		cterm_color = "161",
		name = "NPMIgnore",
	},
	[".npmrc"] = {
		icon = "",
		color = "#E8274B",
		cterm_color = "161",
		name = "NPMrc",
	},
	[".settings.json"] = {
		icon = "",
		color = "#854CC7",
		cterm_color = "98",
		name = "SettingsJson",
	},
	[".vimrc"] = {
		icon = "",
		color = "#019833",
		cterm_color = "29",
		name = "Vimrc",
	},
	[".zprofile"] = {
		icon = "",
		color = "#89e051",
		cterm_color = "113",
		name = "Zshprofile",
	},
	[".zshenv"] = {
		icon = "",
		color = "#89e051",
		cterm_color = "113",
		name = "Zshenv",
	},
	[".zshrc"] = {
		icon = "",
		color = "#89e051",
		cterm_color = "113",
		name = "Zshrc",
	},
	["Brewfile"] = {
		icon = "🍺",
		color = "#701516",
		cterm_color = "52",
		name = "Brewfile",
	},
	["CMakeLists.txt"] = {
		icon = "",
		color = "#6d8086",
		cterm_color = "66",
		name = "CMakeLists",
	},
	["COMMIT_EDITMSG"] = {
		icon = "",
		color = "#41535b",
		cterm_color = "59",
		name = "GitCommit",
	},
	["Containerfile"] = {
		icon = "",
		color = "#384d54",
		cterm_color = "59",
		name = "Dockerfile",
	},
	["COPYING"] = {
		icon = "",
		color = "#cbcb41",
		cterm_color = "185",
		name = "License",
	},
	["COPYING.LESSER"] = {
		icon = "",
		color = "#cbcb41",
		cterm_color = "185",
		name = "License",
	},
	["Dockerfile"] = {
		icon = "",
		color = "#384d54",
		cterm_color = "59",
		name = "Dockerfile",
	},
	["Gemfile$"] = {
		icon = "💎",
		color = "#701516",
		cterm_color = "52",
		name = "Gemfile",
	},
	["LICENSE"] = {
		icon = "",
		color = "#d0bf41",
		cterm_color = "179",
		name = "License",
	},
	["R"] = {
		icon = "ﳒ",
		color = "#358a5b",
		cterm_color = "65",
		name = "R",
	},
	["Rmd"] = {
		icon = "",
		color = "#519aba",
		cterm_color = "67",
		name = "Rmd",
	},
	["Vagrantfile$"] = {
		icon = "",
		color = "#1563FF",
		cterm_color = "27",
		name = "Vagrantfile",
	},
	["_gvimrc"] = {
		icon = "",
		color = "#019833",
		cterm_color = "29",
		name = "Gvimrc",
	},
	["_vimrc"] = {
		icon = "",
		color = "#019833",
		cterm_color = "29",
		name = "Vimrc",
	},
	["ai"] = {
		icon = "",
		color = "#cbcb41",
		cterm_color = "185",
		name = "Ai",
	},
	["awk"] = {
		icon = "",
		color = "#4d5a5e",
		cterm_color = "59",
		name = "Awk",
	},
	["bash"] = {
		icon = "",
		color = "#89e051",
		cterm_color = "113",
		name = "Bash",
	},
	["bat"] = {
		icon = "",
		color = "#C1F12E",
		cterm_color = "154",
		name = "Bat",
	},
	["bmp"] = {
		icon = "",
		color = "#a074c4",
		cterm_color = "140",
		name = "Bmp",
	},
	["c"] = {
		icon = "",
		color = "#599eff",
		cterm_color = "75",
		name = "C",
	},
	["c++"] = {
		icon = "",
		color = "#f34b7d",
		cterm_color = "204",
		name = "CPlusPlus",
	},
	["cbl"] = {
		icon = "⚙",
		color = "#005ca5",
		cterm_color = "25",
		name = "Cobol",
	},
	["cc"] = {
		icon = "",
		color = "#f34b7d",
		cterm_color = "204",
		name = "CPlusPlus",
	},
	["cfg"] = {
		icon = "",
		color = "#ECECEC",
		cterm_color = "231",
		name = "Configuration",
	},
	["clj"] = {
		icon = "",
		color = "#8dc149",
		cterm_color = "107",
		name = "Clojure",
	},
	["cljc"] = {
		icon = "",
		color = "#8dc149",
		cterm_color = "107",
		name = "ClojureC",
	},
	["cljs"] = {
		icon = "",
		color = "#519aba",
		cterm_color = "67",
		name = "ClojureJS",
	},
	["cljd"] = {
		icon = "",
		color = "#519aba",
		cterm_color = "67",
		name = "ClojureDart",
	},
	["cmake"] = {
		icon = "",
		color = "#6d8086",
		cterm_color = "66",
		name = "CMake",
	},
	["cob"] = {
		icon = "⚙",
		color = "#005ca5",
		cterm_color = "25",
		name = "Cobol",
	},
	["cobol"] = {
		icon = "⚙",
		color = "#005ca5",
		cterm_color = "25",
		name = "Cobol",
	},
	["coffee"] = {
		icon = "",
		color = "#cbcb41",
		cterm_color = "185",
		name = "Coffee",
	},
	["conf"] = {
		icon = "",
		color = "#6d8086",
		cterm_color = "66",
		name = "Conf",
	},
	["config.ru"] = {
		icon = "",
		color = "#701516",
		cterm_color = "52",
		name = "ConfigRu",
	},
	["cp"] = {
		icon = "",
		color = "#519aba",
		cterm_color = "67",
		name = "Cp",
	},
	["cpp"] = {
		icon = "",
		color = "#519aba",
		cterm_color = "67",
		name = "Cpp",
	},
	["cpy"] = {
		icon = "⚙",
		color = "#005ca5",
		cterm_color = "25",
		name = "Cobol",
	},
	["cr"] = {
		icon = "",
		color = "#000000",
		cterm_color = "16",
		name = "Crystal",
	},
	["cs"] = {
		icon = "",
		color = "#596706",
		cterm_color = "58",
		name = "Cs",
	},
	["csh"] = {
		icon = "",
		color = "#4d5a5e",
		cterm_color = "59",
		name = "Csh",
	},
	["cson"] = {
		icon = "",
		color = "#cbcb41",
		cterm_color = "185",
		name = "Cson",
	},
	["css"] = {
		icon = "",
		color = "#42a5f5",
		cterm_color = "39",
		name = "Css",
	},
	["csv"] = {
		icon = "",
		color = "#89e051",
		cterm_color = "113",
		name = "Csv",
	},
	["cxx"] = {
		icon = "",
		color = "#519aba",
		cterm_color = "67",
		name = "Cxx",
	},
	["d"] = {
		icon = "",
		color = "#427819",
		cterm_color = "64",
		name = "D",
	},
	["dart"] = {
		icon = "",
		color = "#03589C",
		cterm_color = "25",
		name = "Dart",
	},
	["db"] = {
		icon = "",
		color = "#dad8d8",
		cterm_color = "188",
		name = "Db",
	},
	["desktop"] = {
		icon = "",
		color = "#563d7c",
		cterm_color = "60",
		name = "DesktopEntry",
	},
	["diff"] = {
		icon = "",
		color = "#41535b",
		cterm_color = "59",
		name = "Diff",
	},
	["doc"] = {
		icon = "",
		color = "#185abd",
		cterm_color = "25",
		name = "Doc",
	},
	["dockerfile"] = {
		icon = "",
		color = "#384d54",
		cterm_color = "59",
		name = "Dockerfile",
	},
	["postcss.config.cjs"] = {
		icon = "",
		color = "#000000",
		name = "Postcss",
	},
	["tailwind.config.cjs"] = {
		icon = "〜",
		color = "#384d54",
		name = "Tailwind",
	},
	[".dockerignore"] = {
		icon = "",
		color = "#384d54",
		name = "Dockerignore",
	},
	["Dockerfile"] = {
		icon = "",
		color = "#384d54",
		cterm_color = "59",
		name = "Dockerfile",
	},
	["drl"] = {
		icon = "",
		color = "#ffafaf",
		cterm_color = "217",
		name = "Drools",
	},
	["dropbox"] = {
		icon = "",
		color = "#0061FE",
		cterm_color = "27",
		name = "Dropbox",
	},
	["dump"] = {
		icon = "",
		color = "#dad8d8",
		cterm_color = "188",
		name = "Dump",
	},
	["edn"] = {
		icon = "",
		color = "#519aba",
		cterm_color = "67",
		name = "Edn",
	},
	["eex"] = {
		icon = "",
		color = "#a074c4",
		cterm_color = "140",
		name = "Eex",
	},
	["ejs"] = {
		icon = "",
		color = "#cbcb41",
		cterm_color = "185",
		name = "Ejs",
	},
	["elm"] = {
		icon = "",
		color = "#519aba",
		cterm_color = "67",
		name = "Elm",
	},
	["epp"] = {
		icon = "",
		color = "#FFA61A",
		name = "Epp",
	},
	["erb"] = {
		icon = "",
		color = "#701516",
		cterm_color = "52",
		name = "Erb",
	},
	["erl"] = {
		icon = "",
		color = "#B83998",
		cterm_color = "132",
		name = "Erl",
	},
	["ex"] = {
		icon = "",
		color = "#a074c4",
		cterm_color = "140",
		name = "Ex",
	},
	["exs"] = {
		icon = "",
		color = "#a074c4",
		cterm_color = "140",
		name = "Exs",
	},
	["f#"] = {
		icon = "",
		color = "#519aba",
		cterm_color = "67",
		name = "Fsharp",
	},
	["favicon.ico"] = {
		icon = "",
		color = "#cbcb41",
		cterm_color = "185",
		name = "Favicon",
	},
	["fnl"] = {
		color = "#fff3d7",
		icon = "🌜",
		cterm_color = "230",
		name = "Fennel",
	},
	["fish"] = {
		icon = "",
		color = "#4d5a5e",
		cterm_color = "59",
		name = "Fish",
	},
	["fs"] = {
		icon = "",
		color = "#519aba",
		cterm_color = "67",
		name = "Fs",
	},
	["fsi"] = {
		icon = "",
		color = "#519aba",
		cterm_color = "67",
		name = "Fsi",
	},
	["fsscript"] = {
		icon = "",
		color = "#519aba",
		cterm_color = "67",
		name = "Fsscript",
	},
	["fsx"] = {
		icon = "",
		color = "#519aba",
		cterm_color = "67",
		name = "Fsx",
	},
	["gd"] = {
		icon = "",
		color = "#6d8086",
		cterm_color = "66",
		name = "GDScript",
	},
	["gemspec"] = {
		icon = "",
		color = "#701516",
		cterm_color = "52",
		name = "Gemspec",
	},
	["gif"] = {
		icon = "",
		color = "#a074c4",
		cterm_color = "140",
		name = "Gif",
	},
	["git"] = {
		icon = "",
		color = "#F14C28",
		cterm_color = "202",
		name = "GitLogo",
	},
	["glb"] = {
		icon = "",
		color = "#FFB13B",
		cterm_color = "215",
		name = "BinaryGLTF",
	},
	["go"] = {
		icon = "",
		color = "#519aba",
		cterm_color = "67",
		name = "Go",
	},
	["godot"] = {
		icon = "",
		color = "#6d8086",
		cterm_color = "66",
		name = "GodotProject",
	},
	["graphql"] = {
		icon = "",
		color = "#e535ab",
		cterm_color = "199",
		name = "GraphQL",
	},
	["gruntfile"] = {
		icon = "",
		color = "#e37933",
		cterm_color = "173",
		name = "Gruntfile",
	},
	["gulpfile"] = {
		icon = "",
		color = "#cc3e44",
		cterm_color = "167",
		name = "Gulpfile",
	},
	["h"] = {
		icon = "",
		color = "#a074c4",
		cterm_color = "140",
		name = "H",
	},
	["haml"] = {
		icon = "",
		color = "#eaeae1",
		cterm_color = "188",
		name = "Haml",
	},
	["hbs"] = {
		icon = "",
		color = "#f0772b",
		cterm_color = "208",
		name = "Hbs",
	},
	["heex"] = {
		icon = "",
		color = "#a074c4",
		cterm_color = "140",
		name = "Heex",
	},
	["hh"] = {
		icon = "",
		color = "#a074c4",
		cterm_color = "140",
		name = "Hh",
	},
	["hpp"] = {
		icon = "",
		color = "#a074c4",
		cterm_color = "140",
		name = "Hpp",
	},
	["hrl"] = {
		icon = "",
		color = "#B83998",
		cterm_color = "132",
		name = "Hrl",
	},
	["hs"] = {
		icon = "",
		color = "#a074c4",
		cterm_color = "140",
		name = "Hs",
	},
	["htm"] = {
		icon = "",
		color = "#e34c26",
		cterm_color = "166",
		name = "Htm",
	},
	["html"] = {
		icon = "",
		color = "#e44d26",
		cterm_color = "202",
		name = "Html",
	},
	["hxx"] = {
		icon = "",
		color = "#a074c4",
		cterm_color = "140",
		name = "Hxx",
	},
	["ico"] = {
		icon = "",
		color = "#cbcb41",
		cterm_color = "185",
		name = "Ico",
	},
	["import"] = {
		icon = "",
		color = "#ECECEC",
		cterm_color = "231",
		name = "ImportConfiguration",
	},
	["ini"] = {
		icon = "",
		color = "#6d8086",
		cterm_color = "66",
		name = "Ini",
	},
	["java"] = {
		icon = "",
		color = "#cc3e44",
		cterm_color = "167",
		name = "Java",
	},
	["jl"] = {
		icon = "",
		color = "#a270ba",
		cterm_color = "133",
		name = "Jl",
	},
	["jpeg"] = {
		icon = "",
		color = "#a074c4",
		cterm_color = "140",
		name = "Jpeg",
	},
	["jpg"] = {
		icon = "",
		color = "#a074c4",
		cterm_color = "140",
		name = "Jpg",
	},
	["js"] = {
		icon = "",
		color = "#cbcb41",
		cterm_color = "185",
		name = "Js",
	},
	["json"] = {
		icon = "",
		color = "#cbcb41",
		cterm_color = "185",
		name = "Json",
	},
	["json5"] = {
		icon = "⑸",
		color = "#cbcb41",
		cterm_color = "185",
		name = "Json5",
	},
	["jsx"] = {
		icon = "",
		color = "#519aba",
		cterm_color = "67",
		name = "Jsx",
	},
	["ksh"] = {
		icon = "",
		color = "#4d5a5e",
		cterm_color = "59",
		name = "Ksh",
	},
	["kt"] = {
		icon = "",
		color = "#7F52FF",
		cterm_color = "99",
		name = "Kotlin",
	},
	["kts"] = {
		icon = "",
		color = "#7F52FF",
		cterm_color = "99",
		name = "KotlinScript",
	},
	["leex"] = {
		icon = "",
		color = "#a074c4",
		cterm_color = "140",
		name = "Leex",
	},
	["less"] = {
		icon = "",
		color = "#563d7c",
		cterm_color = "60",
		name = "Less",
	},
	["lhs"] = {
		icon = "",
		color = "#a074c4",
		cterm_color = "140",
		name = "Lhs",
	},
	["license"] = {
		icon = "",
		color = "#cbcb41",
		cterm_color = "185",
		name = "License",
	},
	["lua"] = {
		icon = "",
		color = "#51a0cf",
		cterm_color = "74",
		name = "Lua",
	},
	["luau"] = {
		icon = "",
		color = "#51a0cf",
		cterm_color = "74",
		name = "Luau",
	},
	["makefile"] = {
		icon = "",
		color = "#6d8086",
		cterm_color = "66",
		name = "Makefile",
	},
	["markdown"] = {
		icon = "",
		color = "#519aba",
		cterm_color = "67",
		name = "Markdown",
	},
	["material"] = {
		icon = "",
		color = "#B83998",
		cterm_color = "132",
		name = "Material",
	},
	["md"] = {
		icon = "",
		color = "#ffffff",
		cterm_color = "white",
		name = "Md",
	},
	["mdx"] = {
		icon = "",
		color = "#519aba",
		cterm_color = "67",
		name = "Mdx",
	},
	["mint"] = {
		icon = "",
		color = "#87c095",
		cterm_color = "108",
		name = "Mint",
	},
	["mix.lock"] = {
		icon = "",
		color = "#a074c4",
		cterm_color = "140",
		name = "MixLock",
	},
	["mjs"] = {
		icon = "",
		color = "#f1e05a",
		cterm_color = "221",
		name = "Mjs",
	},
	["ml"] = {
		icon = "λ",
		color = "#e37933",
		cterm_color = "173",
		name = "Ml",
	},
	["mli"] = {
		icon = "λ",
		color = "#e37933",
		cterm_color = "173",
		name = "Mli",
	},
	["mo"] = {
		icon = "∞",
		color = "#9772FB",
		cterm_color = "99",
		name = "Motoko",
	},
	["mustache"] = {
		icon = "",
		color = "#e37933",
		cterm_color = "173",
		name = "Mustache",
	},
	["nim"] = {
		icon = "👑",
		color = "#f3d400",
		cterm_color = "220",
		name = "Nim",
	},
	["nix"] = {
		icon = "",
		color = "#7ebae4",
		cterm_color = "110",
		name = "Nix",
	},
	["node_modules"] = {
		icon = "",
		color = "#E8274B",
		cterm_color = "161",
		name = "NodeModules",
	},
	[".nvmrc"] = {
		icon = "",
		color = "#E8274B",
		name = "Nvm",
	},
	["opus"] = {
		icon = "",
		color = "#F88A02",
		cterm_color = "208",
		name = "OPUS",
	},
	["otf"] = {
		icon = "",
		color = "#ECECEC",
		cterm_color = "231",
		name = "OpenTypeFont",
	},
	["package.json"] = {
		icon = "",
		color = "#e8274b",
		name = "PackageJson",
	},
	["package-lock.json"] = {
		icon = "",
		color = "#7a0d21",
		name = "PackageLockJson",
	},
	["pck"] = {
		icon = "",
		color = "#6d8086",
		cterm_color = "66",
		name = "PackedResource",
	},
	["pdf"] = {
		icon = "",
		color = "#b30b00",
		cterm_color = "124",
		name = "Pdf",
	},
	["php"] = {
		icon = "",
		color = "#a074c4",
		cterm_color = "140",
		name = "Php",
	},
	["pl"] = {
		icon = "",
		color = "#519aba",
		cterm_color = "67",
		name = "Pl",
	},
	["pm"] = {
		icon = "",
		color = "#519aba",
		cterm_color = "67",
		name = "Pm",
	},
	["png"] = {
		icon = "",
		color = "#a074c4",
		cterm_color = "140",
		name = "Png",
	},
	["pp"] = {
		icon = "",
		color = "#FFA61A",
		name = "Pp",
	},
	["ppt"] = {
		icon = "",
		color = "#cb4a32",
		cterm_color = "167",
		name = "Ppt",
	},
	["pro"] = {
		icon = "",
		color = "#e4b854",
		cterm_color = "179",
		name = "Prolog",
	},
	["Procfile"] = {
		icon = "",
		color = "#a074c4",
		cterm_color = "140",
		name = "Procfile",
	},
	["ps1"] = {
		icon = "",
		color = "#4d5a5e",
		cterm_color = "59",
		name = "PromptPs1",
	},
	["psb"] = {
		icon = "",
		color = "#519aba",
		cterm_color = "67",
		name = "Psb",
	},
	["psd"] = {
		icon = "",
		color = "#519aba",
		cterm_color = "67",
		name = "Psd",
	},
	["py"] = {
		icon = "",
		color = "#ffbc03",
		cterm_color = "61",
		name = "Py",
	},
	["pyc"] = {
		icon = "",
		color = "#ffe291",
		cterm_color = "67",
		name = "Pyc",
	},
	["pyd"] = {
		icon = "",
		color = "#ffe291",
		cterm_color = "67",
		name = "Pyd",
	},
	["pyo"] = {
		icon = "",
		color = "#ffe291",
		cterm_color = "67",
		name = "Pyo",
	},
	["query"] = {
		icon = "",
		color = "#90a850",
		cterm_color = "154",
		name = "Query",
	},
	["r"] = {
		icon = "ﳒ",
		color = "#358a5b",
		cterm_color = "65",
		name = "R",
	},
	["rake"] = {
		icon = "",
		color = "#701516",
		cterm_color = "52",
		name = "Rake",
	},
	["rakefile"] = {
		icon = "",
		color = "#701516",
		cterm_color = "52",
		name = "Rakefile",
	},
	["rb"] = {
		icon = "",
		color = "#701516",
		cterm_color = "52",
		name = "Rb",
	},
	["rlib"] = {
		icon = "",
		color = "#dea584",
		cterm_color = "180",
		name = "Rlib",
	},
	["rmd"] = {
		icon = "",
		color = "#519aba",
		cterm_color = "67",
		name = "Rmd",
	},
	["rproj"] = {
		icon = "鉶",
		color = "#358a5b",
		cterm_color = "65",
		name = "Rproj",
	},
	["rs"] = {
		icon = "",
		color = "#dea584",
		cterm_color = "180",
		name = "Rs",
	},
	["rss"] = {
		icon = "",
		color = "#FB9D3B",
		cterm_color = "215",
		name = "Rss",
	},
	["sass"] = {
		icon = "",
		color = "#f55385",
		cterm_color = "204",
		name = "Sass",
	},
	["sbt"] = {
		icon = "",
		color = "#cc3e44",
		cterm_color = "167",
		name = "sbt",
	},
	["scala"] = {
		icon = "",
		color = "#cc3e44",
		cterm_color = "167",
		name = "Scala",
	},
	["scm"] = {
		icon = "ﬦ",
		color = "#000000",
		cterm_color = "16",
		name = "Scheme",
	},
	["scss"] = {
		icon = "",
		color = "#f55385",
		cterm_color = "204",
		name = "Scss",
	},
	["sh"] = {
		icon = "",
		color = "#4d5a5e",
		cterm_color = "59",
		name = "Sh",
	},
	["sig"] = {
		icon = "λ",
		color = "#e37933",
		cterm_color = "173",
		name = "Sig",
	},
	["slim"] = {
		icon = "",
		color = "#e34c26",
		cterm_color = "166",
		name = "Slim",
	},
	["sln"] = {
		icon = "",
		color = "#854CC7",
		cterm_color = "98",
		name = "Sln",
	},
	["sml"] = {
		icon = "λ",
		color = "#e37933",
		cterm_color = "173",
		name = "Sml",
	},
	["sql"] = {
		icon = "",
		color = "#dad8d8",
		cterm_color = "188",
		name = "Sql",
	},
	["sqlite"] = {
		icon = "",
		color = "#dad8d8",
		cterm_color = "188",
		name = "Sql",
	},
	["sqlite3"] = {
		icon = "",
		color = "#dad8d8",
		cterm_color = "188",
		name = "Sql",
	},
	["styl"] = {
		icon = "",
		color = "#8dc149",
		cterm_color = "107",
		name = "Styl",
	},
	["sublime"] = {
		icon = "",
		color = "#e37933",
		cterm_color = "98",
		name = "Suo",
	},
	["suo"] = {
		icon = "",
		color = "#854CC7",
		cterm_color = "98",
		name = "Suo",
	},
	["sv"] = {
		icon = "",
		color = "#019833",
		cterm_color = "29",
		name = "SystemVerilog",
	},
	["svelte"] = {
		icon = "",
		color = "#ff3e00",
		cterm_color = "202",
		name = "Svelte",
	},
	["svh"] = {
		icon = "",
		color = "#019833",
		cterm_color = "29",
		name = "SystemVerilog",
	},
	["svg"] = {
		icon = "ﰟ",
		color = "#FFB13B",
		cterm_color = "215",
		name = "Svg",
	},
	["swift"] = {
		icon = "",
		color = "#e37933",
		cterm_color = "173",
		name = "Swift",
	},
	["t"] = {
		icon = "",
		color = "#519aba",
		cterm_color = "67",
		name = "Tor",
	},
	["tbc"] = {
		icon = "﯑",
		color = "#1e5cb3",
		cterm_color = "67",
		name = "Tcl",
	},
	["tcl"] = {
		icon = "﯑",
		color = "#1e5cb3",
		cterm_color = "67",
		name = "Tcl",
	},
	["terminal"] = {
		icon = "",
		color = "#31B53E",
		cterm_color = "71",
		name = "Terminal",
	},
	["tex"] = {
		icon = "ﭨ",
		color = "#3D6117",
		cterm_color = "58",
		name = "Tex",
	},
	["tf"] = {
		icon = "",
		color = "#5F43E9",
		cterm_color = "57",
		name = "Terraform",
	},
	["tfvars"] = {
		icon = "",
		color = "#5F43E9",
		cterm_color = "57",
		name = "TFVars",
	},
	["toml"] = {
		icon = "🅃",
		color = "#6d8086",
		cterm_color = "66",
		name = "Toml",
	},
	["pnpm-lock.yml"] = {
		icon = "",
		color = "#6d8086",
		name = "Pnpm",
	},
	["tres"] = {
		icon = "",
		color = "#cbcb41",
		cterm_color = "185",
		name = "TextResource",
	},
	["ts"] = {
		icon = "",
		color = "#519aba",
		cterm_color = "67",
		name = "Ts",
	},
	["tscn"] = {
		icon = "",
		color = "#a074c4",
		cterm_color = "140",
		name = "TextScene",
	},
	["tsconfig.json"] = {
		icon = "",
		color = "#519aba",
		cterm_color = "67",
		name = "Tsx",
	},
	["tsx"] = {
		icon = "",
		color = "#519aba",
		cterm_color = "67",
		name = "Tsx",
	},
	["twig"] = {
		icon = "",
		color = "#8dc149",
		cterm_color = "107",
		name = "Twig",
	},
	["txt"] = {
		icon = "",
		color = "#89e051",
		cterm_color = "113",
		name = "Txt",
	},
	["v"] = {
		icon = "",
		color = "#019833",
		cterm_color = "29",
		name = "Verilog",
	},
	["vh"] = {
		icon = "",
		color = "#019833",
		cterm_color = "29",
		name = "Verilog",
	},
	["vhd"] = {
		icon = "",
		color = "#019833",
		cterm_color = "29",
		name = "VHDL",
	},
	["vhdl"] = {
		icon = "",
		color = "#019833",
		cterm_color = "29",
		name = "VHDL",
	},
	["vim"] = {
		icon = "",
		color = "#019833",
		cterm_color = "29",
		name = "Vim",
	},
	["vue"] = {
		icon = "﵂",
		color = "#8dc149",
		cterm_color = "107",
		name = "Vue",
	},
	["webmanifest"] = {
		icon = "",
		color = "#f1e05a",
		cterm_color = "221",
		name = "Webmanifest",
	},
	["webp"] = {
		icon = "",
		color = "#a074c4",
		cterm_color = "140",
		name = "Webp",
	},
	["webpack"] = {
		icon = "",
		color = "#519aba",
		cterm_color = "67",
		name = "Webpack",
	},
	["xcplayground"] = {
		icon = "",
		color = "#e37933",
		cterm_color = "173",
		name = "XcPlayground",
	},
	["xls"] = {
		icon = "",
		color = "#207245",
		cterm_color = "23",
		name = "Xls",
	},
	["xml"] = {
		icon = "謹",
		color = "#e37933",
		cterm_color = "173",
		name = "Xml",
	},
	["xul"] = {
		icon = "",
		color = "#e37933",
		cterm_color = "173",
		name = "Xul",
	},
	["yaml"] = {
		icon = "",
		color = "#6d8086",
		cterm_color = "66",
		name = "Yaml",
	},
	["yml"] = {
		icon = "",
		color = "#6d8086",
		cterm_color = "66",
		name = "Yml",
	},
	["zig"] = {
		icon = "",
		color = "#f69a1b",
		cterm_color = "208",
		name = "Zig",
	},
	["zsh"] = {
		icon = "",
		color = "#89e051",
		cterm_color = "113",
		name = "Zsh",
	},
	["sol"] = {
		icon = "ﲹ",
		color = "#519aba",
		cterm_color = "67",
		name = "Solidity",
	},
	[".env"] = {
		icon = "",
		color = "#faf743",
		cterm_color = "226",
		name = "Env",
	},
	["prisma"] = {
		icon = "卑",
		color = "#ffffff",
		cterm_color = "white",
		name = "Prisma",
	},
	["lock"] = {
		icon = "",
		color = "#bbbbbb",
		cterm_color = "250",
		name = "Lock",
	},
	["log"] = {
		icon = "",
		color = "#ffffff",
		cterm_color = "white",
		name = "Log",
	},
	["jest.config.js"] = {
		icon = "",
		color = "#E8274B",
	},
	["jest.preset.ts"] = {
		icon = "",
		color = "#E8274B",
	},
	["jest.preset.js"] = {
		icon = "",
		color = "#E8274B",
	},
	["jest.config.ts"] = {
		icon = "",
		color = "#E8274B",
	},
	["jest.config.json"] = {
		icon = "",
		color = "#E8274B",
	},
}

require("nvim-web-devicons").setup({
	override = icons,
})

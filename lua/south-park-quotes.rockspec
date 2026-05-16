package = "voxgig-sdk-south-park-quotes"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/south-park-quotes-sdk.git"
}
description = {
  summary = "SouthParkQuotes SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["south-park-quotes_sdk"] = "south-park-quotes_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}

const fs = require("fs");

 var drop = `world_beyond:cobbled_limestone`;
 var identifier = `limestone`;
 var tier = "wood";

  if (tier === "wood") {
    var tool = [
      "minecraft:wooden_pickaxe",
      "minecraft:stone_pickaxe",
      "minecraft:gold_pickaxe",
      "minecraft:iron_pickaxe",
      "minecraft:diamond_pickaxe",
      "minecraft:netherite_pickaxe",
    ];
  }

  if (tier === "stone") {
    var tool = [
      "minecraft:stone_pickaxe",
      "minecraft:gold_pickaxe",
      "minecraft:iron_pickaxe",
      "minecraft:diamond_pickaxe",
      "minecraft:netherite_pickaxe",
    ];
  }

  if (tier === "gold") {
    var tool = [
      "minecraft:gold_pickaxe",
      "minecraft:iron_pickaxe",
      "minecraft:diamond_pickaxe",
      "minecraft:netherite_pickaxe",
    ];
  }

  if (tier === "iron") {
    var tool = [
      "minecraft:iron_pickaxe",
      "minecraft:diamond_pickaxe",
      "minecraft:netherite_pickaxe",
    ];
  }

  if (tier === "diamond") {
    var tool = ["minecraft:diamond_pickaxe", "minecraft:netherite_pickaxe"];
  }

  if (tier === "netherite") {
    var tool = ["minecraft:netherite_pickaxe"];
  }

  function createTable(
    tools,
    drop
  ) {
    let table = {
      pools: [],
    };
    tools.forEach(v =>
      table.pools.push(
        rolls(v, drop)
      )
    );
    return table;
  }
  function rolls(
    tool,
    drop
  ) {
    return {
      rolls: 1,
      conditions: [
        {
          condition: "match_tool",
          item: tool,
          count: 1,
        },
      ],
      entries: [
        {
          weight: 1,
          type: "item",
          name: drop,
          count: {
            min: 1,
            max: 1,
          },
        },
      ],
    };
  }

  fs.writeFile(
    `./${identifier}.json`,
    JSON.stringify(
      createTable(
        tool,
        drop
      )
    ),
    err => (
      console.log(err)
    )
  );
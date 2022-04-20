const fs = require("fs");
// Saturation values: poor, low, normal, good, max, supernatural
const Foods = [
	{
		identifier: "cooked_beef",
		nutrition: 8,
		saturation: "max"
	},
	{
		identifier: "cooked_porkchop",
		nutrition: 8,
		saturation: "max"
	},
	{
		identifier: "cooked_mutton",
		nutrition: 6,
		saturation: "max"
	},
	{
		identifier: "cooked_salmon",
		nutrition: 6,
		saturation: "max"
	},
	{
		identifier: "cooked_rabbit",
		nutrition: 6,
		saturation: "good"
	},
	{
		identifier: "cooked_chicken",
		nutrition: 6,
		saturation: "good"
	},
	{
		identifier: "cooked_cod",
		nutrition: 5,
		saturation: "good"
	}
]
const Output = {
	texture_data: {}
}
for(let food of Foods) {
	fs.writeFileSync(`./World Beyond [Data]/items/sets/rice_food/${food.identifier}_rice_bowl.json`, JSON.stringify({
		format_version: "1.16.100",
		"minecraft:item": {
			description: {
				identifier: `worldbeyond:${food.identifier}_rice_bowl`,
				category: "equipment"
			},
			components: {
				"minecraft:food": {
					nutrition: Math.floor(food.nutrition * 1.5),
					saturation_modifier: food.saturation,
					using_converts_to: "bowl"
				},
				"minecraft:max_stack_size": 16,
				"minecraft:use_duration": 32,
				"minecraft:item_storage": {
					capacity: 4
				},
				"minecraft:icon": {
					texture: `${food.identifier}_rice_bowl`
				}
			}
		}
	}, null, 2)
	)
	Output.texture_data[`${food.identifier}_rice_bowl`] = {
		textures: `textures/items/${food.identifier}_rice_bowl`
	}
}
fs.writeFileSync("./World Beyond [External Assets]/Sprunkles/generated/RiceFoods_item_texture.json", JSON.stringify(Output,null,2))
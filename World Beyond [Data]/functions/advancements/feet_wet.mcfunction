playsound random.levelup @s
event entity @s player:advancement_get.feet_wet
tag @s add advancement.feet_wet 

xp 100 @s

tellraw @a {"rawtext": [ { "text": "§b" } , { "selector" : "*" }, { "text": "§r has made the advancement §6Wet Feet§r!" } ] }
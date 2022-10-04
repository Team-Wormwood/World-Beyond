playsound random.levelup @s
event entity @s modified_player:advancement_get.cross_fox
tag @s add advancement.cross_fox 

xp 100 @s

tellraw @a {"rawtext": [ { "text": "§b" } , { "selector" : "@p" }, { "text": "§r has begun their §6Adventuring Journey§r!" } ] }
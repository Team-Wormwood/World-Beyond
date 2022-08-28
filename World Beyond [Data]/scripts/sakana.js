import { world, EntityRaycastOptions, ItemStack, Items, MinecraftItemTypes, SoundOptions } from "mojang-minecraft"

const targetableEntities = [
	"catfish",
	"piranha"
]

world.events.itemUse.subscribe(
	(ItemUseEvent) => {
		const item = ItemUseEvent.item
		const source = ItemUseEvent.source

		if (item.id === "minecraft:water_bucket" && source.id === "minecraft:player") {

			const raycast = new EntityRaycastOptions()
			raycast.maxDistance = 4
			const raycastEntities = source.getEntitiesFromViewVector(raycast)
			const targetedEntity = raycastEntities[0]

			if (targetedEntity !== undefined) {
				const targetIdentifier = targetedEntity.id.match(/^wormwood:(.+)$/)?.[1]

				if (targetableEntities.includes(targetIdentifier)) {
					const entityName = targetedEntity.nameTag
					const entityVariant = targetedEntity.getComponent("minecraft:variant") 

					const itemStack = new ItemStack(Items.get(`wormwood:${targetIdentifier}_bucket`))
					itemStack.setLore([entityName][entityVariant])
					itemStack.nameTag = `Bucket of ${entityName}`

					source.getComponent("minecraft:inventory").container.setItem(
						source.selectedSlot,
						itemStack
					)

					targetedEntity.triggerEvent("wormwood:entity_despawn")

					world.playSound("bucket.fill.fish")

				}
			}

			world.playSound("bucket.empty.fish")

		} else {}
	}
)

world.events.itemUseOn.subscribe(
	(ItemUseOnEvent) => {
		const item = ItemUseOnEvent.item
		//console.warn(item.id)
		const itemIdentifier = item.id.match(/^wormwood:(.+)_bucket$/)?.[1]
		const source = ItemUseOnEvent.source

		if (targetableEntities.includes(itemIdentifier) && source.id === "minecraft:player") {
			const blockFace = ItemUseOnEvent.blockFace
			const blockLocation = ItemUseOnEvent.blockLocation
			let newLocation

			//console.warn(blockFace)

			switch (blockFace) {
				case 1:
					newLocation = blockLocation.offset(0, 1, 0)
					break
				case 0:
					newLocation = blockLocation.offset(0, -1, 0)
					break
				case 2:
					newLocation = blockLocation.offset(0, 0, -1)
					break
				case 5:
					newLocation = blockLocation.offset(1, 0, 0)
					break
				case 3:
					newLocation = blockLocation.offset(0, 0, 1)
					break
				case 4:
					newLocation = blockLocation.offset(-1, 0, 0)
					break
			}

			//console.warn(newLocation.x, newLocation.y, newLocation.z)

			const name = item.getLore()[0]

			const entity = source.dimension.spawnEntity(`wormwood:${itemIdentifier}`,
				newLocation)
			entity.nameTag = name

			source.getComponent("minecraft:inventory").container.setItem(
				source.selectedSlot,
				new ItemStack(MinecraftItemTypes.waterBucket)
			)

			world.playSound("bucket.empty.fish")

		}
	}
)


// world.events.beforeItemUse.subscribe
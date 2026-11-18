---
title: 'Voxelite'
summary: 'Voxel engine and game made in OpenGL'
img: 'assets/voxelite.png'
technologies: [ Java, LWJGL, OpenGL, CSharp, OpenTK ]
---

This was the first ever project I started in OpenGL (using [LWJGL](https://www.lwjgl.org/)).\
After experimenting with different graphics frameworks and making Terraria clone(s), I decided to extend to 3D by making
a Minecraft clone.

![voxelite-1.png](/assets/projects/voxelite-1.png)

The project didn't really get far, most I did was a simple multithreaded terrain generation, player movement, block
breaking/placing, and structure (tree) generation.

![voxelite-2.png](/assets/projects/voxelite-2.png)

This was one of the first "big" projects I did. I didn't get far with development, but it was still a valuable
learning experience.

Some time later, I started recreating the project in C# using [Silk.NET](https://github.com/dotnet/Silk.NET) (after
originally trying [OpenTK](https://opentk.net/)). That rewrite became **CSVoxelEngine**, and it got a lot further than
the Java version ever did.

## CSVoxelEngine

After experimenting with different frameworks over the years and getting burnt out each time, I decided to redo the last version I made with the help of AI agents.

With the last version, my goal was to make a functioning game rather than learning how to make an engine.

The inspiration comes largely from games like Minecraft, Vintage Story, Terraria, Factorio, Satisfactory, a bit of Skyrim, and so on. Not to forget large "expert" modpacks for Minecraft such as Enigmatica 2, GregTech New Horizons, Divine Journey 2, Project Ozone 3, and so on.

Some features from the C# version include:
- Infinite terrain with chunk streaming, biomes, caves, ravines and far-terrain LOD
- A hell of endless cavern layers below the world, and floating sky islands above the clouds, with infinite worldgen on the Y axis
- Binary greedy chunk meshing with ambient occlusion, frustum culling and GPU occlusion culling
- Block breaking/placing, player physics, items, mobs, interactive in-world crafting, dungeons and saved worlds
- A dedicated server and a developer studio (DevStudio) as separate executables
- A game wiki with rotatable 3D previews of blocks, items and mobs, generated straight from the game's data

![CSVoxelEngine forest](/assets/projects/csvoxelengine-forest.webp)

![CSVoxelEngine sky islands above a sea of clouds](/assets/projects/csvoxelengine-sky_cloud_sea.webp)

![CSVoxelEngine hell fungal caverns](/assets/projects/csvoxelengine-hell_fungal.webp)

I'd very much like to keep pushing this project forward, and hopefully turn it into an actual game.

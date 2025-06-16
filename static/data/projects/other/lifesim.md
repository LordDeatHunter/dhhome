---
title: 'LifeSim'
summary: 'Online life simulation'
img: 'assets/lifesim.png'
technologies: [ CSharp, AspDotNet, JavaScript, HTML, CSS, WebSockets, SQLite ]
link: https://lifesim.deathunter.com/
source: https://github.com/LordDeatHunter/LifeSim/
---

# LifeSim
LifeSim is a "Life Simulator" where entities (animals) seek out food, reproduce and die.

The food they seek out can be either plants or other animals, depending on their food preference, which also changes with food scarcity.

When reproducing, the entities will create a random amount of offsprings with the average stats of their parents, such as size and food preference, but with some random mutations.

The simulation is done entirely on the server, with the clients only receiving updates about the entities and their actions.
This essentially means that all clients are seeing the same simulation.

### Currency system

Furthermore, the users all have 100 coins with which they can "predict" whether the amount of entities will increase or decrease in the next update, and if they are correct, they will receive back double the amount of coins they bet.

With these coins, users can buy actions, such as "reignition" of the simulation (if all the entities die out), which just spawns a random amount of entities to restart the simulation.

### Technology stack

The simulation is written in C# using ASP.NET Core, with the client being a web application using JavaScript, HTML and CSS, connecting to the server via WebSockets.

The data (user balance, entity stats, etc.) is stored in a SQLite database.
